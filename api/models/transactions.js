import query from '../utils/db.js';

export const insertTransaction = async (
  userId,
  amount,
  type,
  categoryId,
  date
) => {
  const result = await query(
    `INSERT INTO transactions (user_id, amount, type, category_id, date)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`,
    [userId, amount, type, categoryId, date]
  );
  return result.rows[0];
};

export const getTransactionsByUserId = async (userId) => {
  const result = await query(
    `SELECT * FROM transactions
    WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};
