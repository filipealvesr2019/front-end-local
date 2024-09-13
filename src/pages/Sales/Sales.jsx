import Cookies from "js-cookie";
import { useConfig } from "../../ecommerce/context/ConfigContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import styles from "./Sales.module.css";

export default function Sales({ storeID }) {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
  console.log("storeID", storeID);

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
  }, [storeID]);

  return (
    <>
      {data.length > 0 ? (
        <TableContainer className={styles.TableContainer}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Nome</Th>
                <Th isNumeric>Preço</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product) => (
                <Tr key={product._id}>
                  
                  <Td>
                  <Link to={`/admin/sales/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: "15vw"}}
                    />
                  
                  </Link>
                  </Td>
                  <Td>
                    <Link to={`/admin/sales/${product._id}`}>
                      {product.name}
                    </Link>
                  </Td>
                
                  <Td isNumeric>
                  <Link to={`/admin/sales/${product._id}`}>
                    R${product.price}
                    </Link>

                  </Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <p>No products available</p>
      )}
    </>
  );
}
