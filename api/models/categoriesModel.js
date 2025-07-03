import query from '../config/db.js';

// select categories
export const selectCategories = async (userId) => {
  try {
    const result = await query(
      `SELECT * FROM categories
      WHERE user_id = $1
      ORDER BY usage_count DESC, name ASC`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error('Error selecting categories: ', err);
    throw new Error('Error selecting categories.');
  }
};

// add new category
export const insertCategory = async (name, userId) => {
  try {
    const result = await query(
      `INSERT INTO categories (name, user_id)
      VALUES ($1, $2)
      ON CONFLICT (name, user_id) DO NOTHING
      RETURNING *`,
      [name, userId]
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    const existingCategory = await query(
      `SELECT * FROM categories
      WHERE name = $1 AND user_id = $2;`,
      [name, userId]
    );
    return existingCategory.rows[0];
  } catch (err) {
    console.error('Error inserting a category: ', err);
    throw new Error('Error inserting a category.');
  }
};
