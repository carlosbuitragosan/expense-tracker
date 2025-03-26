import { useEffect } from 'react';
import { useAuthStore } from '../store/useExpenseStore';

export const AuthProvider = ({ children }) => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
};
