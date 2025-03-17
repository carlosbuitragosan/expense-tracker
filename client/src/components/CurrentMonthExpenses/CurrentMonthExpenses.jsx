import { useEffect, useState } from 'react';
import { getCurentMonthExpenses } from '../../../services/expenseService';

export const CurrentMonthExpenses = ({ reload }) => {
  const [totalExpenses, setTotalExpenses] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const total = await getCurentMonthExpenses();
      setTotalExpenses(total);
    };
    fetchExpenses();
  }, [reload]);

  return (
    <div>
      {totalExpenses !== null ? (
        <p>Total spent this month: ${totalExpenses}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
