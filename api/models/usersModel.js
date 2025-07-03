import query from '../config/db.js';
import { defaultCategories } from '../config/defaultCategories.js';

export const createUser = async (email, passwordHash) => {
  try {
    // CREATE USER IN THE USERS TABLE
    const result = await query(
      `INSERT INTO users (email, password_hash, created_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    RETURNING *`,
      [email, passwordHash]
    );
    const newUser = result.rows[0];

    await Promise.all(
      defaultCategories.map((name) =>
        query(
          `INSERT INTO categories (name, user_id, usage_count)
          VALUES ($1, $2, 0)`,
          [name, newUser.id]
        )
      )
    );

    return newUser;
  } catch (err) {
    await query('ROLLBACK');
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
