import { Link, NavLink, useNavigate } from 'react-router-dom';
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
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navbar__link link active' : 'navbar__link link'
            }
            to="/dashboard"
          >
            Today
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'navbar__link link active' : 'navbar__link link'
            }
            to="/expenses"
          >
            Breakdown
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'navbar__link link active' : 'navbar__link link'
            }
            to="/settings"
          >
            Settings
          </NavLink>
          {isAuthenticated && (
            <li className="navbar__item">
              <button className="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
