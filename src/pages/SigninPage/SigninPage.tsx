// src/pages/SigninPage/SigninPage.tsx

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SigninPage.css';
import { AuthContext } from '../../AuthContext';

// Import Firebase Auth functions
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    setError('');
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(`Login failed, please try again!`);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Login to Stocks Snake</h1>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button onClick={handleLogin} className="welcome-button">Login</button>
      </div>
    </div>
  );
};

export default SigninPage;