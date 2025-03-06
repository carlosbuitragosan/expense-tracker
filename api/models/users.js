import query from '../utils/db.js';
import crypto from 'crypto';
console.log(crypto.randomBytes(64).toString('hex'));
export const createUser = async (email, passwordHash) => {
  try {
    const result = await query(
      `INSERT INTO users (email, password_hash, created_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    RETURNING *`,
      [email, passwordHash]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Database error: ', err);
    throw err;
  }
};

export const getUserByEmail = async (email) => {
  const result = await query(
    `SELECT * FROM users
    WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};
