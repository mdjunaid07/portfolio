const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        phone: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: [true, 'Please add a text message'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Message', messageSchema);
