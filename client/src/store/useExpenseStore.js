import { create } from 'zustand';
import { getUserProfile } from '../../services/authService';

export const useExpenseStore = create((set) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  showFullList: false,
  categoryExpenses: [],
  detailedExpenses: [],
  totalExpenses: 0,
  newExpenseId: null,
  refreshMonthKey: 0,
  toggleFullList: () => set((state) => ({ showFullList: !state.showFullList })),
  setMonthYear: (year, month) => set({ year, month }),
  setNewExpenseId: (id) => set({ newExpenseId: id }),
  triggerRefreshMonthlyExpenses: () =>
    set((state) => ({ refreshMonthKey: state.refreshMonthKey + 1 })),
}));

export const useAuthStore = create((set) => ({
  isAuthenticated: null,
  user: null,
  isLoading: true,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const profile = await getUserProfile();
      set({ isAuthenticated: true, user: profile, isLoading: false });
    } catch {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
