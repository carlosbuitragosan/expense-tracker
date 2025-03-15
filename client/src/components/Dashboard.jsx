import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { CurrentMonthExpenses } from './CurrentMonthExpenses';

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
      <button onClick={handleLogout}>Logout</button>
      <CurrentMonthExpenses />
    </div>
  );
};
