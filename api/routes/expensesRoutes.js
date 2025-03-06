import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';

import {
  addExpense,
  getMonthlyExpenses,
  getYearlyExpenses,
} from '../controllers/expensesController.js';

const router = express.Router();

router.post('/', authenticateJWT, addExpense);
router.get('/:userId/:year/:month', authenticateJWT, getMonthlyExpenses);
router.get('/:userId/:year', authenticateJWT, getYearlyExpenses);

export default router;
