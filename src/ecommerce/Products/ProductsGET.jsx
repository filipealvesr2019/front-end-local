import axios from "axios";
import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import styles from './ProductsGET.module.css'
export default function Products() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [priceVariation, setPriceVariation] = useState(null)
  const [nameVariation, setNameVariation] = useState(null)
  const [urlVariation, setUrlVariation] = useState(null)

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

  const handleVariation = (price, name, url) => {
    if(priceVariation === price && nameVariation === name && urlVariation === url){
        setUrlVariation(null);
        setNameVariation(null);
        setPriceVariation(null);
        console.log('variação apagada')
    } else{
        setPriceVariation(price)
        setNameVariation(name)
        setUrlVariation(url)
        console.log("price", price)
        console.log("name", name)
        console.log("url", url)
    }
   
  }

  return (
    <div style={{ marginTop: "25rem" }}>
      {data.length > 0 ? (
        data.map((product) => (
          <div key={product._id}>
            {product.name}
            <img src={product.imageUrl} alt={product.name} />
            <div>
              {product.variations && product.variations.length > 0 ? (
                product.variations.map((variation, index) => (
                  <div key={index} className={styles.variationContainer}>
                    <img src={variation.url} alt={variation.name} />
                    <p>{variation.name}</p>
                    <p>R${variation.price}</p>
                    <span onClick={() => handleVariation(variation.price, variation.name, variation.url)}> {priceVariation && nameVariation && urlVariation ? '-' : '+'}</span>
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
