import { create } from 'zustand';
import {
  getExpensesByCategory,
  getTotalMonthExpenses,
  getExpenseListByMonth,
} from '../../services/expenseService';
import { getUserProfile } from '../../services/authService';

export const useExpenseStore = create((set, get) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  showFullList: false,
  categoryExpenses: [],
  detailedExpenses: [],
  totalExpenses: 0,
  newExpenseId: null,

  fetchExpenses: async () => {
    const { year, month, showFullList } = get();
    try {
      if (showFullList) {
        const detailedData = await getExpenseListByMonth(year, month);
        set({ detailedExpenses: detailedData });
      } else {
        const expensesByCategory = await getExpensesByCategory(year, month);
        set({ categoryExpenses: expensesByCategory });
      }
      const total = await getTotalMonthExpenses(year, month);
      set({ totalExpenses: total });
    } catch (err) {
      console.error('Error fetching expenses: ', err);
    }
  },
  // toggle between full list and category view
  toggleFullList: () => set((state) => ({ showFullList: !state.showFullList })),

  // set the month and year
  setMonthYear: (year, month) => set({ year, month }),

  // set the new expense id for highlighting
  setNewExpenseId: (id) => set({ newExpenseId: id }),
}));

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  checkAuth: async () => {
    try {
      await getUserProfile();
      set({ isAuthenticated: true });
    } catch {
      set({ isAuthenticated: false });
    }
  },
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    set({ isAuthenticated: false });
  },
}));
