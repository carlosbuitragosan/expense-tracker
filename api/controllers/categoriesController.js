import { insetCategory, selectCategories } from '../models/categoriesModel.js';

// add new category
export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required.' });
  }
  try {
    const newCategory = await insetCategory(name);
    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(500).json({ message: 'Error adding category.' });
  }
};

// get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await selectCategories();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching categories.' });
  }
};
