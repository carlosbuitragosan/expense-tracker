import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useExpenseStore } from '../../store/useExpenseStore';
import {
  addExpense,
  getCategories,
  addCategory,
} from '../../../services/expenseService';
import './addExpense.css';

export const AddExpense = () => {
  const { fetchExpenses, setNewExpenseId } = useExpenseStore();
  const formRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: undefined,
    date: new Date().toISOString().split('T')[0],
  });

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

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new') {
      setFormData({ ...formData, categoryId: 'new' });
    } else {
      setFormData({ ...formData, categoryId: selectedValue });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString().split('T')[1];
    const fullDate = `${formData.date}T${currentTime}`;
    const updatedFormData = { ...formData, date: fullDate };
    try {
      const response = await addExpense(updatedFormData);
      const newExpense = response.data;

      setFormData({
        amount: '',
        description: '',
        categoryId: undefined,
        date: new Date().toISOString().split('T')[0],
      });

      setNewExpenseId(newExpense.id);
      fetchExpenses();
      toast.success('Expense added successfully.');
      setIsFormVisible(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setNewExpenseId(null);
      }, 3000);
    } catch (err) {
      console.error('Erorr adding expense: ', err);
      toast.error('Failed to add expense.');
    }
  };

  return (
    <div className="addExpense__container">
      {!isFormVisible && (
        <button
          className="showForm__button"
          type="button"
          onClick={() => {
            if (!isFormVisible) {
              setIsFormVisible(true);
            }
          }}
        >
          Add Expense
        </button>
      )}

      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{
              opacity: 1,
              height: formRef.current ? formRef.current.scrollHeight : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
