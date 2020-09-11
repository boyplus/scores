const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const Student = require('../models/Student');
const auth = require('../middlewares/auth');
const ownRoom = require('../middlewares/ownRoom');
const Admin = require('../models/Admin');

router.get('/api/allRooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.send(rooms);
    } catch (err) {
        res.status(500).send();
    }
});

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

router.get('/api/room/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const room = await Room.findById(_id).lean();
        const students = await Student.find({ room: _id });
        const detailedOwners = [];
        await asyncForEach(room.owners, async (owner) => {
            const detailedOwner = await Admin.findById(owner).lean();
            const { _id, name, username } = detailedOwner;
            detailedOwners.push({ _id, name, username });
        });
        room.detailedOwners = detailedOwners;
        room.students = students;
        res.send(room);
    } catch (err) {
        res.status(400).send();
    }
});

router.get('/api/myRooms', auth, async (req, res) => {
    try {
        const rooms = await Room.find({ owners: req.admin._id });
        res.send(rooms);
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/api/isOwnRoom/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const room = await Room.findById(_id);
        const adminId = req.admin._id;
        if (room.owners.includes(adminId)) {
            res.send({ isOwn: true });
        } else {
            res.send({ isOwn: false });
        }
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

router.patch('/api/room/:id', auth, ownRoom, async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowUpdated = ['owner', 'student', 'name'];
        const isValidOperation = updates.every((update) => {
            return allowUpdated.includes(update);
        });
        if (!isValidOperation)
            return res.status(400).send({ err: 'Invalid operation' });
        updates.forEach((update) => {
            if (update === 'owner' || update === 'student') {
                const newId = mongoose.Types.ObjectId(req.body[update]);
                req.room[update + 's'].push(newId);
            } else {
                req.room[update] = req.body[update];
            }
        });
        await req.room.save();
        res.send(req.room);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/api/room/:id/admin', auth, ownRoom, async (req, res) => {
    try {
        const { _id } = req.body;
        if (
            req.room.owners.length === 1 &&
            _id === req.room.owners[0].toString()
        ) {
            return res
                .status(400)
                .send({ err: 'Room should has at least one admin!' });
        }
        req.room.owners = req.room.owners.filter((owner) => {
            return owner.toString() !== _id;
        });
        await req.room.save();
        res.send(req.room);
    } catch (err) {
        res.status(400).send();
    }
});

router.delete('/api/room/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        await room.remove();
        res.send(room);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
