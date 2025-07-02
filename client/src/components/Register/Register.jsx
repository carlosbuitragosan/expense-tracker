import { useState } from 'react';
import { registerUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import './register.css';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    setError(null);
    try {
      await registerUser(formData);
      navigate('/users/login');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="register__container">
      <h2>Register</h2>

      {error && <p>{error}</p>}

      <form className="register__form" onSubmit={handleSubmit}>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      <div className="register__login_container">
        <p className="register__login_already-a-user">Already a user?</p>
        <button type="button" onClick={() => navigate('/users/login')}>
          Log In
        </button>
      </div>
    </div>
  );
};
