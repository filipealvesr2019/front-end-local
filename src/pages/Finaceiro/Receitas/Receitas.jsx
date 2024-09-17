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
import CriarReceitaModal from './CriarReceitaModal/CriarReceitaModal'
  export default function Receitas() {

    const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

    const { apiUrl } = useConfig();
    const [data, setData] = useState([]);
  
    // console.log("adminEccommerceID", adminEccommerceID)
    async function getReceitas() {
      try {
        const response = await axios.get(`${apiUrl}/api/receitas/${AdminID}`);
        setData(response.data || []);
        console.log("getReceitas", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
      }
    }
    useEffect(() => {
      getReceitas();
    }, []);
  
    return (
      <>
      <CriarReceitaModal />
        <TableContainer
          style={{
            border: "1px solid #edf2f7",
            borderRadius: "10px",
          }}
        >
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </>
    );
  }
  