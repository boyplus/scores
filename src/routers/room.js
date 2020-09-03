const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const auth = require('../middlewares/auth');

router.get('/api/rooms', async (req, res) => {
    res.send();
});

router.post('/api/room', async (req, res) => {
    
});

router.get('/api/room', async (req, res) => {});
