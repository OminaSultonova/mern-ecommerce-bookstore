import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.js';
import User from '../models/user.js';  // Import the User model
import Book from '../models/book.js';



const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    // Populate books.book references first
    const orders = await Order.find().populate('books.book');

    // Fetch and attach user details
    const ordersWithUserDetails = await Promise.all(orders.map(async (order) => {
      const user = await User.findOne({ googleId: order.user });
      if (user) {
        return { ...order._doc, userDetails: { googleId: user.googleId, name: user.name } };
      } else {
        return { ...order._doc, userDetails: { googleId: 'N/A', name: 'N/A' } };
      }
    }));

    res.json(ordersWithUserDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single order
router.get('/order/:id', async (req, res) => {
  try {
    // Populate books.book references first
    const order = await Order.findById(req.params.id).populate('books.book');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Fetch and attach user details
    const user = await User.findOne({ googleId: order.user });
    if (user) {
      res.json({ ...order._doc, userDetails: { googleId: user.googleId, name: user.name } });
    } else {
      res.json({ ...order._doc, userDetails: { googleId: 'N/A', name: 'N/A' } });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
    console.log('Creating order with user ID:', req.body.user); // Debug log
  
    const order = new Order({
      user: req.body.user, // Ensure this is the Google ID
      books: req.body.books.map(book => ({
        book: new mongoose.Types.ObjectId(book.bookId),
        quantity: book.quantity,
      })),
      totalAmount: req.body.totalAmount,
      shippingAddress: {
        address: req.body.shippingAddress.address,
        city: req.body.shippingAddress.city,
        postalCode: req.body.shippingAddress.postalCode,
        country: req.body.shippingAddress.country,
      },
      status: req.body.status || 'Processing',
    });
  
    try {
      const newOrder = await order.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Fetch user orders
  router.get('/user/:googleId', async (req, res) => {
    try {
      const googleId = req.params.googleId;
      console.log('Fetching orders for googleId:', googleId); // Log googleId
      const orders = await Order.find({ user: googleId }).populate('books.book');
      console.log('Orders found:', orders); // Log orders found
      res.json(orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ message: err.message });
    }
  });

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.deleteOne(); // Use deleteOne() method

    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
