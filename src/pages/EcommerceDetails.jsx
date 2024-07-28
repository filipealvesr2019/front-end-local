import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EcommerceDetails = ({ dominio }) => {
  const [ecommerce, setEcommerce] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ecommerce/${dominio}`);
        setEcommerce(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ecommerce) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detalhes do E-commerce</h1>
      <p><strong>ID do Cliente:</strong> {ecommerce.clienteId}</p>
      <p><strong>Domínio:</strong> {ecommerce.dominio}</p>
      <p><strong>Porta:</strong> {ecommerce.porta}</p>
      <h2>Tema</h2>
      <p><strong>Header Background:</strong> {ecommerce.theme.header.backgroundColor}</p>
      <p><strong>Header Color:</strong> {ecommerce.theme.header.color}</p>
      <p><strong>Footer Background:</strong> {ecommerce.theme.footer.backgroundColor}</p>
      <p><strong>Footer Color:</strong> {ecommerce.theme.footer.color}</p>
      <p><strong>Main Background:</strong> {ecommerce.theme.main.backgroundColor}</p>
      <p><strong>Main Color:</strong> {ecommerce.theme.main.color}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <EcommerceDetails dominio="example.com" />
    </div>
  );
};

export default App;
