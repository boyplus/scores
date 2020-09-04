const express = require('express');
require('./db/mongoose');
const http = require('http');
const socketIo = require('socket.io');
const adminRouter = require('./routers/admin');
const roomRouter = require('./routers/room');
const studentRouter = require('./routers/student');

const app = express();
app.use(express.json());
app.use(adminRouter);
app.use(roomRouter);
app.use(studentRouter);

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('joinRoom', (data) => {
        const { room, user } = data;
        console.log('user ', user, ' join room ', room);
        socket.join(room);
    });

    socket.on('increase', (data) => {
        const { room, student } = data;
        io.to(room).emit('newNumber', { room, student });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Listen on port ', PORT);
});
