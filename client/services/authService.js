import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, formData);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (err) {
    const errorMesage =
      err.response?.data?.error || err.message || 'Something went wrong.';
    throw new Error(errorMesage);
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error || err.message || 'Login failed.'
    );
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Unauthorized.');
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('token');
  } catch (err) {
    console.error('Error during logout: ', err);
  }
};
