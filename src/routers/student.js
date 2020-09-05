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

router.get('/api/allStudents', async (req, res) => {
    try {
        const students = await Student.find();
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

router.patch('/api/student/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const student = await Student.findById(_id);
        if (!student)
            return res.status(400).send({ err: 'Did not found this student' });
        const room = await Room.findById(student.room);
        const owners = room.owners;
        if (!owners.includes(req.admin._id)) {
            return res
                .status(400)
                .send({ err: 'You did not teach this student' });
        }
        const allowUpdated = ['name', 'score'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) => {
            return allowUpdated.includes(update);
        });
        if (!isValidOperation)
            return res.status(400).send({ err: 'Invalid Operation' });
        updates.forEach((update) => {
            student[update] = req.body[update];
        });
        await student.save();
        res.send(student);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
