const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const Student = require('../models/Student');
const auth = require('../middlewares/auth');

router.get('/api/allRooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.send(rooms);
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/api/room', auth, async (req, res) => {
    try {
        const room = new Room({
            name: req.body.name,
            owners: [req.admin._id],
            students: [],
        });
        await room.save();
        res.status(201).send(room);
    } catch (err) {
        res.status(400).send();
    }
});

router.patch('/api/room/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const updates = Object.keys(req.body);
        const allowUpdated = ['owner', 'student', 'name'];
        const isValidOperation = updates.every((update) => {
            return allowUpdated.includes(update);
        });
        if (!isValidOperation)
            return res.status(400).send({ err: 'Invalid operation' });
        const room = await Room.findById(_id);
        if (!room.owners.includes(req.admin._id)) {
            return res.status(400).send({ err: 'You did not own this room!' });
        }
        updates.forEach((update) => {
            if (update === 'owner' || update === 'student') {
                const newId = mongoose.Types.ObjectId(req.body[update]);
                room[update + 's'].push(newId);
            } else {
                room[update] = req.body[update];
            }
        });
        await room.save();
        res.send(room);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/api/room/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const room = await Room.findById(_id).lean();
        const students = await Student.find({ room: _id });
        room.students = students;
        res.send(room);
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router;
