import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useConfig } from "../context/ConfigContext";
import styles from "./ProductDetails.module.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { idAdminEccommerceAtom } from "../../../store/store";

export default function Products() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [adminEccommerceID] = useAtom(idAdminEccommerceAtom);

  console.log("ID do Admin do Ecommerce:", adminEccommerceID);
  const [message, setMessage] = useState('');
// console.log("adminEccommerceID", adminEccommerceID)
  async function getProducts() {
    try {
      const response = await axios.get(`${apiUrl}/api/products/${adminEccommerceID}`);
      setData(response.data || []);
      console.log("adminID", response.data[0].adminID )
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }
  useEffect(() => {
    if (adminEccommerceID) {
      console.log("ID do Admin do Ecommerce (Products):", adminEccommerceID);
      getProducts();
    } else {
      console.log("adminEccommerceID ainda não disponível");
    }
  }, [adminEccommerceID]);
  


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
