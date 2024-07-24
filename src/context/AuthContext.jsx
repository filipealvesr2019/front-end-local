import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [userId, setUserId] = useState(null);
  const [remainingAttempts, setRemainingAttempts] = useState('');

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedRole = Cookies.get('role');
    const storedUserId = Cookies.get('userId');
    setLoggedIn(Boolean(storedToken));
    setIsCustomer(storedRole === 'customer');
    setUserId(storedUserId);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/loginCustumer', { email, password });
      const { token, user } = response.data;
      const { role, _id, remainingAttempts } = user;

      setLoggedIn(true);
      setIsCustomer(role === 'customer');
      setUserId(_id);
      setRemainingAttempts(remainingAttempts);

      Cookies.set('token', token);
      Cookies.set('role', role);
      Cookies.set('userId', _id);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const { remainingAttempts } = error.response.data;
        setRemainingAttempts(remainingAttempts);
        toast.error('Erro, email ou senha inválidos!', { position: toast.POSITION.TOP_CENTER });
      } else {
        console.error('Erro na solicitação de login', error);
      }
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('userId');
    setLoggedIn(false);
    setIsCustomer(false);
    setUserId(null);
    navigate('/login');
  };

  const values = {
    loggedIn,
    isCustomer,
    userId,
    login,
    logout,
    remainingAttempts
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
