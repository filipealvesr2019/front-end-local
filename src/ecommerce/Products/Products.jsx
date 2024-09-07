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
