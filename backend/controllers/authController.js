const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    const envUser = process.env.ADMIN_USERNAME || 'admin';
    const envPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === envUser && password === envPass) {
        res.json({
            _id: 'admin_id',
            username: username,
            token: generateToken('admin_id'),
            message: 'Login successful'
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = {
    loginAdmin,
};
