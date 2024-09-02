import React, { useState } from 'react';
import axios from 'axios';
import { useConfig } from '../ecommerce/context/ConfigContext';

export default function Products() {
  const { apiUrl } = useConfig();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    variations: [] // Inicialmente vazio, será preenchido com variações
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVariationChange = (index, e) => {
    const { name, value } = e.target;
    const newVariations = [...formData.variations];
    newVariations[index] = {
      ...newVariations[index],
      [name]: value
    };
    setFormData({
      ...formData,
      variations: newVariations
    });
  };

  const handleAddField = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      variations: [...prevFormData.variations, { url: '', price: '', name: '' }] // Adiciona um novo campo vazio
    }));
  };

  const handleRemoveField = (index) => {
    setFormData(prevFormData => {
      const newVariations = prevFormData.variations.filter((_, i) => i !== index);
      return {
        ...prevFormData,
        variations: newVariations
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/products`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erro ao criar produto.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: '15rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          value={formData.name}
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
          type="text"
          name="imageUrl"
          placeholder="imagem"
          onChange={handleChange}
          value={formData.imageUrl }
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          onChange={handleChange}
          value={formData.price}
          required
        />

        <button type="button" onClick={handleAddField} style={{ marginTop: '10px' }}>
          Adicionar Variação
        </button>

        {formData.variations.map((variation, index) => (
          <div key={index} style={{ marginBottom: '10px', marginTop: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <input
              type="text"
              name="url"
              placeholder="URL"
              value={variation.url}
              onChange={(e) => handleVariationChange(index, e)}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Nome da Variação"
              value={variation.name}
              onChange={(e) => handleVariationChange(index, e)}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Preço"
              value={variation.price}
              onChange={(e) => handleVariationChange(index, e)}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              style={{
                marginLeft: '10px',
                backgroundColor: '#DC143C',
                color: 'white',
                border: 'none',
                padding: '.5rem',
                borderRadius: '1rem',
                fontFamily: 'poppins',
                fontWeight: 500,
                cursor: 'pointer',
                fontSize: '.8rem',
                whiteSpace: 'nowrap',
                marginTop: '10px'
              }}
            >
              Remover
            </button>
          </div>
        ))}

        <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
      </form>
    </>
  );
}
