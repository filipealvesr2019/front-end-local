import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useConfig } from "../../../../context/ConfigContext";
import CriarReceitaModal from "./CriarReceitaModal/CriarReceitaModal";
import styles from "./Receitas.module.css";
export default function Receitas() {
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);

  // console.log("adminEccommerceID", adminEccommerceID)
  async function getReceitas() {
    try {
      const response = await axios.get(`${apiUrl}/api/receitas/mes/${AdminID}`);
      setData(response.data || []);
      // console.log("getReceitas", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }
  useEffect(() => {
    getReceitas();
  }, []);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <CriarReceitaModal />
      {data.length > 0 ? (
        <TableContainer
          style={{
            border: "1px solid #edf2f7",
            borderRadius: "10px",
          }}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Vencimento</Th>
                <Th>Status</Th>

                <Th isNumeric>Total</Th>
                <Th>Categoria</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((revenue) => (
                <Tr key={revenue._id}>
                  <Td>{revenue.description}</Td>
                  <Td>{formatDate(revenue.createdAt)}</Td>
                  <Td
                    className={
                      revenue.status === "RECEIVED"
                        ? styles.received
                        : styles.pending
                    }
                  >
                    {revenue.status === "RECEIVED" ? "PAGO" : "PENDENTE"}
                  </Td>
                  <Td isNumeric>R${revenue.amount}</Td>

                  <Td>{revenue.categoryName}</Td>
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
