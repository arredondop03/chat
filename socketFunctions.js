const axios = require('axios');
const crypto = require('crypto');
const logger = require('pino')();

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const onJoin = (socket, io) => {
    socket.on('join', async ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        socket.join(user.room);
        if (error) return callback(error);

        const id = crypto.randomBytes(16).toString('hex');
        socket.emit('message', { id: id, sender: 'admin', text: `${user.name}, welcome to room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { id: id, sender: 'admin', text: `${user.name} has joined` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        if (getUsersInRoom(user.room).length === 2) {
            try {
                const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
                socket.to(user.room).emit('message', { id: response.data.id, sender: 'Random Fact Teller', text: response.data.text });
                socket.emit('message', { id: response.data.id, sender: 'Random Fact Teller', text: response.data.text });
            } catch (error) {
                logger.info(error);
            };
        }
        callback();
    })
}

const onSendMessage = (socket, io) => {
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const id = crypto.randomBytes(16).toString('hex');
        io.to(user.room).emit('message', { id: id, sender: user.name, text: message })

        callback();
    })
}

const onDisconnect = (socket, io) => {
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room)
            .emit('message', { sender: 'admin', text: `${user.name} has left` })
            .emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
}

module.exports = { onJoin, onSendMessage, onDisconnect };
