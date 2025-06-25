import { useEffect, useState } from 'react';
import { getCategoryExpensesByRange } from '../../../services/expenseService';
import { displayAmount } from '../../../utils/amountUtils';
import './yearlyExpenses.css';

export const YearlyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const currentyear = new Date().getFullYear();

  useEffect(() => {
    const fetchYearlyExpenses = async () => {
      try {
        const data = await getCategoryExpensesByRange(
          currentyear,
          1,
          currentyear,
          12
        );
        setExpenses(data);
      } catch (err) {
        console.error('Failed to fetch yearly expenses:', err);
      }
    };
    fetchYearlyExpenses();
  }, [currentyear]);

  return (
    <div className="yearly-expenses__container">
      <h2 className="expenses__list expenses__title">Report - {currentyear}</h2>
      <ul className="expenses__list">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.category_name} className="expenses__list_item">
              <div className="item__category_container">
                <p className="item__category">
                  {expense.category_name || 'No category'}
                </p>
              </div>
              <p className="item__amount">
                {displayAmount(expense.total_amount)}
              </p>
            </li>
          ))
        ) : (
          <p>No expenses found for this year</p>
        )}
        {expenses.length > 0 && (
          <p className="totalSpent">
            Total:{' '}
            {displayAmount(
              expenses.reduce(
                (sum, expense) => sum + parseFloat(expense.total_amount),
                0
              )
            )}
          </p>
        )}
      </ul>
    </div>
  );
};
