import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
      
      console.log('Login successful:', response.data);
      navigate('/admin_dashboard');

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Network error');
      }
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
      <div className='card bg-info w-25 h-50'>
        <div className='card-header text-center'>ADMIN LOGIN</div>
        <form className='card-body d-flex flex-column gap-2 justify-content-center' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );  
};

export default AdminLogin;
