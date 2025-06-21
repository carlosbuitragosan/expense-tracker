import { useEffect, useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { getDailyExpenses } from '../../../services/expenseService';
import { formattedDate } from '../../../utils/dateUtils';
import { displayAmount } from '../../../utils/amountUtils';
import './dailyExpenses.css';

export const DailyExpenses = () => {
  const { newExpenseId } = useExpenseStore();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [totalDailyExpenses, setTotalDailyExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getDailyExpenses(year, month, day);
        setDailyExpenses(expenses);

        const total = expenses.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotalDailyExpenses(total);
      } catch (err) {
        console.error('Error fetching daily expenses: ', err);
      }
    };
    fetchExpenses();
  }, [year, month, day, newExpenseId]);

  return (
    <div>
      {dailyExpenses.length === 0 ? (
        <p className="dailyTotal">No expenses for today</p>
      ) : (
        <>
          <ul className="detailedExpenses__list">
            {dailyExpenses.map((expense) => (
              <div
                className="detailedExpenses__list_item_container"
                key={expense.id}
              >
                <li
                  className={`detailedExpenses__list_item ${expense.id === newExpenseId ? 'new-expense-highlight' : ''}`}
                >
                  <div>
                    <p>{formattedDate(expense.date)}</p>
                    <p className="detailedExpenses__category">
                      {expense.category_name || 'No category'}
                    </p>
                  </div>
                  <p>{expense.description}</p>
                  <p>{displayAmount(expense.amount)}</p>
                </li>
              </div>
            ))}
          </ul>

          <p className="dailyTotal">
            Total for today: £
            {totalDailyExpenses.toFixed(2).toString().replace(/\.00$/, '')}
          </p>
        </>
      )}
    </div>
  );
};
