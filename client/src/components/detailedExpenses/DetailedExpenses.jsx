import { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { formattedDate } from '../../../utils/dateUtils';
import { EditExpense } from '../editExpense/EditExpense';
import './detailedExpenses.css';

export const DetailedExpenses = ({ onExpenseUpdated }) => {
  const { detailedExpenses } = useExpenseStore();
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div>
      {editingExpense ? (
        <EditExpense
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onExpenseUpdated={onExpenseUpdated}
        />
      ) : (
        <ul className="detailedExpenses__list">
          {detailedExpenses.length > 0 ? (
            detailedExpenses.map((expense) => (
              <li key={expense.id} className="detailedExpenses__list_item">
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
            ))
          ) : (
            <p>No expenses found for this month</p>
          )}
        </ul>
      )}
    </div>
  );
};
