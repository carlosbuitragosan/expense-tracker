import { useEffect, useState } from 'react';
import { getCategoryExpensesByRange } from '../../../services/expenseService';
import { displayAmount } from '../../../utils/amountUtils';
import './yearlyExpenses.css';

export const YearlyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentyear = new Date().getFullYear();

  useEffect(() => {
    const fetchYearlyExpenses = async () => {
      try {
        setLoading(true);
        const data = await getCategoryExpensesByRange(
          currentyear,
          1,
          currentyear,
          12
        );
        setExpenses(data);
      } catch (err) {
        console.error('Failed to fetch yearly expenses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchYearlyExpenses();
  }, [currentyear]);

  return (
    <div className="yearly-expenses__container">
      <h2 className="expenses__list expenses__title">Report - {currentyear}</h2>
      <ul className="expenses__list">
        {loading ? (
          <div className="placeholder-glow">
            <div
              className="placeholder col-12 mb-3"
              style={{ height: '30px' }}
            />
            <div
              className="placeholder col-10 mb-3"
              style={{ height: '30px' }}
            />
            <div
              className="placeholder col-8 mb-3"
              style={{ height: '30px' }}
            />
          </div>
        ) : expenses.length > 0 ? (
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
          <p className="no-expenses">No expenses found for this year</p>
        )}
        {!loading && expenses.length > 0 && (
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
