const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
});

const Student = new mongoose.model('Student', studentSchema);
module.exports = Student;
