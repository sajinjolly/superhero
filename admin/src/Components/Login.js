import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setShowPopup(true);  
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleNumberClick = (number) => {
    if (number === 11) {
      navigate('/dash');  
    } else {
      setError('Wrong number, redirecting to login...');
      setTimeout(() => {
        setShowPopup(false);  
        setPassword('');
        setError('');
      }, 2000);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h2>Batman Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="signup-link">
        Don't have an account? <span onClick={handleSignUpRedirect} className="link">Sign Up</span>
      </p>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className='popup-content-h3'>Select the Correct Number</h3>
            <div className="number-circle-container">
              {[7, 11, 3].map((number) => (
                <div key={number} className="number-circle" onClick={() => handleNumberClick(number)}>
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
