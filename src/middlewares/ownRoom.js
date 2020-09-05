const Room = require('../models/Room');

const ownRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room)
            return res.status(400).send({ err: 'Did not found this room' });
        if (!room.owners.includes(req.admin._id)) {
            return res.status(400).send({ err: 'You did not own this room!' });
        }
        req.room = room;
        next();
    } catch (err) {
        res.status(500).send();
    }
};

module.exports = ownRoom;
