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
import { Select } from "@chakra-ui/react";
import { useConfig } from "../../../../context/ConfigContext";
import styles from "./Movimentacoes.module.css";
export default function Receitas() {
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie

  const { apiUrl } = useConfig();
  const [data, setData] = useState([]);
  const [mes, setMes] = useState([]);
  const [dia, setDia] = useState([]);
  const [tudo, setTudo] = useState([]);

  const [totalReceitas, setTotalReceitas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState([]);
  const [diferenca, setdiferenca] = useState([]);

  
  const [value, setValue] = useState("mes"); // Estado para armazenar o valor selecionado
  // console.log("adminEccommerceID", adminEccommerceID)
  async function getMovimentacoesMes() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/transactions/mes/${AdminID}`
      );
      setMes(response.data || []);
      console.log("getMovimentacoesMes", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

  async function getMovimentacoesDia() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/transactions/dia/${AdminID}`
      );
      setDia(response.data || []);
      console.log("getMovimentacoesDia", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

  async function getMovimentacoesTudo() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/transactions/tudo/${AdminID}`
      );
      setTudo(response.data || []);
      console.log("getMovimentacoesDia", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }


  

  // console.log("adminEccommerceID", adminEccommerceID)
  async function getTotalReceitas() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/receitas/mensais/${AdminID}`
      );
      setTotalReceitas(response.data[0].totalReceitas || []);
      console.log("getTotalReceitas", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }


   // console.log("adminEccommerceID", adminEccommerceID)
   async function getTotalDespesas() {
    try {
      const response = await axios.get(
        `${apiUrl}/api/despesas/mensais/${AdminID}`
      );
      setTotalDespesas(response.data[0].totalDespesas || []);
      console.log("getTotalReceitas", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  }

     // console.log("adminEccommerceID", adminEccommerceID)
     async function getDiferenca() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/diferenca/mensal/${AdminID}`
        );
        setdiferenca(response.data[0].diferenca || []);
        console.log("getDiferenca", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
      }
    }
  useEffect(() => {
    getMovimentacoesMes();
    getMovimentacoesDia();
    getMovimentacoesTudo();
    getTotalReceitas();
    getTotalDespesas();
    getDiferenca();
  }, []);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  const handleChangeTable = () => {
    switch (value) {
      case "dia":
        return (
          <>
            {dia.length > 0 ? (
              <TableContainer
                style={{
                  border: "1px solid #edf2f7",
                  borderRadius: "10px",
                }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>

                      <Th>Descrição</Th>
                      <Th>Vencimento</Th>
                      <Th>Status</Th>

                      <Th isNumeric>Valor R$</Th>
                      <Th>Categoria</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dia.map((revenue) => (
                      <Tr key={revenue._id}>
                        <Td className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>{revenue.type}</Td>
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

      case "mes":
        return (
          <>

            {mes.length > 0 ? (
              <TableContainer
                style={{
                  border: "1px solid #edf2f7",
                  borderRadius: "10px",
                }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>

                      <Th>Descrição</Th>
                      <Th>Vencimento</Th>
                      <Th>Status</Th>

                      <Th isNumeric>Valor R$</Th>
                      <Th>Categoria</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mes.map((revenue) => (
                      <Tr key={revenue._id}>
                        <Td className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>{revenue.type}</Td>
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
      case "tudo":
        return (
          <>
            {tudo.length > 0 ? (
              <TableContainer
                style={{
                  border: "1px solid #edf2f7",
                  borderRadius: "10px",
                }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>

                      <Th>Descrição</Th>
                      <Th>Vencimento</Th>
                      <Th>Status</Th>

                      <Th isNumeric>Valor R$</Th>
                      <Th>Categoria</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tudo.map((revenue) => (
                      <Tr key={revenue._id}>
                        <Td className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>{revenue.type}</Td>
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
  };









  const handleTotalChange = () => {
    switch (value) {
      case "dia":
        return (
          <>
       
          </>
        );

      case "mes":
        return (
          <>
          Total Despesas: {totalDespesas}
                  Total Receitas: {totalReceitas}{" "}
                  Diferença no período: {diferenca}
          </>
        );
      case "tudo":
        return (
          <>
           
          </>
        );
    }
  };
  return (
    <>
  <div>
    {handleTotalChange()}
  </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Select placeholder="Selecione um Periodo" onChange={handleSelectChange}>
          <option value="dia">Hoje</option>
          <option value="mes">Este Mês</option>
          <option value="tudo">Tudo</option>
        </Select>
      </div>
      <div>{handleChangeTable()}</div>
    </>
  );
}
