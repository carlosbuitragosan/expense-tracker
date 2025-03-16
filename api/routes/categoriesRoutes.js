import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import {
  addCategory,
  getCategories,
} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', authenticateJWT, getCategories);
router.post('/', authenticateJWT, addCategory);

export default router;
