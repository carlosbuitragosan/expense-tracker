import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, formData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || 'Something went wrong.';
  }
};
