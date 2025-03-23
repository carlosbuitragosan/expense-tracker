import query from '../config/db.js';

// add new category
export const insetCategory = async (name) => {
  try {
    const result = await query(
      `INSERT INTO categories (name)
      VALUES ($1)
      ON CONFLICT (name) DO NOTHING
      RETURNING *`,
      [name]
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    const existingCategory = await query(
      `SELECT * FROM categories
      WHERE name = $1;`,
      [name]
    );
    return existingCategory.rows[0];
  } catch (err) {
    console.error('Error inserting a category: ', err);
    throw new Error('Error inserting a category.');
  }
};

// select categories
export const selectCategories = async () => {
  try {
    const result = await query(`SELECT * FROM categories`);
    return result.rows;
  } catch (err) {
    console.error('Error selecting categories: ', err);
    throw new Error('Error selecting categories.');
  }
};
