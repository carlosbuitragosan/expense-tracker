import express from 'express';
import {
  addExpense,
  getMonthlyExpenses,
  getYearlyExpenses,
} from '../controllers/expensesController.js';

const router = express.Router();

router.post('/', addExpense);
router.get('/:userId/:year/:month', getMonthlyExpenses);
router.get('/:userId/:year', getYearlyExpenses);

export default router;
