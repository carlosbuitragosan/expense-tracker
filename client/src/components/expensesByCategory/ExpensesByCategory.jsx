import { useExpenseStore } from '../../store/useExpenseStore';
import './expensesByCategory.css';

export const ExpensesByCategory = () => {
  const { categoryExpenses } = useExpenseStore();

  return (
    <ul className="expenses__list">
      {categoryExpenses.length > 0 ? (
        categoryExpenses.map((expense) => (
          <li key={expense.category_name} className="expenses__list_item">
            <div className="item__category_container">
              <p className="item__category">
                {expense.category_name || 'No category'}
              </p>
            </div>
            <p className="item__amount">£{expense.total_amount}</p>
          </li>
        ))
      ) : (
        <p>No expenses found for this month</p>
      )}
    </ul>
  );
};
