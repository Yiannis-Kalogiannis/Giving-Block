// messages.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.jsx');

const { sendMessages, getMessages } = require('../controllers/messages/message.controllers.jsx');

router.post('/send/:id', verifyToken, sendMessages);
router.get('/get/:id', verifyToken, getMessages);

module.exports = router;