import { useEffect } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { ExpensesByCategory } from '../expensesByCategory/ExpensesByCategory';
import { DetailedExpenses } from '../detailedExpenses/DetailedExpenses';
import './expenses.css';

export const Expenses = () => {
  const {
    year,
    month,
    showFullList,
    totalExpenses,
    categoryExpenses,
    detailedExpenses,
    fetchExpenses,
    toggleFullList,
    setMonthYear,
  } = useExpenseStore();
  const today = new Date();

  const formattedMonthYear = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1));

  const handleMonthChange = (direction) => {
    const newYear =
      month === 1 && direction === -1
        ? year - 1
        : month === 12 && direction === 1
          ? year + 1
          : year;
    const newMonth = ((month - 1 + direction + 12) % 12) + 1;
    setMonthYear(newYear, newMonth);
  };

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

        <button type="button" onClick={toggleFullList}>
          {showFullList ? 'Back to category view' : 'View full list'}
        </button>
      </div>

      <div className="expenses__container">
        <p className="totalSpent">
          {`Total Spent: £${totalExpenses ? totalExpenses.toString().replace(/\.00$/, '') : 0}`}
        </p>
        {!showFullList ? <ExpensesByCategory /> : <DetailedExpenses />}
      </div>
    </div>
  );
};
