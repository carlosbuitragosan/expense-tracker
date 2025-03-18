import { useEffect, useState } from 'react';
import { getExpensesByMonth } from '../../../services/expenseService';

export const Expenses = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [expenses, setExpenses] = useState([]);
  console.log(expenses);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpensesByMonth(year, month);
        setExpenses(data);
      } catch (err) {
        console.error('Error fetching expenses: ', err);
      }
    };
    fetchExpenses();
  }, [year, month]);

  return (
    <div>
      <h2>expenses</h2>
    </div>
  );
};
