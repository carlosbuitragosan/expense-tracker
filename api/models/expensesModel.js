import query from '../config/db.js';

//add expense
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

    await query(
      `UPDATE categories
      SET usage_count = usage_count + 1
      WHERE id = $1`,
      [categoryId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting expense into database: ', err);
    throw new Error('Error adding expense.');
  }
};

// update expense by id
export const updateExpense = async (
  expenseId,
  userId,
  amount,
  description,
  categoryId,
  date
) => {
  try {
    const result = await query(
      `UPDATE expenses
      SET amount = $1, 
      description = $2,
      category_id = $3,
      date = $4
      WHERE id = $5
      AND user_id = $6
      RETURNING *`,
      [amount, description, categoryId, date, expenseId, userId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error updating expenses.');
    throw new Error('Error updating expenses.');
  }
};

// delete expense by id
export const deleteExpenseById = async (expenseId, userId) => {
  if (!expenseId || !userId) {
    throw new Error('Expense ID and user ID are required.');
  }
  try {
    const result = await query(
      `DELETE FROM expenses
      WHERE id = $1
      AND user_id = $2`,
      [expenseId, userId]
    );
  } catch (err) {
    console.error('Error deleting expense: ', err);
    throw new Error('Error deleting expense.');
  }
};

export const getTotalExpensesByMonth = async (userId, year, month) => {
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

export const getTotalExpensesByRange = async (
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

export const getTotalExpensesByCalendarYear = async (userId, year) => {
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

// get all user's data by month
export const getMonthlyExpenseDetails = async (userId, year, month) => {
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
      `SELECT 
        expenses.id, 
        expenses.amount, 
        expenses.description, 
        expenses.date,
        categories.name AS category_name 
      FROM expenses
      LEFT JOIN categories
      ON expenses.category_id = categories.id
      WHERE expenses.user_id = $1
      AND expenses.date BETWEEN $2 AND $3
      ORDER BY expenses.date DESC`,
      [userId, startDate, endDate]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching monthly expenses: ', err);
    throw new Error('Error fetching monthly expenses.');
  }
};

export const getTotalMonthlyExpensesByCategory = async (
  userId,
  year,
  month
) => {
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
      `SELECT
        categories.name AS category_name,
        SUM(expenses.amount) AS total_amount
      FROM expenses
      LEFT JOIN categories
      ON expenses.category_id = categories.id
      WHERE expenses.user_id = $1
      AND expenses.date BETWEEN $2 AND $3
      GROUP BY categories.name
      ORDER BY total_amount DESC`,
      [userId, startDate, endDate]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching monthly expenses by category: ', err);
    throw new Error('Error fetching monthly expenses by category.');
  }
};

// get list of daily expenses
export const getDailyExpenses = async (userId, year, month, day) => {
  if (!userId || !year || !month || !day) {
    throw new Error('User ID, year, month, and day are required.');
  }
  try {
    const startDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 00:00:00`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 23:59:59`;

    const result = await query(
      `SELECT
        expenses.id,
        expenses.amount,
        expenses.description,
        expenses.date,
        categories.name AS category_name
      FROM expenses
      LEFT JOIN categories
      ON expenses.category_id = categories.id
      WHERE expenses.user_id = $1
      AND expenses.date BETWEEN $2 AND $3
      ORDER BY expenses.date DESC`,
      [userId, startDate, endDate]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching daily expenses: ', err);
    throw new Error('Error fetching daily expenses.');
  }
};

// get user's data by expense id
export const findExpenseById = async (expenseId, userId) => {
  if (!expenseId || !userId) {
    throw new Error('Expense ID and user ID are required.');
  }
  try {
    const result = await query(
      `SELECT * FROM expenses
      WHERE id = $1
      AND user_id = $2`,
      [expenseId, userId]
    );

    if (!result.rows[0]) {
      throw new Error('Expense not found.');
    }
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching expense by id: ', err);
    throw new Error('Error fetching expense by id.');
  }
};

// get expenses by category for a year-month date range
export const findExpensesByCategoryRange = async (
  userId,
  startYear,
  startMonth,
  endYear,
  endMonth
) => {
  const startDate = `${startYear}-${String(startMonth).padStart(2, '0')}-01`;
  const nextMonth = +endMonth === 12 ? 1 : +endMonth + 1;
  const nextYear = +endMonth === 12 ? +endYear + 1 : endYear;
  const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

  try {
    const result = await query(
      `SELECT 
        categories.name AS category_name,
        SUM(expenses.amount) AS total_amount
      FROM expenses
      LEFT JOIN categories
      ON expenses.category_id = categories.id
      WHERE expenses.user_id = $1
      AND expenses.date 
      BETWEEN $2 AND $3
      GROUP BY categories.name
      ORDER BY total_amount DESC`,
      [userId, startDate, endDate]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching expenses by range: ', err);
    throw new Error('Error fetching expenses by range.');
  }
};
