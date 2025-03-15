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
