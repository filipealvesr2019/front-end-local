// src/pages/Profile.js
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../../../store/store';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useAtom(authAtom);

  useEffect(() => {
    // Fazer uma chamada para o backend para obter informações do usuário autenticado
    axios.get('http://localhost:3002/api/profile')
      .then(response => {
        setUser(response.data);
        console.log(response.data)
      })
      .catch(err => {
        console.error(err);
      });
  }, [setUser]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
