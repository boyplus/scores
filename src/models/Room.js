const mongoose = require('mongoose');
const Student = require('./Student');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owners: { type: Array, required: true },
});

roomSchema.pre('remove', async function (next) {
    const room = this;
    console.log('Before we remove room ', room._id, ' we will remove student');
    await Student.deleteMany({ room: room._id });
    next();
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
