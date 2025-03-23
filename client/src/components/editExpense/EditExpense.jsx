import { useEffect, useState } from 'react';
import {
  editExpense,
  getCategories,
  addCategory,
} from '../../../services/expenseService';

export const EditExpense = ({ expense, onExpenseUpdated, onClose }) => {
  console.log('expense: ', expense);
  const [formData, setFormData] = useState({
    amount: expense.amount,
    description: expense.description,
    categoryId: '',
    date: expense.date.split('T')[0],
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        const selectedCategory = data.find(
          (category) => category.name === expense.category_name
        );
        if (selectedCategory) {
          setFormData((prevData) => ({
            ...prevData,
            categoryId: selectedCategory.id,
          }));
        }
      } catch (err) {
        console.error('Error fetching categories: ', err);
      }
    };
    fetchCategories();
  }, [expense.category_name]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;

    const existingCategory = categories.find((cat) => cat.name === newCategory);

    if (existingCategory) {
      setFormData({ ...formData, categoryId: existingCategory.id });
      setNewCategory('');
      return;
    }
    try {
      const category = await addCategory(newCategory);
      setCategories([...categories, category]);
      setFormData({ ...formData, categoryId: category.id });
      setNewCategory('');
    } catch (err) {
      console.error('Error adding a category: ', err);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new') {
      setFormData({ ...formData, categoryId: 'new' });
    } else {
      setFormData({ ...formData, categoryId: selectedValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString().split('T')[1];
    const fullDate = `${formData.date}T${currentTime}`;
    const updatedFormData = { ...formData, date: fullDate };

    try {
      await editExpense(expense.id, updatedFormData);
      // notify dashboard a new expense was added
      onExpenseUpdated();
      // close edit form
      onClose();
    } catch (err) {
      console.error('Erorr updating expense: ', err);
    }
  };

  return (
    <div className="addExpense__container">
      <h2>Edit Expense</h2>
      <form className="expense__form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={formData.description ? '' : 'Description (optional)'}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <select
          name="categoryId"
          value={formData.categoryId || ''}
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
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};
