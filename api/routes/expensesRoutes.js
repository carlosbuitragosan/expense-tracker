import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import {
  addExpense,
  getTotalMonthlyExpenses,
  getTotalRangeExpenses,
  getTotalCalendarYearExpenses,
  editExpense,
  getMonthlyExpenseList,
  getTotalExpensesByCategory,
  getExpensesByDay,
  getExpenseById,
  deleteExpense,
  getExpensesByCategoryRange,
} from '../controllers/expensesController.js';

const router = express.Router();

// the more specific routes should come first
router.get('/edit/:expenseId', authenticateJWT, getExpenseById);
router.get(
  '/range/:startYear/:startMonth/:endYear/:endMonth',
  authenticateJWT,
  getExpensesByCategoryRange
);
router.get(
  '/:startYear/:startMonth/:endYear/:endMonth',
  authenticateJWT,
  getTotalRangeExpenses
);
router.get(
  '/:year/:month/categories',
  authenticateJWT,
  getTotalExpensesByCategory
);
router.get('/:year/:month/details', authenticateJWT, getMonthlyExpenseList);
router.get('/:year/:month/:day', authenticateJWT, getExpensesByDay);
router.get('/:year/:month', authenticateJWT, getTotalMonthlyExpenses);
router.get('/:year', authenticateJWT, getTotalCalendarYearExpenses);
router.put('/:expenseId', authenticateJWT, editExpense);
router.post('/', authenticateJWT, addExpense);
router.delete('/:expenseId', authenticateJWT, deleteExpense);

export default router;
