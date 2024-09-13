import Cookies from "js-cookie";
import { useConfig } from "../../ecommerce/context/ConfigContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sales({ storeID }) {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
 console.log('storeID', storeID)
  async function getProducts() {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/vendas/${storeID}`);
      setData(response.data || []);
      console.log("sales", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

  // Só faz a requisição quando o storeID for válido
  useEffect(() => {
    if (storeID) {
      getProducts();
    }
  }, [storeID]); // O useEffect agora depende do storeID

  return (
    <>
      <div style={{ marginTop: "15rem" }}>div</div>
      {data.length > 0 ? (
        data.map((product) => (
          <Link to={`/admin/sales/${product._id}`} key={product._id}>
            <div style={{ marginTop: "10rem" }}>
              {product.name}
              <img src={product.imageUrl} alt={product.name} style={{ width: "15vw" }} />
            </div>
          </Link>
        ))
      ) : (
        <p>No products available</p>
      )}
    </>
  );
}
