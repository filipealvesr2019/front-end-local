import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LojaPage = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/ecommerce/user/66a4de96c36f616ccb707c18`);
        setEcommerce(response.data);
      } catch (error) {
        console.error('Erro ao buscar o e-commerce:', error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ backgroundColor: ecommerce.theme.main.backgroundColor, color: ecommerce.theme.main.color }}>
      <header style={{ backgroundColor: ecommerce.theme.header.backgroundColor, color: ecommerce.theme.header.color }}>
        Header da Loja
      </header>
      <main>
        Conteúdo Principal da Loja
      </main>
      <footer style={{ backgroundColor: ecommerce.theme.footer.backgroundColor, color: ecommerce.theme.footer.color }}>
        Footer da Loja
      </footer>
    </div>
  );
};

export default LojaPage;
