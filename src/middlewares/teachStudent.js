const Student = require('../models/Student');
const Room = require('../models/Room');

const teachStudent = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const student = await Student.findById(_id);
        if (!student)
            return res.status(400).send({ err: 'Did not found this student.' });
        const room = await Room.findById(student.room);
        const owners = room.owners;
        if (!owners.includes(req.admin._id)) {
            return res
                .status(400)
                .send({ err: 'You did not teach this student.' });
        }
        req.student = student;
        next();
    } catch (err) {
        res.status(500).send();
    }
};

module.exports = teachStudent;
