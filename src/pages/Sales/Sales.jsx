import { useConfig } from "../../ecommerce/context/ConfigContext";
import React, { useEffect, useState } from "react";
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
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

export default function Sales({ storeID }) {
  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
  console.log("storeID", storeID);
  const [openTabModal, setOpenTabModal] = useState(false);
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
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Os meses são baseados em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlOpenTabModal = () => {
    setOpenTabModal(true);
  };

  return (
    <div>
      {data.length > 0 ? (
        <TableContainer className={styles.TableContainer}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Nome</Th>
                <Th>Data</Th>
                <Th>Status</Th>
                <Th isNumeric>Preço</Th>
              </Tr>
            </Thead>
            <Tbody className={styles.Tbody}>
              {data.map((product) => (
                <Tr key={product._id}>
                  <Td>
                    <Link to={`/admin/sales/${product._id}`}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "15vw" }}
                      />
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/admin/sales/${product._id}`}>
                      {product.name}
                    </Link>
                  </Td>
                  <Td>{formatDate(product.purchaseDate)}</Td>
                  <Td
                    className={
                      product.status === "RECEIVED"
                        ? styles.received
                        : styles.pending
                    }
                    onClick={handlOpenTabModal}
                  >
                    {" "}
                    {product.status === "RECEIVED" ? "PAGO" : "PENDENTE"}
                  </Td>

                  <Td isNumeric>
                    <Link to={`/admin/sales/${product._id}`}>
                      R${product.totalAmount}
                    </Link>
                  </Td>
                  <Td>
  <div className="custom-checkbox">
    <input
      type="checkbox"
      checked={product.status === "RECEIVED"}
      readOnly
    />
  </div>
</Td>

                </Tr>
              ))}
              {openTabModal && "aberto"}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
