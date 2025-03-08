import query from '../utils/db.js';

export const insertExpense = async (userId, amount, description, date) => {
  try {
    const result = await query(
      `INSERT INTO expenses (user_id, amount, description, date)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
      [userId, amount, description, date]
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
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  // format dates
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

  const result = await query(
    `SELECT SUM(amount) AS total 
    FROM expenses 
    WHERE user_id = $1
    and date >= $2
    and date < $3`,
    [userId, startDate, endDate]
  );
  return result.rows[0];
};

export const getExpensesByYear = async (userId, year) => {
  if (!userId || !year) {
    throw new Error('User ID and year are required.');
  }
  // formate date
  const startDate = `${year}-01-01`;
  const endDate = `${year + 1}-01-01`;

  const result = await query(
    `SELECT SUM(amount) AS total
    FROM expenses
    WHERE user_id = $1
    AND date >= $2
    AND date < $3`,
    [userId, startDate, endDate]
  );
  return result.rows[0];
};
