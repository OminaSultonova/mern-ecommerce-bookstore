import express from 'express';
import User from '../models/user.js'; // Import User model
import Book from '../models/book.js';

const router = express.Router();

// Fetch liked items
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.params.userId }).populate('likedItems');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.likedItems);
  } catch (error) {
    console.error('Error fetching liked items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a liked item
router.post('/', async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findOne({ googleId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    // Check if the book is already liked
    if (user.likedItems.includes(book._id)) {
      return res.status(400).json({ message: 'Book already liked' });
    }
    user.likedItems.push(book._id);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error adding liked item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a liked item
router.delete('/:userId/:bookId', async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const user = await User.findOne({ googleId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.likedItems.pull(bookId);
    await user.save();
    res.json({ message: 'Like removed' });
  } catch (error) {
    console.error('Error removing liked item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
