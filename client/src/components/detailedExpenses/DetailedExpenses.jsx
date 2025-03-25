import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../../store/useExpenseStore';
import { formattedDate } from '../../../utils/dateUtils';
import { EditExpense } from '../editExpense/EditExpense';
import { displayAmount } from '../../../utils/amountUtils';
import './detailedExpenses.css';

export const DetailedExpenses = () => {
  const { detailedExpenses, editingExpense } = useExpenseStore();
  const navigate = useNavigate();

  const handleEditClick = (expense) => {
    navigate(`/expenses/edit/${expense.id}`);
  };

  return (
    <div>
      <ul className="detailedExpenses__list">
        {detailedExpenses.length > 0 ? (
          detailedExpenses.map((expense) => (
            <div
              className="detailedExpenses__list_item_container"
              key={expense.id}
            >
              <li
                className={`detailedExpenses__list_item ${editingExpense?.id === expense.id ? 'new-expense-highlight' : ''}`}
              >
                <div className="detailedExpenses__date-category_container">
                  <p>{formattedDate(expense.date)}</p>
                  <p className="detailedExpenses__category">
                    {expense.category_name || 'No category'}
                  </p>
                </div>
                <p>{expense.description}</p>
                <p className="detailedExpenses__amount">
                  £ {displayAmount(expense.amount)}
                </p>
                <button onClick={() => handleEditClick(expense)}>Edit</button>
              </li>
            </div>
          ))
        ) : (
          <p>No expenses found for this month</p>
        )}
      </ul>
    </div>
  );
};
