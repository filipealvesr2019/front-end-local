import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie"; // Certifique-se de importar isso
import { useConfig } from "../../../../../context/ConfigContext";

export default function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { apiUrl } = useConfig();
  const AdminID = Cookies.get("AdminID");

  const [formData, setFormData] = useState({
    adminID: AdminID,
    type: "receita",
    description: "",
    amount: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  // Buscar as categorias do adminID
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/categories/${AdminID}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [apiUrl, AdminID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/receitas`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      alert("Erro ao criar receita.");
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Cadastrar Receita</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Receita</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Chave Pix</FormLabel>
              <form onSubmit={handleSubmit} style={{ marginTop: "5rem" }}>
                <input
                  type="text"
                  name="description"
                  placeholder="Descrição"
                  onChange={handleChange}
                  value={formData.description}
                  required
                />
                
                {/* Select de categorias */}
               
                <input
                  type="number"
                  name="amount"
                  placeholder="Valor"
                  onChange={handleChange}
                  value={formData.amount}
                  required
                />
 <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  {categories.map((category) => (
                    <>
                    {category.type === "receita" &&  <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                    }
                   
                    </>
                  ))}
                </select>

              </form>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
