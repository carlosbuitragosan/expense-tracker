import query from '../config/db.js';

export const insertExpense = async (
  userId,
  amount,
  description,
  categoryId,
  date
) => {
  try {
    const result = await query(
      `INSERT INTO expenses (user_id, amount, description, category_id, date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
      [userId, amount, description, categoryId, date]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting expense into database: ', err);
    throw new Error('Error adding expense.');
  }
};

export const getExpensesByMonth = async (userId, year, month) => {
  if (!userId || !year || !month) {
    throw new Error('User ID, year, and month are required.');
  }
  // handle month increment and year change
  const nextMonth = +month === 12 ? 1 : +month + 1;
  const nextYear = +month === 12 ? +year + 1 : year;
  // format dates
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

  try {
    const result = await query(
      `SELECT SUM(amount) AS total 
      FROM expenses 
      WHERE user_id = $1
      and date >= $2
      and date < $3`,
      [userId, startDate, endDate]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error getting expenses by month: ', err);
    throw new Error('Error getting expenses by month.');
  }
};

export const getExpensesByRange = async (
  userId,
  startYear,
  startMonth,
  endYear = null,
  endMonth = null
) => {
  const startDate = `${startYear}-${String(startMonth).padStart(2, '0')}-01`;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-${new Date(endYear, endMonth, 0).getDate()}`;

  try {
    const result = await query(
      `SELECT SUM(amount) AS total
      FROM expenses
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3`,
      [userId, startDate, endDate]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error getting expenses by year: ', err);
    throw new Error('Error getting expenses by range.');
  }
};

export const getExpensesByCalendarYear = async (userId, year) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  try {
    const result = await query(
      `SELECT SUM(amount) AS total
      FROM expenses
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3`,
      [userId, startDate, endDate]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error getting expenses by calendar year: ', err);
    throw new Error('Error getting expenses by calendar year.');
  }
};

export const updateExpense = async (
  expenseId,
  userId,
  amount,
  description,
  category,
  date
) => {
  try {
    const result = await query(
      `UPDATE expenses
      SET amount = $1, 
      description = $2,
      category = $3,
      date = $4
      WHERE id = $5
      AND user_id = $6
      RETURNING *`,
      [amount, description, category, date, expenseId, userId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error updating expenses.');
    throw new Error('Error updating expenses.');
  }
};
