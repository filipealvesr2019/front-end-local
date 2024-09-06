import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { isAdminAtom, loggedInAtom, authErrorAtom, customerIDAtom } from '../store/store'; // Adicione o customerIDAtom
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [customerID, setCustomerID] = useAtom(customerIDAtom); // Adicione o estado para customerID

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedRole = Cookies.get('role');
    const storedCustomerID = Cookies.get('customerID');

    setLoggedIn(Boolean(storedToken));
    setIsAdmin(storedRole === 'administrador');
    setCustomerID(storedCustomerID); // Armazene o customerID
  }, [setLoggedIn, setIsAdmin, setCustomerID]);

  return <>{children}</>;
};

export default AuthProvider;

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [customerID, setCustomerID] = useAtom(customerIDAtom); // Adicione o estado para customerID
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
      Cookies.set('customerID', response.data.user._id); // Verifique se o customerID está correto
      setCustomerID(response.data.user._id); // Atualize o esta
      console.log(customerID)
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
    Cookies.remove('customerID'); // Remova o customerID
    setLoggedIn(false);
    setIsAdmin(false);
    setCustomerID(null); // Limpe o estado do customerID
  };

  return { loggedIn, isAdmin, customerID, login, logout, error }; // Retorne o customerID
};