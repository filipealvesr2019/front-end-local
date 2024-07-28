import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ThemeList.module.css'
import { Link } from 'react-router-dom';
const ThemeList = () => {
  const [themes, setThemes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/themes');
        setThemes(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchThemes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (themes.length === 0) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className={styles.themesContainer}>
      <h1>Lista de Temas</h1>
      <ul>
        {themes.map((theme) => (
          <li key={theme._id} style={{ marginBottom: '20px' }}>
            <Link to={`/theme/${theme._id}`}>
            <h2>{theme.name}</h2>
            <p><strong>Categoria:</strong> {theme.category}</p>
           
            
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeList;
