const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');
const { getMessages, deleteMessage, deleteAllMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// Login
router.post('/login', loginAdmin);

// Protected Message Routes
router.route('/messages').get(protect, getMessages).delete(protect, deleteAllMessages);
router.route('/messages/:id').delete(protect, deleteMessage);

module.exports = router;
