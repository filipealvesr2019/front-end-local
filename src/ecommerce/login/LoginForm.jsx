// src/pages/Login.js
import React from 'react';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3002/api/google'; // Endpoint do seu backend para Google Auth
      };
      
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login com Google</button>
    </div>
  );
};

export default Login;
