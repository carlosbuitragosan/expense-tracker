import { useEffect, useState } from 'react';
import { getCurentMonthExpenses } from '../../services/expenseService';

export const CurrentMonthExpenses = () => {
  const [totalExpenses, setTotalExpenses] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const total = await getCurentMonthExpenses();
      setTotalExpenses(total);
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Expenses this month</h3>
      {totalExpenses !== null ? (
        <p>Total: ${totalExpenses}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
