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
  getExpenseById,
} from '../controllers/expensesController.js';

const router = express.Router();

// the more specific routes should come first
router.get('/edit/:expenseId', authenticateJWT, getExpenseById);
router.get(
  '/:startYear/:startMonth/:endYear/:endMonth',
  authenticateJWT,
  getRangeExpenses
);
router.get('/:year/:month/categories', authenticateJWT, getExpensesByCategory);
router.get('/:year/:month/details', authenticateJWT, getMonthlyExpenseList);
router.get('/:year/:month/:day', authenticateJWT, getExpensesByDay);
router.get('/:year/:month', authenticateJWT, getMonthlyExpenses);
router.get('/:year', authenticateJWT, getCalendarYearExpenses);
router.put('/:expenseId', authenticateJWT, editExpense);
router.post('/', authenticateJWT, addExpense);

export default router;
