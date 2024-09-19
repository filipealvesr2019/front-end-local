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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useConfig } from "../../../../context/ConfigContext";
import CriarReceitaModal from "./CriarReceitaModal/CriarReceitaModal";
import styles from "./Receitas.module.css";
import { Select } from "@chakra-ui/react";

export default function Receitas() {
  const AdminID = Cookies.get("AdminID"); // Obtenha o ID do cliente do cookie
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [mes, setMes] = useState([]);
  const [dia, setDia] = useState([]);
  const [tudo, setTudo] = useState([]);
  const [value, setValue] = useState("mes"); // Estado para armazenar o valor selecionado

  const { apiUrl } = useConfig();

  async function getReceitas() {
    try {
      const response = await axios.get(`${apiUrl}/api/receitas/mes/${AdminID}`);
      setMes(response.data || []);
    } catch (error) {
      console.error("Error fetching receipts:", error);
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

  const openStatusModal = (revenue) => {
    setSelectedRevenue(revenue);
    setNewStatus(revenue.status === 'PENDING' ? 'RECEIVED' : 'PENDING');
    onOpen();
  };

  const handleStatusChange = async () => {
    try {
      await axios.put(`${apiUrl}/api/transactions/status/${AdminID}/${selectedRevenue._id}`, { status: newStatus });
      // Atualize a lista de receitas após a alteração
      await getReceitas();
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };













  const handleChangeTable = () => {
    switch (value) {
      case "dia":
        return (
          <>
            {/* {dia.length > 0 ? (
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
                        <Td isNumeric className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>R${revenue.amount}</Td>

                        <Td>{revenue.categoryName}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No products available</p>
            )} */}
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
                  <Td>{revenue.description}</Td>
                  <Td>{formatDate(revenue.createdAt)}</Td>
                  <Td
                    className={
                      revenue.status === "RECEIVED"
                        ? styles.received
                        : styles.pending
                    }
                    onClick={() => openStatusModal(revenue)}
                  >
                    {revenue.status === "RECEIVED" ? "PAGO" : "PENDENTE"}
                  </Td>
                  <Td isNumeric className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>R${revenue.amount}</Td>
                  <Td>{revenue.categoryName}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <p>No receipts available</p>
      )}
          </>
        );
      case "tudo":
        return (
          <>
            {/* {tudo.length > 0 ? (
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
                        <Td isNumeric className={revenue.type === "despesa" ? styles.typeDespesa : styles.typeReceita}>R${revenue.amount}</Td>

                        <Td>{revenue.categoryName}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No products available</p>
            )} */}
          </>
        );
    }
  };





  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };



  const handleTotalChange = () => {
    switch (value) {
      case "dia":
        return (
          <>
            {/* Total Despesas: {totalDespesasDia}
                  Total Receitas: {totalReceitasDia}{" "}
                  Diferença no período: {diferencaDia} */}
          </>
        );

      case "mes":
        return (
          <>
          {/* Total Despesas: {totalDespesasMes}
                  Total Receitas: {totalReceitasMes}{" "}
                  Diferença no período: {diferencaMes} */}
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
      <CriarReceitaModal />
      <div>
      {handleChangeTable()}
  </div>

      {/* Modal para confirmar a alteração de status */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Tem certeza que deseja marcar esta receita como <b>{newStatus === 'RECEIVED' ? "paga" : "pendente"}</b>?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleStatusChange}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
