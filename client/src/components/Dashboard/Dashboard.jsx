import React, { useState } from 'react';
import { CurrentMonthExpenses } from '../CurrentMonthExpenses/CurrentMonthExpenses';
import { AddExpense } from '../AddExpense/AddExpense';

export const DashBoard = () => {
  const [reloadExpenses, setReloadExpenses] = useState(false);

  const handleExpensesAdded = () => {
    setReloadExpenses((prev) => !prev);
  };
  return (
    <div>
      <AddExpense onExpenseAdded={handleExpensesAdded} />
      <CurrentMonthExpenses reload={reloadExpenses} />
    </div>
  );
};
