import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Ensure you add this to your .env file

// User signup route

router.post('/signup', async (req, res) => {
    // Log the request body to see what the server is receiving
    console.log('Received signup request body:', req.body);

    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User registration failed', error: error.message });
    }
});
// User login route

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // Log to check if a user is found
        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // Log the result of the password comparison
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // ... rest of the code ...
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;