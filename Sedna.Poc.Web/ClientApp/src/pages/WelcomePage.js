import React from 'react';
import userStore from "../store/userStore";
import LogOutButton from '../components/LogOutButton';

const WelcomePage = () => {
  // Access user information from the store
  const { displayName, email } = userStore(state => ({ displayName: state.displayName, email: state.email }));

  return (
    <div>
      <h1>Welcome, {displayName}!</h1>
      <p>Your email is: {email}</p>
      <LogOutButton />
    </div>
  );
};

export default WelcomePage;