import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useExpenseStore } from '../../store/useExpenseStore';
import {
  addExpense,
  getCategories,
  addCategory,
} from '../../../services/expenseService';
import add from '../../assets/add.svg';
import './addExpense.css';

export const AddExpense = () => {
  const { setNewExpenseId, triggerRefreshMonthlyExpenses } = useExpenseStore();
  const formRef = useRef(null);
  const timeoutRef = useRef(null);
  const [formOpen, setFormOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: undefined,
    date: new Date().toISOString().split('T')[0],
  });
  const maxDescriptionLength = 200;

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories: ', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setFormOpen(false);
      }
    };
    if (formOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formOpen]);

  useEffect(() => {
    if (formOpen) {
      setShowButton(false);
    } else {
      const timer = setTimeout(() => setShowButton(true), 100);
      return () => clearTimeout(timer);
    }
  }, [formOpen]);

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
      await fetchCategories();
      const newExpense = response.data;

      setFormData({
        amount: '',
        description: '',
        categoryId: undefined,
        date: new Date().toISOString().split('T')[0],
      });

      setNewExpenseId(newExpense.id);
      triggerRefreshMonthlyExpenses();
      toast.success('Expense added successfully.');
      setFormOpen(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setNewExpenseId(null);
      }, 3000);
    } catch (err) {
      console.error('Erorr adding expense: ', err);
      if (!formData.amount) {
        toast.error('Please enter an amount.');
        return;
      }
      toast.error('Failed to add expense.');
    }
  };

  return (
    <div className="addExpense__container">
      <AnimatePresence>
        {!formOpen && showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <button
              className="showForm__button"
              type="button"
              onClick={() => {
                if (!formOpen) {
                  setFormOpen(true);
                }
              }}
            >
              Add Expense
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {formOpen && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <form className="expense__form" onSubmit={handleSubmit}>
              <input
                type="number"
                inputMode="decimal"
                name="amount"
                placeholder="Add amount"
                value={formData.amount}
                onChange={handleChange}
              />
              <div className="expense__description_container">
                <textarea
                  className="expense__description"
                  type="text"
                  name="description"
                  placeholder="Description (optional)"
                  rows={3}
                  maxLength={maxDescriptionLength}
                  value={formData.description}
                  onChange={handleChange}
                />
                <span className="char-counter">
                  {maxDescriptionLength - formData.description.length}
                </span>
              </div>
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
                    <img src={add} />
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
