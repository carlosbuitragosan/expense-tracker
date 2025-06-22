import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../../utils/dateUtils';
import { displayAmount } from '../../../utils/amountUtils';
import { deleteExpense } from '../../../services/expenseService';
import { useExpenseStore } from '../../store/useExpenseStore';
import './detailedExpenses.css';

export const DetailedExpenses = ({ expenses }) => {
  const navigate = useNavigate();
  const { newExpenseId, triggerRefreshMonthlyExpenses } = useExpenseStore();
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleEditClick = (expense) => {
    navigate(`/expenses/edit/${expense.id}`, {
      state: { from: 'expenses' },
    });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteExpense(expenseToDelete);

      toast.success('Expense deleted');
      triggerRefreshMonthlyExpenses();
    } catch (err) {
      console.error('Error deleting expense: ', err);
      toast.error('Delete failed');
    } finally {
      setExpenseToDelete(null);
    }
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
                <div className="detailedExpenses__buttons_container">
                  <button
                    className="button__edit"
                    onClick={() => handleEditClick(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="button__delete"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setExpenseToDelete(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          ))
        ) : (
          <p>No expenses found for this month</p>
        )}

        {/* Modal for delete confirmation */}
        <div
          className="modal fade custom-delete-modal"
          id="deleteModal"
          tabIndex="-1"
        >
          <div className="modal-dialog custom-modal modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">Delete expense?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleDeleteConfirmed}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};
