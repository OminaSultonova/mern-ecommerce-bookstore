import express from 'express';
import Admin from '../models/admin.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log(`Admin not found for email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Directly compare the plain text password
    const isMatch = password === admin.password;
    console.log(`Login attempt for email: ${email}`);
    console.log(`Password match status: ${isMatch}`);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.session.adminId = admin._id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Server error during login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Server error during logout:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});


// Unprotected logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Server error during logout:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Apply auth middleware to all routes below this line
router.use(auth);

// Protected routes
router.get('/dashboard', (req, res) => {
  res.send('Welcome to Admin Dashboard');
});

router.get('/check-auth', (req, res) => {
  if (req.session.adminId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});


export default router;
