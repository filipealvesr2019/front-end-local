import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useConfig } from "../context/ConfigContext";
import styles from "./ProductDetails.module.css";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState(null); // Alterado de [] para null
  const [selectedVariations, setSelectedVariations] = useState({});
  const AdminID = Cookies.get("AdminID");
  const { productId } = useParams();
  const [message, setMessage] = useState('');

  async function getProducts() {
    try {
      const response = await axios.get(`${apiUrl}/api/product/${productId}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData(null);
    }
  }

  useEffect(() => {
    getProducts();
  }, [apiUrl, productId]); // Incluído productId como dependência

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/${AdminID}/${productId}`, selectedVariations);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao criar pedido.');
      }
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <img src={data.imageUrl} alt={data.name} style={{ width: "15vw" }} />
          <div>
            {data.variations && data.variations.length > 0 ? (
              data.variations.map((variation, index) => (
                <div key={index} className={styles.variationContainer}>
                  <img src={variation.url} alt={variation.name} style={{ width: "15vw" }} />
                  <p>{variation.name}</p>
                  <p>R${variation.price}</p>
                  <span onClick={() => handleVariation(data._id, variation, index)}>
                    {selectedVariations[`${data._id}-${index}`] ? "-" : "+"}
                  </span>
                </div>
              ))
            ) : (
              <p>No variations available</p>
            )}
          </div>
          <button onClick={handleSubmit}>Finalizar Pedido</button>
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
