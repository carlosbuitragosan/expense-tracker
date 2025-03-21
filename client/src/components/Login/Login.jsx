import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
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
      await loginUser(formData, setIsAuthenticated);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Log In</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
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
        <div>
          <p>Not a user?</p>
          <button
            className="button"
            type="button"
            onClick={() => navigate('/users/register')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
