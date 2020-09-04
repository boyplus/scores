const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    students: { type: Array, required: false },
    owners: { type: Array, required: true },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
