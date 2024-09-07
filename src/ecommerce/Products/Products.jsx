import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useConfig } from "../context/ConfigContext";
import styles from "./ProductDetails.module.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Products() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  const [message, setMessage] = useState('');

  async function getProducts() {
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      setData(response.data || []);
      console.log(response.data )
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

let didFetch = false;

useEffect(() => {
  if (!didFetch) {
    getProducts();
    didFetch = true;
  }
}, [apiUrl]);

  const handleVariation = useCallback((productId, variation, index) => {
    const key = `${productId}-${index}`;
    setSelectedVariations((prevState) => {
      if (prevState[key]) {
        const { [key]: _, ...rest } = prevState;
        console.log('variação apagada');
        return rest;
      } else {
        console.log("price", variation.price);
        console.log("name", variation.name);
        console.log("url", variation.url);
        return { ...prevState, [key]: variation };
      }
    });
  }, [setSelectedVariations]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/${AdminID}/66d643b68c1f9eeec30d7ee1`, formData);
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
    <div style={{ marginTop: "25rem" }}>
   
        
      {data.length > 0 ? (
        data.map((product) => (
            <Link to={`/user/product/${product._id}`}>
          <div key={product._id} style={{ marginTop: "10rem" }}>
            {product.name}
            <img src={product.imageUrl} alt={product.name} style={{ width: "15vw" }} />
          
          </div>
          </Link>

        ))
      ) : (
        <p>No products available</p>
      )}
        
      
    </div>
  );
}
