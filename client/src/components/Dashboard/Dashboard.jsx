import React from 'react';
import { CurrentMonthExpenses } from '../CurrentMonthExpenses/CurrentMonthExpenses';
import { AddExpense } from '../AddExpense/AddExpense';

export const DashBoard = () => {
  return (
    <div>
      <AddExpense />
      <CurrentMonthExpenses />
    </div>
  );
};
