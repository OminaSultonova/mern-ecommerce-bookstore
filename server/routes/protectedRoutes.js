import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/protected', auth, (req, res) => {
  res.send('This is a protected route. Only accessible with a valid session.');
});

export default router;
