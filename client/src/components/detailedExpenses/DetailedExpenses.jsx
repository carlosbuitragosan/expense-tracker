import './detailedExpenses.css';

export const DetailedExpenses = ({ detailedExpenses }) => {
  const formattedDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
  };

  return (
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
          </li>
        ))
      ) : (
        <p>No expenses found for this month</p>
      )}
    </ul>
  );
};
