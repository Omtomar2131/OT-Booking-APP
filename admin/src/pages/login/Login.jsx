import React, { useState } from 'react';
import { loginUser } from '../../features/auth/authSlice'; // Assuming loginUser action is exported
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // To store error message
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const { email, password } = formData;

  // Initialize dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { email, password };

    setIsLoading(true); // Start loading state
    setError(null); // Reset previous error

    try {
      // Dispatch loginUser action
      await dispatch(loginUser(dataToSubmit)).unwrap();
      // Navigate to a different page upon successful login (example: dashboard)
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message); // Set error from backend
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="container">
      <h1 className="heading center">Login</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
