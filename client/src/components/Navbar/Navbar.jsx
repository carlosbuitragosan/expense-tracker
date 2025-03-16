import './navbar.css';
import { logoutUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      logoutUser();
      setIsAuthenticated(false);
      navigate('/users/login');
    } catch (err) {
      console.error('Error logging out: ', err);
    }
  };

  return (
    <header className="header">
      <div className="logo__container">
        <p className="logo">Logo</p>
      </div>
      <h1 className="header__title">Expense Tracker</h1>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">Expenses</li>
          {isAuthenticated && (
            <li className="navbar__item">
              <button className="navbar__button button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
