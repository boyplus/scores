const mongoose = require('mongoose');
const StudentSchema = require('./Student');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    students: [StudentSchema],
    owners: { type: Array, required: true },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
