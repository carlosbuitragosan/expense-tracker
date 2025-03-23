import React from 'react';
import { CurrentMonthExpenses } from '../CurrentMonthExpenses/CurrentMonthExpenses';
import { AddExpense } from '../AddExpense/AddExpense';
import { DailyExpenses } from '../dailyExpenses/DailyExpenses';
import './dashboard.css';

export const DashBoard = () => {
  return (
    <div className="dashboard__container">
      <AddExpense />
      <CurrentMonthExpenses />
      <DailyExpenses />
    </div>
  );
};
