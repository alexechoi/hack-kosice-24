// src/AuthLogger.tsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const AuthLogger = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log('Is user logged in?', !!currentUser);
  }, [currentUser]);

  return null; // This component doesn't render anything
};

export default AuthLogger;
