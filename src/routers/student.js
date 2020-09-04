const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Room = require('../models/Room');
const auth = require('../middlewares/auth');

router.get('/api/room/:id/students', async (req, res) => {
    try {
        const _id = req.params.id;
        const students = await Student.find({ room: _id });
        res.send(students);
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/api/student', auth, async (req, res) => {
    try {
        const student = new Student(req.body);
        const room = await Room.findById(req.body.room);
        if (room && room.owners.includes(req.admin._id)) {
            await student.save();
        } else {
            res.status(400).send({ err: 'You did not own this room!' });
        }
        res.status(201).send(student);
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router;
