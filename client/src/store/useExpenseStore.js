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
  toggleFullList: () => set((state) => ({ showFullList: !state.showFullList })),
  setMonthYear: (year, month) => set({ year, month }),
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
