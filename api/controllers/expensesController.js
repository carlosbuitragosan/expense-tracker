import {
  insertExpense,
  getExpensesByMonth,
  getExpensesByRange,
  getExpensesByCalendarYear,
  updateExpense,
  getMonthlyExpenseDetails,
} from '../models/expensesModel.js';

export const addExpense = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: 'Unauthorised. Please log in.' });
  }

  const { userId } = req.user;
  const { amount, description, categoryId, date } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'amount is required.' });
  }
  try {
    const expense = await insertExpense(
      userId,
      amount,
      description,
      categoryId,
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

export const editExpense = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: 'Unauthorised. Please log in.' });
  }

  const { userId } = req.user;
  const { expenseId } = req.params;
  const { amount, description, category, date } = req.body;

  if (!amount || !description || !category || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const updatedExpense = await updateExpense(
      expenseId,
      userId,
      amount,
      description,
      category,
      date
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found.' });
    }
    return res.status(200).json(updatedExpense);
  } catch (err) {
    console.error('Error updating expense.');
    return res.status(500).json({ message: 'Error updating expense.' });
  }
};

// get all user's data by month
export const getMonthlyExpenseList = async (req, res) => {
  const { userId } = req.user;
  const { year, month } = req.params;
  try {
    const expenses = await getMonthlyExpenseDetails(userId, year, month);
    return res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses: ', err);
    return res.status(500).json({ message: 'Error fetching expenses.' });
  }
};
