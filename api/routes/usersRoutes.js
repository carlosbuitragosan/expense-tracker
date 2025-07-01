import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { registerUser, getUser } from '../controllers/usersController.js';
import { loginUser } from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateJWT, getUser);

export default router;
