import express from 'express';
const router = express.Router();
import User from '../models/user.js';

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create or update user data after Google sign-in
router.post('/storeUserData', async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await User.findOne({ googleId });

        if (!user) {
            // Create a new user if not exists
            user = new User({ googleId, email, name });
        } else {
            // Update user data if user already exists
            user.email = email;
            user.name = name;
        }

        await user.save();

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting user with ID: ${req.params.id}`);
      const user = await User.findById(req.params.id);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: err.message });
    }
  });



export default router;
