import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EcommerceList = () => {
  const [ecommerces, setEcommerces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEcommerces = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/ecommerces');
        setEcommerces(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEcommerces();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de E-commerces</h1>
      {ecommerces.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {ecommerces.map((ecommerce) => (
            <li key={ecommerce._id}>
              <p><strong>ID do Cliente:</strong> {ecommerce.clienteId}</p>
              <p><strong>Domínio:</strong> {ecommerce.dominio}</p>
              <p><strong>Porta:</strong> {ecommerce.porta}</p>
              <p><strong>Header Background:</strong> {ecommerce.theme.header.backgroundColor}</p>
              <p><strong>Header Color:</strong> {ecommerce.theme.header.color}</p>
              <p><strong>Footer Background:</strong> {ecommerce.theme.footer.backgroundColor}</p>
              <p><strong>Footer Color:</strong> {ecommerce.theme.footer.color}</p>
              <p><strong>Main Background:</strong> {ecommerce.theme.main.backgroundColor}</p>
              <p><strong>Main Color:</strong> {ecommerce.theme.main.color}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EcommerceList;
