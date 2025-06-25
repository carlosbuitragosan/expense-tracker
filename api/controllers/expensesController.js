import {
  insertExpense,
  getTotalExpensesByMonth,
  getTotalExpensesByRange,
  getTotalExpensesByCalendarYear,
  updateExpense,
  getMonthlyExpenseDetails,
  getTotalMonthlyExpensesByCategory,
  getDailyExpenses,
  findExpenseById,
  deleteExpenseById,
  findExpensesByCategoryRange,
} from '../models/expensesModel.js';

// Add a new expense
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

// Get all expenses by month
export const getTotalMonthlyExpenses = async (req, res) => {
  const { userId } = req.user;
  const { year, month } = req.params;
  try {
    const monthlyExpenses = await getTotalExpensesByMonth(userId, year, month);
    return res.status(200).json(monthlyExpenses);
  } catch (err) {
    console.error('Error getting monthly expenses: ', err);
    return res.status(500).json({ message: 'Error fetching expenses.' });
  }
};

// Get all expenses by range
export const getTotalRangeExpenses = async (req, res) => {
  const { userId } = req.user;
  const { startYear, startMonth, endYear, endMonth } = req.params;
  try {
    const yearlyExpenses = await getTotalExpensesByRange(
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

// Get all expenses by calendar year
export const getTotalCalendarYearExpenses = async (req, res) => {
  const { userId } = req.user;
  const { year } = req.params;

  try {
    const yearlyExpenses = await getTotalExpensesByCalendarYear(userId, year);
    return res.status(200).json(yearlyExpenses);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetchin expenses.' });
  }
};

// Edit an existing expense
export const editExpense = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: 'Unauthorised. Please log in.' });
  }

  const { userId } = req.user;
  const { expenseId } = req.params;
  const { amount, description, categoryId, date } = req.body;

  if (!amount || !date) {
    return res
      .status(400)
      .json({ error: 'Amount, category ID, and date are required.' });
  }
  try {
    const updatedExpense = await updateExpense(
      expenseId,
      userId,
      amount,
      description,
      categoryId,
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

// get monthly expenses grouped by categories
export const getTotalExpensesByCategory = async (req, res) => {
  const { userId } = req.user;
  const { year, month } = req.params;

  try {
    const categoryExpenses = await getTotalMonthlyExpensesByCategory(
      userId,
      year,
      month
    );
    return res.status(200).json(categoryExpenses);
  } catch (err) {
    console.error('Error fetching expenses by category: ', err);
    return res
      .status(500)
      .json({ message: 'Error fetching expenses by category.' });
  }
};

// get user's data by day
export const getExpensesByDay = async (req, res) => {
  const { userId } = req.user;
  const { year, month, day } = req.params;
  try {
    const expenses = await getDailyExpenses(userId, year, month, day);
    return res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses by day: ', err);
    return res.status(500).json({ message: 'Error fetching expenses by day.' });
  }
};

// get single expense
export const getExpenseById = async (req, res) => {
  const { userId } = req.user;
  const { expenseId } = req.params;
  try {
    const expense = await findExpenseById(expenseId, userId);
    return res.status(200).json(expense);
  } catch (err) {
    console.error('Error fetching expense by id: ', err);
    return res.status(500).json({ message: 'Error fetching expense by id.' });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  const { userId } = req.user;
  const { expenseId } = req.params;
  try {
    await deleteExpenseById(expenseId, userId);
    return res.status(204).json({ message: 'Expense deleted successfully.' });
  } catch (err) {
    console.error('Error deleting expense: ', err);
    return res.status(500).json({ message: 'Error deleting expense.' });
  }
};

// Get expenses by category  within a date range
export const getExpensesByCategoryRange = async (req, res) => {
  const { userId } = req.user;
  const { startYear, startMonth, endYear, endMonth } = req.params;

  try {
    const result = await findExpensesByCategoryRange(
      userId,
      startYear,
      startMonth,
      endYear,
      endMonth
    );
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching expenses by category range: ', err);
    return res
      .status(500)
      .json({ message: 'Error fetching expenses by category range.' });
  }
};
