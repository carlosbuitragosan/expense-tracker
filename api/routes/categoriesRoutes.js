import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import {
  addCategory,
  getCategories,
} from '../controllers/categoriesController';

const router = express.Router();

router.get('/', authenticateJWT, getCategories);
router.post('/', authenticateJWT, addCategory);

export default router;
