const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Room = require('./Room');
const Student = require('./Student');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: 7 },
    tokens: [{ token: { type: String, required: true } }],
});

adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
});

adminSchema.pre('remove', async function (next) {
    const admin = this;
    const rooms = await Room.find({ owners: admin._id });
    rooms.forEach(async (room) => {
        await Student.deleteMany({ room: room._id });
    });
    await Room.deleteMany({ owners: admin._id });
    next();
});

adminSchema.methods.generateAuthToken = async function () {
    const admin = this;
    const token = jwt.sign({ _id: admin._id.toString() }, keys.jwtSecret);

    admin.tokens = admin.tokens.concat({ token });
    await admin.save();
    return token;
};

adminSchema.statics.findbyCredentials = async function (username, password) {
    const admin = await Admin.findOne({ username });
    if (!admin) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return admin;
};

adminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();
    delete adminObject.password;
    delete adminObject.tokens;
    return adminObject;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
