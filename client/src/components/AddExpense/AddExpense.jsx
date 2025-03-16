// import { useEffect, useState } from 'react';
// import {
//   addExpense,
//   getCategories,
//   addCategory,
// } from '../../../services/expenseService';

export const AddExpense = () => {
  return (
    <form>
      <input type="number" placeholder="Amount" />
      <input type="text" placeholder="Description" />
    </form>
  );
};
