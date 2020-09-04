const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const auth = require('../middlewares/auth');
const room = require('../middlewares/room');

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
        const room = await Room.findOne({ _id, owners: req.admin._id });
        if (!room) {
            return res.status(400).send({ err: 'You did not own this room!' });
        }
        updates.forEach((update) => {
            if (update === 'owner' || update === 'student') {
                room[update] = room[update].push(req.body[update]);
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
        const room = await Room.findById(_id);
        res.send(room);
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router;
