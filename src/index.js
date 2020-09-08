const express = require('express');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const http = require('http');
const socketIo = require('socket.io');
const adminRouter = require('./routers/admin');
const roomRouter = require('./routers/room');
const studentRouter = require('./routers/student');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(adminRouter);
app.use(roomRouter);
app.use(studentRouter);

const server = http.createServer(app);

// const io = socketIo(server);

// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });

//     socket.on('joinRoom', (data) => {
//         const { room, user } = data;
//         console.log('user ', user, ' join room ', room);
//         socket.join(room);
//     });

//     socket.on('increase', (data) => {
//         const { room, student } = data;
//         io.to(room).emit('newNumber', { room, student });
//     });
// });

if (process.env.NODE_ENV === 'production') {
    console.log('Start node server in production');
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    console.log('Start node server in development');
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Listen on port ', PORT);
});
