import axios from "axios";
import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";

export default function Products() {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]); // Initialize as an empty array

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

  return (
    <div style={{ marginTop: "25rem" }}>
      {data.length > 0 ? (
        data.map((product) => (
          <div key={product._id}>
            {product.name}
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
