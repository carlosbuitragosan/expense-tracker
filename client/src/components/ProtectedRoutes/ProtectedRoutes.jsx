import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useExpenseStore';

export const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="placeholder-glow">
          <div className="placeholder col-12 mb-3" style={{ height: '30px' }} />
          <div className="placeholder col-8 mb-3" style={{ height: '20px' }} />
          <div className="placeholder col-6" style={{ height: '20px' }} />
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/users/login" replace />;
};
