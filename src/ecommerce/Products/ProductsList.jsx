import axios from "axios";
import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import styles from "./ProductDetails.module.css";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { storeID } from "../../../store/store";

export default function Products() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [ecommerceID] = useAtom(storeID); // Use corretamente o atom

  const [message, setMessage] = useState('');

  // Função para buscar produtos
  async function getProducts() {
    try {
      const response = await axios.get(`${apiUrl}/api/produtos/loja/${ecommerceID}`);
      setData(response.data || []);
      console.log("Produtos", storeID);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setData([]);
    }
  }

  useEffect(() => {
    if (storeID) {
      console.log("storeID do Ecommerce (Products):", storeID);
      getProducts();
    } else {
      console.log("storeID ainda não disponível");
    }
  }, [storeID]);

  return (
    <div style={{ marginTop: "25rem" }}>
      {data.length > 0 ? (
        data.map((product) => (
          <Link to={`/user/product/${product._id}`} key={product._id}>
            <div style={{ marginTop: "10rem" }}>
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
