import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors middleware
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import likeRoutes from './routes/likeRoutes.js'; // Import likeRoutes
import protectedRoutes from './routes/protectedRoutes.js';


import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
  }));


// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);  // Add this line to use payment routes
app.use('/api/admin', adminRoutes);
app.use('/api', protectedRoutes);
app.use('/api/likes', likeRoutes); // Use likeRoutes


// Simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
