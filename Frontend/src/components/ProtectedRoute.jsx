import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user from localStorage if not in context (e.g., on page refresh)
    let currentUser = user;
    if (!currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      }
    }

    if (!currentUser) {
      // No user logged in, redirect to login
      console.log('No user found, redirecting to login.');
      navigate('/login', { replace: true });
      return;
    }

    // Check if the user's role is allowed
    const userRole = currentUser.role?.toUpperCase();
    if (!allowedRoles.includes(userRole)) {
      // User role not allowed, redirect to login
      console.log(`User role "${userRole}" not allowed for this route. Redirecting to login.`);
      navigate('/login', { replace: true });
    }
  }, [user, allowedRoles, navigate]);

  // Only render children if user is present and role is allowed
  // The useEffect hook handles redirection, so if we reach here, it means the user is authorized
  const currentUser = user || JSON.parse(localStorage.getItem('user'));
  if (currentUser && allowedRoles.includes(currentUser.role?.toUpperCase())) {
    return children;
  }

  // Render nothing or a loading spinner while redirecting
  return null;
};

export default ProtectedRoute;
