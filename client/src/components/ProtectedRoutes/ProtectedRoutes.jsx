import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserProfile } from '../../services/authService';

export const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserProfile();
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Authentication failed: ', err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading..</p>;
  return isAuthenticated ? children : <Navigate to="/users/login" replace />;
};
