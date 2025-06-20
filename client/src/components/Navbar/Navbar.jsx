import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useExpenseStore';
import { logoutUser } from '../../../services/authService';
import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const links = document.querySelectorAll('.navbar-collapse .nav-action');
    const collapseElement = document.getElementById('navbarCollapse');

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const isShown = collapseElement.classList.contains('show');
        if (isShown) {
          // Simulate Bootstrap toggle by clicking the toggler again
          document.querySelector('.navbar-toggler').click();
        }
      });
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Collapse the menu *before* logout navigation
      const collapseElement = document.getElementById('navbarCollapse');
      const isShown = collapseElement?.classList.contains('show');
      if (isShown) {
        document.querySelector('.navbar-toggler')?.click();
      }
      logoutUser();
      logout();
      navigate('/users/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/dashboard">
        <span className="material-symbols-outlined me-2">
          account_balance_wallet
        </span>
        <span>Expense Tracker</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link nav-action" to="/dashboard">
              Today
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link nav-action" to="/expenses">
              Breakdown
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link nav-action" to="/settings">
              Settings
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <button
                className="nav-action btn btn-outline-danger ms-md-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
