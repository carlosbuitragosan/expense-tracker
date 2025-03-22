import { useEffect, useState } from 'react';
import { getDailyExpenses } from '../../../services/expenseService';
import './dailyExpenses.css';

export const DailyExpenses = ({ reload }) => {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth() + 1);
  const [day] = useState(today.getDate());
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getDailyExpenses(year, month, day);
      setDailyExpenses(expenses);
    };
    fetchExpenses();
  }, [year, month, day, reload]);
  return (
    <div>
      {dailyExpenses.length > 0 ? (
        <ul>
          {dailyExpenses.map((expense) => (
            <li key={expense.id}>
              <div>
                <p>{expense.date}</p>
                <p>{expense.category_name || 'No category'}</p>
              </div>
              <p>{expense.description}</p>
              <p>£ {expense.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses for today</p>
      )}
    </div>
  );
};
