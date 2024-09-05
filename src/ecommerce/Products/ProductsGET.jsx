import axios from "axios";
import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import styles from "./ProductsGET.module.css";
export default function Products() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [selectedVariations, setSelectedVariations] = useState({});

  async function getProducts() {
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      setData(response.data || []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]); // Set an empty array in case of error
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleVariation = (productId, variation,  index) => {
   

    const key = `${productId}-${index}`;
    setSelectedVariations((prevState) => {
        if(prevState[key]){
            const {[key]: _, ...rest} = prevState
            console.log('variação apagada');
            return rest
        } else {
              // Otherwise, add the variation
        console.log("price", variation.price);
        console.log("name", variation.name);
        console.log("url", variation.url);

        return {...prevState, [key]: variation}
        }
    });
  };

  return (
    <div style={{ marginTop: "25rem" }}>
      {data.length > 0 ? (
        data.map((product) => (
          <div
            key={product._id}
            style={{
              marginTop: "10rem",
            }}
          >
            {product.name}
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "15vw",
              }}
            />
            <div>
              {product.variations && product.variations.length > 0 ? (
                product.variations.map((variation, index) => (
                  <div key={index} className={styles.variationContainer}>
                    <img
                      src={variation.url}
                      alt={variation.name}
                      style={{
                        width: "15vw",
                      }}
                    />
                    <p>{variation.name}</p>
                    <p>R${variation.price}</p>
                    <span
                      onClick={() =>
                        handleVariation(product._id, variation, index)
                      }
                    >
                      {" "}
                      {selectedVariations[`${product._id}-${index}`]
                        ? "-"
                        : "+"}
                    </span>
                  </div>
                ))
              ) : (
                <p>No variations available</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
