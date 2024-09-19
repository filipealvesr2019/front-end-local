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
import CriarCategoriasModal from "./CriarCategoriasModal/CriarCategoriasModal";
import styles from "./Categorias.module.css";
export default function Receitas() {
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);

  // console.log("adminEccommerceID", adminEccommerceID)
  async function getCategories() {
    try {
      const response = await axios.get(`${apiUrl}/api/categories/${AdminID}`);
      setData(response.data || []);
      console.log("getCategories", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }
  useEffect(() => {
    getCategories();
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
      <CriarCategoriasModal />
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
              <Th>Nome da Categoria</Th>
              <Th>Tipo</Th>
              
              </Tr>
            </Thead>
            <Tbody>
              {data.map((revenue) => (
                <Tr key={revenue._id}>
                  <Td>{revenue.name}</Td>
                  <Td className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>{revenue.type}</Td>
                 
                
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
