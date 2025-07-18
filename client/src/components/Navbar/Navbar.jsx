import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useExpenseStore';
import { logoutUser } from '../../../services/authService';
import logo from '../../assets/logo.svg';
import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    const links = document.querySelectorAll('.navbar-collapse .nav-action');
    const collapseElement = document.getElementById('navbarCollapse');

    const handleNavLinkClick = () => {
      const isShown = collapseElement?.classList.contains('show');
      if (isShown) {
        document.querySelector('.navbar-toggler')?.click();
      }
    };

    links.forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, [isAuthenticated]); // ✅ rerun when auth state changes

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
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <Link className="navbar-brand" to="/dashboard">
        <span>Expense Tracker</span>
      </Link>
      {isAuthenticated && (
        <>
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
        </>
      )}

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ms-auto">
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-action${isActive ? ' active' : ''}`
                  }
                  to="/dashboard"
                >
                  Today
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-action${isActive ? ' active' : ''}`
                  }
                  to="/expenses"
                >
                  Breakdown
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-action${isActive ? ' active' : ''}`
                  }
                  to="/reports"
                >
                  Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="nav-action custom-nav-button nav-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
