import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { isAdminAtom, loggedInAtom, authErrorAtom, customerIDAtom } from '../../../store/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig } from './ConfigContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [customerID, setCustomerID] = useAtom(customerIDAtom);

  useEffect(() => {
    const storedToken = Cookies.get('UserToken');
    const storedRole = Cookies.get('role');
    const storedCustomerID = Cookies.get('customerID');

    setLoggedIn(Boolean(storedToken));
    setIsAdmin(storedRole === 'user');
    setCustomerID(storedCustomerID);
  }, [setLoggedIn, setIsAdmin, setCustomerID]);

  return <>{children}</>;
};

export default AuthProvider;

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [customerID, setCustomerID] = useAtom(customerIDAtom);
  const [error, setError] = useAtom(authErrorAtom);
  const { apiUrl } = useConfig();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/loginUser`, { email, password });

      if (response.data.user.role === 'user') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else {
        alert('Credenciais inválidas');
      }

      Cookies.set('UserToken', response.data.token);
      Cookies.set('role', response.data.user.role);
      Cookies.set('customerID', response.data.user._id);
      setCustomerID(response.data.user._id);
    } catch (error) {
      setError(error.response?.data?.error || 'Erro desconhecido');
      console.error('Erro na solicitação de login', error);
    }
  };



  const logout = () => {
    Cookies.remove('UserToken');
    Cookies.remove('role');
    Cookies.remove('customerID');
    setLoggedIn(false);
    setIsAdmin(false);
    setCustomerID(null);
  };

  return { loggedIn, isAdmin, customerID,  login, logout, error };
};
