import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useConfig } from '../context/ConfigContext';

const Signup = () => {
  const { apiUrl } = useConfig();
  const customerID = Cookies.get("customerID"); // Obtenha o ID do cliente do cookie
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  const [formData, setFormData] = useState({
    adminID: AdminID, 
    userID: customerID, // Corrigido
    name: '',

    mobilePhone: '',
    email: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    state: '',

  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/signupUser`, formData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao criar usuário.');
      }
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        {/* Remova o campo de Customer ID do formulário */}
        <input type="text" name="name" placeholder="Nome" onChange={handleChange} value={formData.name} required />
        <input type="text" name="mobilePhone" placeholder="Telefone" onChange={handleChange} value={formData.mobilePhone} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input type="text" name="postalCode" placeholder="CEP" onChange={handleChange} value={formData.postalCode} required />
        <input type="text" name="address" placeholder="Endereço" onChange={handleChange} value={formData.address} required />
        <input type="text" name="addressNumber" placeholder="Número" onChange={handleChange} value={formData.addressNumber} required />
        <input type="text" name="complement" placeholder="Complemento" onChange={handleChange} value={formData.complement} />
        <input type="text" name="province" placeholder="Bairro" onChange={handleChange} value={formData.province} required />
        <input type="text" name="city" placeholder="Cidade" onChange={handleChange} value={formData.city} required />
        <input type="text" name="state" placeholder="Estado" onChange={handleChange} value={formData.state} required />
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;