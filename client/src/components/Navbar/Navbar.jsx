import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../services/authService';
import { useAuthStore } from '../../store/useExpenseStore';
import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      logoutUser();
      logout();
      navigate('/users/login');
    } catch (err) {
      console.error('Error logging out: ', err);
    }
  };

  return (
    <header className="header">
      <div className="logo__container">
        <div className="logo">
          <Link className="link" to="/dashboard">
            <span className="material-symbols-outlined wallet__icon">
              account_balance_wallet
            </span>
          </Link>
        </div>
      </div>
      <Link className="link" to="/dashboard">
        <h1 className="header__title">Expense Tracker</h1>
      </Link>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link link" to="/expenses">
              Expenses
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link link">Settings</Link>
          </li>
          {isAuthenticated && (
            <li className="navbar__item">
              <button
                className="navbar__logout_button button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
