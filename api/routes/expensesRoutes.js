import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';

import {
  addExpense,
  getMonthlyExpenses,
  getRangeExpenses,
  getCalendarYearExpenses,
  editExpense,
  getMonthlyExpenseList,
} from '../controllers/expensesController.js';

const router = express.Router();

router.post('/', authenticateJWT, addExpense);
router.get('/:year', authenticateJWT, getCalendarYearExpenses);
router.get('/:year/:month', authenticateJWT, getMonthlyExpenses);
router.get('/:year/:month/details', authenticateJWT, getMonthlyExpenseList);
router.get(
  '/:startYear/:startMonth/:endYear/:endMonth',
  authenticateJWT,
  getRangeExpenses
);
router.put('/:expenseId', authenticateJWT, editExpense);

export default router;
