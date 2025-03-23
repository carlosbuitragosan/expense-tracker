import { useState, useRef } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { formattedDate } from '../../../utils/dateUtils';
import { EditExpense } from '../editExpense/EditExpense';
import './detailedExpenses.css';

export const DetailedExpenses = () => {
  const { detailedExpenses, editingExpense, setEditingExpense } =
    useExpenseStore();
  const [isEditing, setIsEditing] = useState(false);
  const timeoutRef = useRef(null);

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTimeout(() => {
      setEditingExpense(null);
    }, 3000);
  };
  console.log('expense id: ', editingExpense?.id);

  return (
    <div>
      {isEditing ? (
        <EditExpense handleClose={handleCloseEdit} />
      ) : (
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
                  <div>
                    <p>{formattedDate(expense.date)}</p>
                    <p className="detailedExpenses__category">
                      {expense.category_name || 'No category'}
                    </p>
                  </div>
                  <p>{expense.description}</p>
                  <p className="detailedExpenses__amount">£ {expense.amount}</p>
                  <button onClick={() => handleEditClick(expense)}>Edit</button>
                </li>
              </div>
            ))
          ) : (
            <p>No expenses found for this month</p>
          )}
        </ul>
      )}
    </div>
  );
};
