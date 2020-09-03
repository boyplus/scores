const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const keys = require('../config/keys');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('This is token ', token);
        const decode = jwt.verify(token, keys.jwtSecret);
        const admin = await Admin.findOne({
            _id: decode._id,
            'tokens.token': token,
        });
        console.log('This is decode ', decode);
        console.log('This is admin ', admin);
        if (!admin) throw new Error();
        req.token = token;
        req.admin = admin;
        next();
    } catch (err) {
        res.send({ err: 'Please authenticate' });
    }
};

module.exports = auth;
