import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useConfig } from '../../../../../context/ConfigContext';

export default function Products() {
  const { apiUrl } = useConfig();
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie
 

  const [formData, setFormData] = useState({
    adminID: AdminID,
    type: "receita",
    description: '',
    amount: '',
    category: '66e8bda98b094c4de8dfec6a',
    });


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
      const response = await axios.post(`${apiUrl}/api/despesas`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erro ao criar produto.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: '5rem' }}>
    
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={formData.description}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          onChange={handleChange}
          value={formData.category}
          required
        />
         <input
          type="number"
          name="amount"
          placeholder="amount"
          onChange={handleChange}
          value={formData.amount }
          required
        />

        
      


     
        <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
      </form>
    </>
  );
}
