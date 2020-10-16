const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const router = require('./router.js');
const { onJoin, onSendMessage, onDisconnect } = require('./socketFunctions.js');


const PORT = process.env.PORT || 5000;


const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    onJoin(socket, io);
    onSendMessage(socket, io);
    onDisconnect(socket, io);
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

app.use(router)
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));