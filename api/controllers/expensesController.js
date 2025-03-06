import {
  insertExpense,
  getExpensesByMonth,
  getExpensesByYear,
} from '../models/expenses.js';

export const addExpense = async (req, res) => {
  const { userId, amount, description, date } = req.body;

  if (!userId || !amount) {
    return res
      .status(400)
      .json({ error: ' User ID and amount are required.' });
  }
  try {
    const expense = await insertExpense(
      userId,
      amount,
      description,
      date
    );
    res.status(201).json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error adding expense.', error: err });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  const { userId, year, month } = req.params;
  try {
    const monthlyExpenses = await getExpensesByMonth(
      userId,
      year,
      month
    );
    res.status(200).json(monthlyExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses.' });
  }
};

export const getYearlyExpenses = async (req, res) => {
  const { userId, year } = req.params;
  try {
    const yearlyExpenses = await getExpensesByYear(userId, year);
    res.status(200).json(yearlyExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses.' });
  }
};
