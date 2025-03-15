import './navbar.css';

export const Navbar = () => {
  return (
    <header className="header">
      <div className="logo__container">
        <p className="logo">Logo</p>
      </div>
      <h1 className="header__title">Expense Tracker</h1>
      <navbar className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">Expenses</li>
          <li className="navbar__item">Logout</li>
        </ul>
      </navbar>
    </header>
  );
};
