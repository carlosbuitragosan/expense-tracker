import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getCurentMonthExpenses = async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const response = await axios.get(`${API_URL}/expenses/${year}/${month}`, {
      withCredentials: true,
    });
    return response.data.total;
  } catch (err) {
    console.error('Error fetching expenses:', err);
    return 0;
  }
};

// get all user's data by month
export const getExpenseListByMonth = async (year, month) => {
  try {
    const response = await axios.get(
      `${API_URL}/expenses/${year}/${month}/details`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching expense list: ', err);
    return [];
  }
};

// get monthly user expenses grouped by categories
export const getExpensesByCategory = async (year, month) => {
  try {
    const response = await axios.get(
      `${API_URL}/expenses/${year}/${month}/categories`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching expenses by category: ', err);
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching categories: ', err);
    throw new Error(
      err.response?.data?.error || err.message || 'Error fetching categories.'
    );
  }
};

export const addCategory = async (name) => {
  try {
    const response = await axios.post(
      `${API_URL}/categories`,
      { name },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error adding new category: ', err);
    throw new Error(
      err.response?.data?.error || err.message || 'Error adding new category.'
    );
  }
};

export const addExpense = async (expenseData) => {
  try {
    await axios.post(`${API_URL}/expenses`, expenseData, {
      withCredentials: true,
    });
  } catch (err) {
    console.error('Error adding a new expense:', err);
    throw new Error(err);
  }
};

export const getTotalMonthExpenses = async (year, month) => {
  try {
    const response = await axios.get(`${API_URL}/expenses/${year}/${month}`, {
      withCredentials: true,
    });
    return response.data.total;
  } catch (err) {
    console.error('Error fetching total monthly expenses: ', err);
    return 0;
  }
};
