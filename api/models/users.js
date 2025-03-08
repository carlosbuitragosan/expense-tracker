import query from '../utils/db.js';

export const createUser = async (email, passwordHash) => {
  try {
    await query('BEGIN');
    // CREATE USER IN THE USERS TABLE
    const result = await query(
      `INSERT INTO users (email, password_hash, created_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    RETURNING *`,
      [email, passwordHash]
    );

    const newUser = result.rows[0];
    const userId = newUser.id;

    // COMMIT THE TRASACTION
    await query('COMMIT');

    console.log(`Created user ${email} with ID ${userId}`);

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
