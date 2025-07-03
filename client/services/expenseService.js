import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// get the current month's expenses
export const getCurrentMonthExpenses = async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const response = await apiClient.get(`/expenses/${year}/${month}`);
    return response.data.total;
  } catch (err) {
    console.error('Error fetching expenses:', err);
    return 0;
  }
};

// get total expenses for a specific month
export const getTotalMonthExpenses = async (year, month) => {
  try {
    const response = await apiClient.get(`/expenses/${year}/${month}`);
    return response.data.total;
  } catch (err) {
    console.error('Error fetching total monthly expenses: ', err);
    return 0;
  }
};

// get all user's data by month
export const getExpenseListByMonth = async (year, month) => {
  try {
    const response = await apiClient.get(`/expenses/${year}/${month}/details`);
    return response.data;
  } catch (err) {
    console.error('Error fetching expense list: ', err);
    return [];
  }
};

// get monthly expenses grouped by categories
export const getExpensesByCategory = async (year, month) => {
  try {
    const response = await apiClient.get(
      `/expenses/${year}/${month}/categories`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching expenses by category: ', err);
    throw err;
  }
};

// add a new expense
export const addExpense = async (expenseData) => {
  try {
    const response = await apiClient.post(`/expenses`, expenseData);
    return response;
  } catch (err) {
    console.error('Error adding a new expense:', err);
    throw new Error(err);
  }
};

// get all user's data by day
export const getDailyExpenses = async (year, month, day) => {
  try {
    const response = await apiClient.get(`/expenses/${year}/${month}/${day}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching daily expenses: ', err);
    return [];
  }
};

// edit expense
export const editExpense = async (expenseId, updatedExpense) => {
  'updatedExpense: ', updatedExpense;
  try {
    const response = await apiClient.put(
      `/expenses/${expenseId}`,
      updatedExpense
    );
    return response.data;
  } catch (err) {
    console.error('Error updating expense: ', err);
    throw new Error(err);
  }
};

// get a single expense by id
export const getExpenseById = async (expenseId) => {
  try {
    const response = await apiClient.get(`/expenses/edit/${expenseId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// delete expense by id
export const deleteExpense = async (expenseId) => {
  try {
    const response = await apiClient.delete(`/expenses/${expenseId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting expense: ', err);
    throw new Error(err);
  }
};

export const getCategoryExpensesByRange = async (
  startYear,
  startMonth,
  endYear,
  endMonth
) => {
  try {
    const response = await apiClient.get(
      `/expenses/range/${startYear}/${startMonth}/${endYear}/${endMonth}`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching expenses by category range: ', err);
    throw new Error(err);
  }
};

// categories

// get all categories
export const getCategories = async () => {
  try {
    const response = await apiClient.get(`/categories`);
    return response.data;
  } catch (err) {
    console.error('Error fetching categories: ', err);
    throw new Error(
      err.response?.data?.error || err.message || 'Error fetching categories.'
    );
  }
};

// add a new category
export const addCategory = async (name) => {
  try {
    const response = await apiClient.post(`/categories`, { name });
    return response.data;
  } catch (err) {
    console.error('Error adding new category: ', err);
    throw new Error(
      err.response?.data?.error || err.message || 'Error adding new category.'
    );
  }
};
