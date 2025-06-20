import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../../utils/dateUtils';
import { displayAmount } from '../../../utils/amountUtils';
import { useExpenseStore } from '../../store/useExpenseStore';
import './detailedExpenses.css';

export const DetailedExpenses = ({ expenses }) => {
  const { newExpenseId } = useExpenseStore();
  const navigate = useNavigate();

  const handleEditClick = (expense) => {
    navigate(`/expenses/edit/${expense.id}`, {
      state: { from: 'expenses' },
    });
  };

  return (
    <div>
      <ul className="detailedExpenses__list">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div
              className="detailedExpenses__list_item_container"
              key={expense.id}
            >
              <li
                className={`detailedExpenses__list_item ${expense.id === +newExpenseId ? 'new-expense-highlight' : ''}`}
              >
                <div className="detailedExpenses__date-category_container">
                  <p>{formattedDate(expense.date)}</p>
                  <p className="detailedExpenses__category">
                    {expense.category_name || 'No category'}
                  </p>
                </div>
                <p className="detailedExpenses__description">
                  {expense.description}
                </p>
                <p className="detailedExpenses__amount">
                  {displayAmount(expense.amount)}
                </p>
                <button
                  className="button__edit"
                  onClick={() => handleEditClick(expense)}
                >
                  Edit
                </button>
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
