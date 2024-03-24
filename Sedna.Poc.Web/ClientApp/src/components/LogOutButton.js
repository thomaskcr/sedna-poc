import React from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from "../store/userStore";

const LogoutButton = () => {
  const clearUser = userStore(state => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;