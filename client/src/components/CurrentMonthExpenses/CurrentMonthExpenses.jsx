import { useEffect, useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { getCurrentMonthExpenses } from '../../../services/expenseService';
import { displayAmount } from '../../../utils/amountUtils';
import './currentMonthExpenses.css';

export const CurrentMonthExpenses = ({ reload }) => {
  const [totalExpenses, setTotalExpenses] = useState(null);
  const { refreshMonthKey } = useExpenseStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const total = await getCurrentMonthExpenses();
        if (total && parseFloat(total) > 0) {
          setTotalExpenses(total);
        } else {
          setTotalExpenses(null);
        }
      } catch (err) {
        console.error('Failed to fetch current month expenses:', err);
        setTotalExpenses(null);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [reload, refreshMonthKey]);

  if (loading) {
    return (
      <div className="placeholder-glow px-3">
        <div className="placeholder col-12 mb-3" style={{ height: '30px' }} />
        <div className="placeholder col-10 mb-3" style={{ height: '20px' }} />
        <div className="placeholder col-8 mb-3" style={{ height: '20px' }} />
      </div>
    );
  }

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
