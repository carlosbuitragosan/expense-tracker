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

export const loginUser = async (formData, setIsAuthenticated) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData, {
      withCredentials: true,
    });
    if (response.data.userId) {
      setIsAuthenticated(true);
    }
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error || err.message || 'Login failed.'
    );
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Unauthorized.');
  }
};

export const logoutUser = async () => {
  try {
    // withCredentials: true ensures the cookie is sent with the request
    await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
  } catch (err) {
    console.error('Error during logout: ', err);
  }
};
