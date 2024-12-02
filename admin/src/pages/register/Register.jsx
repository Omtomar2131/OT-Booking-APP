import React, { useEffect, useState } from 'react';
import { registerUser, reset } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // Local error state for generic errors
  const [emailError, setEmailError] = useState(''); // Email-specific validation error

  const { name, email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate('/login'); // Redirect to login on successful registration
    }

    if (isError) {
      // Check if the error message corresponds to email already in use
      if (message?.toLowerCase().includes('email')) {
        setEmailError(message); // Show email-specific error
      } else {
        setError(message); // Show generic error
      }
    }

    // Clean up on unmount or after success/error
    return () => {
      dispatch(reset());
      setError('');
      setEmailError('');
    };
  }, [isSuccess, isError, message, navigate, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // Reset errors when the user starts typing
    if (error || emailError) {
      setError('');
      setEmailError('');
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic client-side validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
  
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
  
    const dataToSubmit = { name, email, password };
  
    try {
      // Dispatch the registerUser action
      await dispatch(registerUser(dataToSubmit)).unwrap();
    } catch (err) {
      // Display the error message from Redux
      setError(err || 'Registration failed');
    }
  };
  

  return (
    <div className="container">
      <h1 className="heading center">Register</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* Display error messages */}
          {error && <p className="error-message">{error}</p>}
          {emailError && <p className="error-message">{emailError}</p>}

          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

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

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Registering...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
