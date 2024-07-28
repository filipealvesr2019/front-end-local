import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Lista de Temas</h1>
      <ul>
        {themes.map((theme) => (
          <li key={theme._id} style={{ marginBottom: '20px' }}>
            <h2>{theme.name}</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeList;
