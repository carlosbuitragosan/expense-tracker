import { useEffect, useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { getCurrentMonthExpenses } from '../../../services/expenseService';
import { displayAmount } from '../../../utils/amountUtils';
import './currentMonthExpenses.css';

export const CurrentMonthExpenses = ({ reload }) => {
  const [totalExpenses, setTotalExpenses] = useState(null);
  const { refreshMonthKey } = useExpenseStore();

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
  }, [reload, refreshMonthKey]);

  if (totalExpenses === null) {
    return null;
  }

  return (
    <div>
      <p className="currentMonth__total">
        This month: {displayAmount(totalExpenses)}
      </p>
    </div>
  );
};
