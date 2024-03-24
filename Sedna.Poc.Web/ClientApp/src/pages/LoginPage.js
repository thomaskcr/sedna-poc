import React, { useState } from 'react';
import { Navigate, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userStore from "../store/userStore";

const apiUrl = process.env.REACT_APP_LOCAL_API_URL_HTTPS;
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl +'/api/v1/users/check-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ "email": email, "pass": password })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const {jwt_token, payload} = await response.json();
      localStorage.setItem('authToken', jwt_token);
      setUser(jwt_token, payload);
      navigate('/welcome'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Failed to Login:", error);
    }
  };


  return (
    <div className="authentication-wrapper">
      <div className="authentication-inner py-5">
        <div className="card">
          <div className="p-sm-4">
            <div className="d-flex justify-content-center align-items-center pb-2 mb-2">
              <div className="ui-w-60">
              </div>
            </div>
            <h4 className="text-center mb-4">Sedna Projects</h4>
            <hr />
            <h5 className="text-center text-muted font-weight-normal mb-3">Login below:</h5>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;