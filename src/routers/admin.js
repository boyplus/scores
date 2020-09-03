const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const auth = require('../middlewares/auth');

router.get('/test', async (req, res) => {
    res.send('hello world');
});

router.post('/api/admin', async (req, res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        const token = await admin.generateAuthToken();
        res.status(201).send({ admin, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findbyCredentials(username, password);
        const token = await admin.generateAuthToken();
        res.status(201).send({ admin, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/api/admin/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.admin.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/api/admin/logoutAll', auth, async (req, res) => {
    try {
        req.admin.tokens = [];
        await req.admin.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/api/admin/profile', auth, async (req, res) => {
    res.send(req.admin);
});

router.patch('/api/admin', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdated = ['name', 'password'];
    const isValidOperation = updates.every((update) => {
        return allowUpdated.includes(update);
    });
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid Operation' });
    try {
        updates.forEach((update) => (req.admin[update] = req.body[update]));
        await req.admin.save();
        res.send(req.admin);
    } catch (err) {
        res.status(500).send();
    }
});

router.delete('/api/admin', auth, async (req, res) => {
    try {
        await req.admin.remove();
        res.send(req.admin);
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router;
