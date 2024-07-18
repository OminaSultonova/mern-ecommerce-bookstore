import express from 'express';
import Book from '../models/book.js';

const router = express.Router();

// Get all books or books by category
router.get('/', async (req, res) => {
  const category = req.query.category;
  console.log(`Received request to fetch books for category: ${category}`); // Debugging line
  try {
    const books = category ? await Book.find({ category: category.toLowerCase() }) : await Book.find();
    console.log('Books fetched:', books); // Debugging line
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new book
router.post('/', async (req, res) => {
    try {
      const { title, description, price, category, image } = req.body;
      console.log('Received data:', { title, description, price, category, image });
  
      if (!title || !description || !price || !category || !image) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newBook = new Book({
        title,
        description,
        price,
        category: category.toLowerCase(),
        image,
      });
  
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Update a book
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        book.title = req.body.title || book.title;
        book.description = req.body.description || book.description;
        book.price = req.body.price || book.price;
        book.category = req.body.category ? req.body.category.toLowerCase() : book.category;
        book.image = req.body.image || book.image;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.deleteOne(); // Use deleteOne() method

        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




export default router;
