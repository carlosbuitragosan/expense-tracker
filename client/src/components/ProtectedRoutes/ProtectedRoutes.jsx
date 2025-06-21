import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useExpenseStore';

export const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <p>Loading..</p>;

  return isAuthenticated ? children : <Navigate to="/users/login" replace />;
};
