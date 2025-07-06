import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getExpensesByCategory,
  getExpenseListByMonth,
  getTotalMonthExpenses,
} from '../../../services/expenseService';
import { ExpensesByCategory } from '../expensesByCategory/ExpensesByCategory';
import { DetailedExpenses } from '../detailedExpenses/DetailedExpenses';
import { displayAmount } from '../../../utils/amountUtils';
import { useExpenseStore } from '../../store/useExpenseStore';
import arrowBack from '../../assets/arrow-back.svg';
import arrowForward from '../../assets/arrow-forward.svg';
import './expenses.css';

export const Expenses = () => {
  const { showFullList, toggleFullList } = useExpenseStore();
  const { refreshMonthKey } = useExpenseStore();
  const location = useLocation();
  const initialYear = location.state?.year || new Date().getFullYear();
  const initialMonth = location.state?.month || new Date().getMonth() + 1;
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [detailedExpenses, setDetailedExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const categoryData = await getExpensesByCategory(year, month);
        const detailedData = await getExpenseListByMonth(year, month);
        const total = await getTotalMonthExpenses(year, month);

        setCategoryExpenses(categoryData);
        setDetailedExpenses(detailedData);
        setTotalExpenses(total);
      } catch (err) {
        console.error('Error fetching expenses: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [year, month, refreshMonthKey]);

  const handleMonthChange = (direction) => {
    const newYear =
      month === 1 && direction === -1
        ? year - 1
        : month === 12 && direction === 1
          ? year + 1
          : year;
    const newMonth = ((month - 1 + direction + 12) % 12) + 1;
    setYear(newYear);
    setMonth(newMonth);
  };

  const formattedMonthYear = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1));

  return (
    <div className="expense__container">
      {loading ? (
        <div className="placeholder-glow px-3">
          <div className="placeholder col-12 mb-3" style={{ height: '30px' }} />
          <div className="placeholder col-10 mb-3" style={{ height: '20px' }} />
          <div className="placeholder col-8 mb-3" style={{ height: '20px' }} />
        </div>
      ) : (
        <>
          <div className="expenses__navigation_container">
            <div className="expenses__navigation">
              <button onClick={() => handleMonthChange(-1)}>
                <img src={arrowBack} />
              </button>
              <p className="expenses__navigation_date">{formattedMonthYear}</p>
              <button onClick={() => handleMonthChange(1)}>
                <img src={arrowForward} />
              </button>
            </div>

            <div className="view-toggle">
              <button
                className={!showFullList ? 'active' : ''}
                onClick={() => toggleFullList(false)}
                disabled={!showFullList}
              >
                Category View
              </button>
              <button
                className={showFullList ? 'active' : ''}
                onClick={() => toggleFullList(true)}
                disabled={showFullList}
              >
                Full List
              </button>
            </div>
          </div>

          <div className="expenses__container">
            <p className="totalSpent">
              {`This month: ${totalExpenses ? displayAmount(totalExpenses) : 0}`}
            </p>
            {!showFullList ? (
              <ExpensesByCategory expenses={categoryExpenses} />
            ) : (
              <DetailedExpenses expenses={detailedExpenses} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
