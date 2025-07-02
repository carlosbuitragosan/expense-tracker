import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';
import { useAuthStore } from '../../store/useExpenseStore';
import './login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await loginUser(formData);
      login();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login__container">
      <h2>Log In</h2>

      {error && <p>{error}</p>}

      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="button" type="submit">
          Log In
        </button>
      </form>

      <div className="login__register_container">
        <p className="login__register_not-a-user">Not a user?</p>
        <button
          className="button"
          type="button"
          onClick={() => navigate('/users/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
};
