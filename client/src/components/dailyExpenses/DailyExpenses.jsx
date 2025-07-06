import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../../store/useExpenseStore';
import {
  getDailyExpenses,
  deleteExpense,
} from '../../../services/expenseService';
import { formattedDate } from '../../../utils/dateUtils';
import { displayAmount } from '../../../utils/amountUtils';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import './dailyExpenses.css';

export const DailyExpenses = () => {
  const navigate = useNavigate();
  const { newExpenseId } = useExpenseStore();
  const { triggerRefreshMonthlyExpenses } = useExpenseStore();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [totalDailyExpenses, setTotalDailyExpenses] = useState(0);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const expenses = await getDailyExpenses(year, month, day);
        setDailyExpenses(expenses);

        const total = expenses.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotalDailyExpenses(total);
      } catch (err) {
        console.error('Error fetching daily expenses: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [year, month, day, newExpenseId]);

  const handleEdit = (expenseId) => {
    navigate(`/expenses/edit/${expenseId}`, {
      state: { from: 'dashboard' },
    });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteExpense(expenseToDelete);

      setDailyExpenses((prev) => {
        const updatedExpenses = prev.filter(
          (expense) => expense.id !== expenseToDelete
        );
        const updatedTotal = updatedExpenses.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotalDailyExpenses(updatedTotal);
        return updatedExpenses;
      });

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
      {loading ? (
        <div className="placeholder-glow px-3">
          <div className="placeholder col-12 mb-3" style={{ height: '30px' }} />
          <div className="placeholder col-10 mb-3" style={{ height: '20px' }} />
          <div className="placeholder col-8 mb-3" style={{ height: '20px' }} />
        </div>
      ) : dailyExpenses.length === 0 ? (
        <p className="dailyTotal">No expenses for today</p>
      ) : (
        <>
          <ul className="detailedExpenses__list">
            {dailyExpenses.map((expense) => (
              <div
                className="detailedExpenses__list_item_container"
                key={expense.id}
              >
                <li
                  className={`detailedExpenses__list_item ${expense.id === +newExpenseId ? 'new-expense-highlight' : ''}`}
                >
                  <div className="detailedExpenses__date-category_container">
                    <p>{formattedDate(expense.date)}</p>
                    <div className="detailedExpenses__category">
                      {expense.category_name || 'No category'}
                    </div>
                  </div>
                  <p className="detailedExpenses__description">
                    {expense.description}
                  </p>
                  <p>{displayAmount(expense.amount)}</p>
                  <div className="detailedExpenses__buttons_container">
                    <button
                      className="button__edit"
                      onClick={() => handleEdit(expense.id)}
                    >
                      <img src={editIcon} alt="edit" />
                    </button>
                    <button
                      className="button__delete"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setExpenseToDelete(expense.id)}
                    >
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
          <p className="dailyTotal">
            Today: {displayAmount(totalDailyExpenses)}
          </p>

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
        </>
      )}
    </div>
  );
};
