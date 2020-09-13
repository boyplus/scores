const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('./db/mongoose');
const http = require('http');
const adminRouter = require('./routers/admin');
const roomRouter = require('./routers/room');
const studentRouter = require('./routers/student');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(adminRouter);
app.use(roomRouter);
app.use(studentRouter);

const server = http.createServer(app);

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
