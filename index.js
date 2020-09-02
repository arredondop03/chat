const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const crypto = require("crypto");

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});
        const id = crypto.randomBytes(16).toString("hex");

        if(error) return callback(error);

        socket.emit('message', {id: id, sender: 'admin', text: `${user.name}, welcome to room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const id = crypto.randomBytes(16).toString("hex");
        io.to(user.room).emit('message', {id: id, sender: user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left`});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        }
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
// app.use(router)
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));