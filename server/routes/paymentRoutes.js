import express from 'express';
import stripe from 'stripe';
import mongoose from 'mongoose';
import Order from '../models/order.js';
import dotenv from 'dotenv';

dotenv.config();

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { userId, books, totalAmount, shippingAddress } = req.body;

  console.log('Received request to create checkout session with data:', { userId, books, totalAmount, shippingAddress });

  try {
    // Ensure totalAmount is in cents (e.g., 1999 for $19.99)
    const amountInCents = Math.round(Number(totalAmount) * 100);
    console.log('Total amount in cents:', amountInCents);

    // Save the order to the database
    const newOrder = new Order({
      user: userId, // Assume userId is a string and matches the schema
      books: books.map(book => ({
        book: new mongoose.Types.ObjectId(book.bookId),
        quantity: book.quantity,
      })),
      totalAmount: amountInCents, // Store totalAmount in cents
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      },
      status: 'Processing',
    });

    await newOrder.save();
    console.log('Order saved:', newOrder);

    // Create the Stripe session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: books.map(book => ({
        price_data: {
          currency: 'sgd',
          product_data: {
            name: book.title,
          },
          unit_amount: Math.round(book.price), // Ensure price is in cents
        },
        quantity: book.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        order_id: newOrder._id.toString(),
      },
    });

    console.log('Stripe session created:', session);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
