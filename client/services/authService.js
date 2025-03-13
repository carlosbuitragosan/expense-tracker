import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5001';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, formData);
    return response.data;
  } catch (err) {
    const errorMesage =
      err.response?.data?.error || err.message || 'Something went wrong.';
    throw new Error(errorMesage);
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error || err.message || 'Login failed.'
    );
  }
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    withCredentials: true,
  });
  return response.data;
};

export const logoutUser = () => {
  Cookies.remove('token');
};
