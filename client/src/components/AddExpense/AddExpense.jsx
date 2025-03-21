import { useEffect, useState } from 'react';
import {
  addExpense,
  getCategories,
  addCategory,
} from '../../../services/expenseService';
import './addExpense.css';

export const AddExpense = ({ onExpenseAdded }) => {
  const [formData, settFormData] = useState({
    amount: '',
    description: '',
    categoryId: undefined,
    date: new Date().toISOString().split('T')[0],
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

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

    const existingCategory = categories.find((cat) => cat.name === newCategory);

    if (existingCategory) {
      settFormData({ ...formData, categoryId: existingCategory.id });
      setNewCategory('');
      return;
    }
    try {
      const category = await addCategory(newCategory);
      setCategories([...categories, category]);
      settFormData({ ...formData, categoryId: category.id });
      setNewCategory('');
    } catch (err) {
      console.error('Error adding a category: ', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString().split('T')[1];
    const fullDate = `${formData.date}T${currentTime}`;
    const updatedFormData = { ...formData, date: fullDate };
    try {
      await addExpense(updatedFormData);
      settFormData({
        amount: '',
        description: '',
        categoryId: '',
        date: new Date().toISOString().split('T')[0],
      });
      // notify dashboard a new expense was added
      onExpenseAdded();
    } catch (err) {
      console.error('Erorr adding expense: ', err);
    }
  };

  return (
    <div className="addExpense__container">
      {/* <h2>Add new expense</h2> */}
      <form className="expense__form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Add amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description (optional)"
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
          <div className="newCategory__container">
            <input
              className="newCategory__input"
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              className="button button__add"
              type="button"
              onClick={handleAddCategory}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        )}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
};
