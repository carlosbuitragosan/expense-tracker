import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';

export const DashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logoutUser();
      navigate('/users/login');
    } catch (err) {
      console.error('Error logging out: ', err);
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
