const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../models/Student');
const Room = require('../models/Room');
const auth = require('../middlewares/auth');
const teachStudent = require('../middlewares/teachStudent');

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

router.get('/api/myStudents', auth, async (req, res) => {
    try {
        const rooms = await Room.find({ owners: req.admin._id });
        const roomID = rooms.map((room) => {
            return room._id.toString();
        });
        const students = await Student.find();
        const myStudents = students.filter((student) => {
            return roomID.includes(student.room.toString());
        });
        res.send(myStudents);
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

router.patch('/api/student/:id', auth, teachStudent, async (req, res) => {
    try {
        const allowUpdated = ['name', 'score'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) => {
            return allowUpdated.includes(update);
        });
        if (!isValidOperation)
            return res.status(400).send({ err: 'Invalid Operation.' });
        updates.forEach((update) => {
            req.student[update] = req.body[update];
        });
        await req.student.save();
        res.send(req.student);
    } catch (err) {
        res.status(500).send();
    }
});

router.delete('/api/student/:id', auth, teachStudent, async (req, res) => {
    try {
        await req.student.remove();
        res.send(req.student);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
