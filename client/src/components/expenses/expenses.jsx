import { useEffect, useState, useCallback } from 'react';
import {
  getExpensesByCategory,
  getTotalMonthExpenses,
  getExpenseListByMonth,
} from '../../../services/expenseService';
import { ExpensesByCategory } from '../expensesByCategory/ExpensesByCategory';
import './expenses.css';
import { DetailedExpenses } from '../detailedExpenses/DetailedExpenses';

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

  const fetchExpenses = useCallback(async () => {
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
  }, [year, month, showFullList]);

  useEffect(() => {
    fetchExpenses();
  }, [year, month, showFullList, fetchExpenses]);

  return (
    <div className="expense__container">
      <div className="expenses__navigation_container">
        <div className="expenses__navigation">
          <button onClick={() => handleMonthChange(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p className="expenses__navigation_date">{formattedMonthYear}</p>
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
          <ExpensesByCategory categoryExpenses={categoryExpenses} />
        ) : (
          <DetailedExpenses
            detailedExpenses={detailedExpenses}
            onExpenseUpdated={fetchExpenses}
          />
        )}
      </div>
    </div>
  );
};
