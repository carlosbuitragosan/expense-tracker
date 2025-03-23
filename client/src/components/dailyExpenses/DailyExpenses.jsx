import { useEffect, useState } from 'react';
import { getDailyExpenses } from '../../../services/expenseService';
import './dailyExpenses.css';
import { formattedDate } from '../../../utils/dateUtils';

export const DailyExpenses = ({ reload, newExpenseId }) => {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth() + 1);
  const [day] = useState(today.getDate());
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [totalDailyExpenses, setTotalDailyExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getDailyExpenses(year, month, day);
      setDailyExpenses(expenses);

      const total = expenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );
      setTotalDailyExpenses(total);
    };
    fetchExpenses();
  }, [year, month, day, reload]);
  return (
    <div>
      {dailyExpenses.length > 0 ? (
        <ul className="detailedExpenses__list">
          {dailyExpenses.map((expense) => (
            <li
              key={expense.id}
              className={`detailedExpenses__list_item ${expense.id === newExpenseId ? 'new-expense-highlight' : ''}`}
            >
              <div>
                <p>{formattedDate(expense.date)}</p>
                <p className="detailedExpenses__category">
                  {expense.category_name || 'No category'}
                </p>
              </div>
              <p>{expense.description}</p>
              <p>£ {expense.amount.toString().replace(/\.00$/, '')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses for today</p>
      )}
      <p className="dailyTotal">
        Total for today: £
        {totalDailyExpenses.toFixed(2).toString().replace(/\.00$/, '')}
      </p>
    </div>
  );
};
