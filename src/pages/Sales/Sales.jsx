
import Cookies from "js-cookie";
import { useConfig } from "../../ecommerce/context/ConfigContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function  Sales(){

    const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

    const { apiUrl } = useConfig();
    const [data, setData] = useState([]);
    

  // console.log("adminEccommerceID", adminEccommerceID)
    async function getProducts() {
      try {
        const response = await axios.get(`${apiUrl}/api/sales/${AdminID}`);
        setData(response.data || []);
        console.log("sales",response.data )
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
      }
    }
    useEffect(() => {
   
        getProducts();
   
    }, []);
    
    return (
        <>
             {data.length > 0 ? (
        data.map((product) => (
            <Link to={`/admin/sales/${product._id}`}>
          <div key={product._id} style={{ marginTop: "10rem" }}>
            {product.name}
            <img src={product.imageUrl} alt={product.name} style={{ width: "15vw" }} />
          
          </div>
          </Link>

        ))
      ) : (
        <p>No products available</p>
      )}
        
      
        </>
    )
}