import {
  insertExpense,
  getExpensesByMonth,
  getExpensesByRange,
  getExpensesByCalendarYear,
} from '../models/expenses.js';

export const addExpense = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: 'Unauthorised. Please log in.' });
  }

  const { userId } = req.user;
  console.log(userId);
  const { amount, description, category, date } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'amount is required.' });
  }
  try {
    const expense = await insertExpense(
      userId,
      amount,
      description,
      category,
      date
    );
    return res.status(201).json(expense);
  } catch (err) {
    console.error('Error details: ', err);
    return res
      .status(500)
      .json({ message: 'Error adding expense.', error: err.message });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  const { userId } = req.user;
  const { year, month } = req.params;
  try {
    const monthlyExpenses = await getExpensesByMonth(userId, year, month);
    return res.status(200).json(monthlyExpenses);
  } catch (err) {
    console.error('Error getting monthly expenses: ', err);
    return res.status(500).json({ message: 'Error fetching expenses.' });
  }
};

export const getRangeExpenses = async (req, res) => {
  const { userId } = req.user;
  const { startYear, startMonth, endYear, endMonth } = req.params;
  try {
    const yearlyExpenses = await getExpensesByRange(
      userId,
      startYear,
      startMonth,
      endYear,
      endMonth
    );
    res.status(200).json(yearlyExpenses);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching expenses.' });
  }
};

export const getCalendarYearExpenses = async (req, res) => {
  const { userId } = req.user;
  const { year } = req.params;

  try {
    const yearlyExpenses = await getExpensesByCalendarYear(userId, year);
    return res.status(200).json(yearlyExpenses);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetchin expenses.' });
  }
};
