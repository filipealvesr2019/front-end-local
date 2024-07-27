import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { isAdminAtom, loggedInAtom, authErrorAtom } from '../store/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedRole = Cookies.get('role');
    setLoggedIn(Boolean(storedToken));
    setIsAdmin(storedRole === 'administrador');
  }, [setLoggedIn, setIsAdmin]);

  return <>{children}</>;
};

export default AuthProvider;

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [error, setError] = useAtom(authErrorAtom);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/api/login', { email, password });
      
      if (response.data.user.role === 'administrador') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else {
        alert('Credenciais inválidas');
      }

      Cookies.set('token', response.data.token);
      Cookies.set('role', response.data.user.role);
    } catch (error) {
      setError(error.response.data.error);

      if (error.response && error.response.status === 401) {
        toast.error('Erro, email ou senha inválidos!', { position: toast.POSITION.TOP_CENTER });
      } else {
        console.error('Erro na solicitação de login', error);
      }
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return { loggedIn, isAdmin, login, logout, error };
};
