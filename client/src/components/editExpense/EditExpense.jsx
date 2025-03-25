import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  editExpense,
  getCategories,
  addCategory,
  getExpenseById,
} from '../../../services/expenseService';
import './editExpense.css';

export const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    date: '',
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const expense = await getExpenseById(id);
        setFormData({
          amount: expense.amount,
          description: expense.description,
          categoryId: expense.category_id,
          date: expense.date.split('T')[0],
        });
      } catch (err) {
        console.error('Error fetching expense: ', err);
      }
    };
    fetchExpense();
  }, [id]);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    if (!newCategory) {
      toast.error('Please add a category');
      return;
    }

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
    } catch (err) {
      console.error('Error adding a category: ', err);
    }
    setNewCategory('');
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

    console.log('data to update: ', formData);
    try {
      await editExpense(id, formData);

      toast.success('Expense updated successfully.');

      navigate(`/expenses`);
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
        <textarea
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
        <button className="button button__save" type="submit">
          Save
        </button>
        <button
          className="button__cancel"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
