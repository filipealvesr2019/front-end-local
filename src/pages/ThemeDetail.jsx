import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ThemeDetail.module.css';

const ThemeDetail = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/theme/${id}`);
        setTheme(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTheme();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!theme) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.themeDetailContainer}>
      <h1>{theme.name}</h1>
      <p><strong>Categoria:</strong> {theme.category}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ backgroundColor: theme.theme.header.backgroundColor, color: theme.theme.header.color, padding: '10px' }}>
          <p>Header</p>
        </div>
        <div style={{ backgroundColor: theme.theme.footer.backgroundColor, color: theme.theme.footer.color, padding: '10px' }}>
          <p>Footer</p>
        </div>
        <div style={{ backgroundColor: theme.theme.main.backgroundColor, color: theme.theme.main.color, padding: '10px' }}>
          <p>Main</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeDetail;
