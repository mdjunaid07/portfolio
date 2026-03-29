const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');

// Public route to submit contact form
router.post('/', createMessage);

module.exports = router;
