import { useEffect, useState } from 'react';
import {
  getExpenseListByMonth,
  getTotalMonthExpenses,
} from '../../../services/expenseService';
import './expenses.css';

export const Expenses = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const formattedMonthYear = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1));

  const handleMonthChange = (direction) => {
    let newYear = year;
    let newMonth = month + direction;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenseList = await getExpenseListByMonth(year, month);
        setExpenses(expenseList);

        const total = await getTotalMonthExpenses(year, month);
        setTotalExpenses(total);
      } catch (err) {
        console.error('Error fetching expenses: ', err);
      }
    };
    fetchExpenses();
  }, [year, month]);

  return (
    <div className="expenses__container">
      <div className="expenses__navigation">
        <button onClick={() => handleMonthChange(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <p>{formattedMonthYear}</p>
        <button onClick={() => handleMonthChange(1)}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      <p>
        total Spent:{' '}
        <span>£{totalExpenses ? totalExpenses.replace(/\.00$/, '') : 0}</span>
      </p>
      <ul className="expenses__list">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.id} className="expenses__list_item">
              <div className="list__item_description">
                <p className="item__date">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <p className="item__category">
                  {expense.category_name || 'No category'}
                </p>
              </div>
              <p className="item__description">{expense.description}</p>
              <p className="item__amount">£{expense.amount}</p>
            </li>
          ))
        ) : (
          <p>No expenses found for this month</p>
        )}
      </ul>
    </div>
  );
};
