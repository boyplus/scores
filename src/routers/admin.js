const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const auth = require('../middlewares/auth');

router.get('/test', async (req, res) => {
    res.send('hello world');
});

router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        const token = await admin.generateAuthToken();
        res.status(201).send({ admin, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findbyCredentials(username, password);
        const token = await admin.generateAuthToken();
        res.status(201).send({ admin, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/admin/profile', auth, async (req, res) => {
    res.send(req.admin);
});

module.exports = router;
