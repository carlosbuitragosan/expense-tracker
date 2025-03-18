import React, { useState } from 'react';
import { CurrentMonthExpenses } from '../CurrentMonthExpenses/CurrentMonthExpenses';
import { AddExpense } from '../AddExpense/AddExpense';
import './dashboard.css';
export const DashBoard = () => {
  const [reloadExpenses, setReloadExpenses] = useState(false);

  const handleExpensesAdded = () => {
    setReloadExpenses((prev) => !prev);
  };
  return (
    <div className="dashboard__container">
      <AddExpense onExpenseAdded={handleExpensesAdded} />
      <CurrentMonthExpenses reload={reloadExpenses} />
    </div>
  );
};
