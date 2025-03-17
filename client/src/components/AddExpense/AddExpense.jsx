import { useEffect, useState } from 'react';
import {
  addExpense,
  getCategories,
  addCategory,
} from '../../../services/expenseService';

export const AddExpense = () => {
  const [formData, settFormData] = useState({
    amount: '',
    description: '',
    categoryId: undefined,
    date: '',
  });

  console.log(formData);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e) => {
    settFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new') {
      settFormData({ ...formData, categoryId: 'new' });
    } else {
      settFormData({ ...formData, categoryId: selectedValue });
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const category = await addCategory(newCategory);
      setCategories([...categories, category]);
      settFormData({ ...formData, categoryId: category.id });
      setNewCategory('');
    } catch (err) {
      console.error('Error adding a category: ', err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories: ', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="Addexpense__container">
      <h2>Add new expense</h2>
      <form>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleCategoryChange}
        >
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          <option name="categoryId" value="new">
            Add new category
          </option>
        </select>
        {formData.categoryId === 'new' && (
          <div>
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>
              Add category
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
