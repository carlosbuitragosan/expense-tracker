export const DetailedExpenses = ({ detailedExpenses }) => {
  return (
    <ul>
      {detailedExpenses.length > 0 ? (
        detailedExpenses.map((expense) => (
          <li key={expense.id}>
            <div>
              <p>{expense.date}</p>
              <p>{expense.category_name}</p>
            </div>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
          </li>
        ))
      ) : (
        <p>No expenses found for this month</p>
      )}
    </ul>
  );
};
