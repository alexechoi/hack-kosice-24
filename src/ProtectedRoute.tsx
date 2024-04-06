// src/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect them to the /signin page
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
