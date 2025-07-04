import { displayAmount } from '../../../utils/amountUtils';
import './expensesByCategory.css';

export const ExpensesByCategory = ({ expenses }) => {
  return (
    <ul className="expenses__list">
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <li key={expense.category_name} className="expenses__list_item">
            <div className="item__category_container">
              <div className="item__category">
                {expense.category_name || 'No category'}
              </div>
            </div>
            <p className="item__amount">
              {displayAmount(expense.total_amount)}
            </p>
          </li>
        ))
      ) : (
        <p className="no-expenses">No expenses found for this month</p>
      )}
    </ul>
  );
};
