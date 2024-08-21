import express from 'express';
import { User } from '../models/user.js'; // Adjust this path based on your project structure

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
});

// Login
router.post('/login', async (req, res) => { // Changed to /login to match typical endpoint structure
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email, password } });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error logging in" });
    }
});

export default router;
