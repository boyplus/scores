const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    _room: { type: Schema.Types.ObjectId, ref: 'Room' },
});

const Student = new mongoose.model('Student', studentSchema);
module.exports = Student;
