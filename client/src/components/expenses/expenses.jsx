import { useEffect, useState } from 'react';
import {
  getExpensesByCategory,
  getTotalMonthExpenses,
  getExpenseListByMonth,
} from '../../../services/expenseService';
import './expenses.css';

export const Expenses = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [detailedExpenses, setDetailedExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [showFullList, setShowFullList] = useState(false);

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
        if (showFullList) {
          const detailedData = await getExpenseListByMonth(year, month);
          setDetailedExpenses(detailedData);
        } else {
          const expensesByCategory = await getExpensesByCategory(year, month);
          setCategoryExpenses(expensesByCategory);
        }

        const total = await getTotalMonthExpenses(year, month);
        setTotalExpenses(total);
      } catch (err) {
        console.error('Error fetching expenses: ', err);
      }
    };
    fetchExpenses();
  }, [year, month, showFullList]);

  return (
    <div className="expense__container">
      <div className="expenses__navigation_container">
        <div className="expenses__navigation">
          <button onClick={() => handleMonthChange(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p>{formattedMonthYear}</p>
          <button onClick={() => handleMonthChange(1)}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <button type="button" onClick={() => setShowFullList((prev) => !prev)}>
          {showFullList ? 'Back to category view' : 'View full list'}
        </button>
      </div>

      <div className="expenses__container">
        <p className="totalSpent">
          {`Total Spent: £${totalExpenses ? totalExpenses.toString().replace(/\.00$/, '') : 0}`}
        </p>

        {!showFullList ? (
          <ul className="expenses__list">
            {categoryExpenses.length > 0 ? (
              categoryExpenses.map((expense) => (
                <li key={expense.id} className="expenses__list_item">
                  <div className="item__category_container">
                    <p className="item__category">
                      {expense.category_name || 'No category'}
                    </p>
                  </div>
                  <p className="item__amount">£{expense.total_amount}</p>
                </li>
              ))
            ) : (
              <p>No expenses found for this month</p>
            )}
          </ul>
        ) : (
          <ul>
            {detailedExpenses.length > 0 ? (
              detailedExpenses.map((expense) => (
                <li key={expense.id}>
                  <div>
                    <p>{expense.date}</p>
                    <p>{expense.category_name}</p>
                  </div>
                  <p>{expense.description}</p>
                  <p>{expense.amount}</p>
                </li>
              ))
            ) : (
              <p>No expenses found for this month</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
