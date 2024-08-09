import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';

export default function Products() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { client } = useClerk();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await client.getToken(); // Obtém o token de autenticação
        const response = await axios.get('http://localhost:3002/api/protected-endpoint', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [client]); // Executa a requisição quando o componente é montado

  return (
    <div>
      <h1>Products</h1>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <p>Authorized: {data.message}</p>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
