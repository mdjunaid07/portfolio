const Message = require('../models/Message');

// @desc    Get all messages
// @route   GET /api/admin/messages
// @access  Private
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
        const newMessage = await Message.create({
            name,
            email,
            phone: phone || '',
            message,
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete message
// @route   DELETE /api/admin/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await message.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete all messages
// @route   DELETE /api/admin/messages
// @access  Private
const deleteAllMessages = async (req, res) => {
    try {
        await Message.deleteMany({});
        res.status(200).json({ message: 'All messages deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getMessages,
    createMessage,
    deleteMessage,
    deleteAllMessages,
};
