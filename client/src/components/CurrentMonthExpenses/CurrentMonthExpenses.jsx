import { useEffect, useState } from 'react';
import { getCurrentMonthExpenses } from '../../../services/expenseService';

export const CurrentMonthExpenses = ({ reload }) => {
  const [totalExpenses, setTotalExpenses] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const total = await getCurrentMonthExpenses();
        if (total && parseFloat(total) > 0) {
          setTotalExpenses(total);
        } else {
          setTotalExpenses(null);
        }
      } catch (err) {
        console.error('Failed to fetch current month expenses:', err);
        setTotalExpenses(null);
      }
    };
    fetchExpenses();
  }, [reload]);

  if (totalExpenses === null) {
    return null;
  }

  return (
    <div>
      <p>Total spent this month: £{totalExpenses.replace(/\.00$/, '')}</p>
    </div>
  );
};
