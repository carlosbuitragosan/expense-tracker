import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import {
  addExpense,
  getMonthlyExpenses,
  getRangeExpenses,
  getCalendarYearExpenses,
  editExpense,
  getMonthlyExpenseList,
  getExpensesByCategory,
  getExpensesByDay,
} from '../controllers/expensesController.js';

const router = express.Router();

router.post('/', authenticateJWT, addExpense);
router.get('/:year', authenticateJWT, getCalendarYearExpenses);
router.get('/:year/:month', authenticateJWT, getMonthlyExpenses);
router.get('/:year/:month/:day', authenticateJWT, getExpensesByDay);
router.get('/:year/:month/details', authenticateJWT, getMonthlyExpenseList);
router.get('/:year/:month/categories', authenticateJWT, getExpensesByCategory);
router.get(
  '/:startYear/:startMonth/:endYear/:endMonth',
  authenticateJWT,
  getRangeExpenses
);
router.put('/:expenseId', authenticateJWT, editExpense);

export default router;
