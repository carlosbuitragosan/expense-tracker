import React, { useState } from 'react';
import { CurrentMonthExpenses } from '../CurrentMonthExpenses/CurrentMonthExpenses';
import { AddExpense } from '../AddExpense/AddExpense';
import './dashboard.css';
import { DailyExpenses } from '../dailyExpenses/DailyExpenses';

export const DashBoard = () => {
  const [reloadExpenses, setReloadExpenses] = useState(false);
  const [newExpenseId, setNewExpenseId] = useState(null);

  const handleExpensesAdded = (id) => {
    setReloadExpenses((prev) => !prev);
    setNewExpenseId(id);
  };
  return (
    <div className="dashboard__container">
      <AddExpense
        onExpenseAdded={handleExpensesAdded}
        setNewExpenseId={setNewExpenseId}
      />
      <CurrentMonthExpenses reload={reloadExpenses} />
      <DailyExpenses reload={reloadExpenses} newExpenseId={newExpenseId} />
    </div>
  );
};
