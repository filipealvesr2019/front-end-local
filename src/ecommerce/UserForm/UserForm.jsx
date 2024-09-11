import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useConfig } from '../context/ConfigContext';
import { useAtom } from 'jotai';
import { idAdminEccommerceAtom } from '../../../store/store';
import styles from "./SignUpForm.module.css"

const Signup = () => {
  const { apiUrl } = useConfig();
  const UserID = Cookies.get("UserID"); // Obtenha o ID do cliente do cookie
  const [adminEccommerceId] = useAtom(idAdminEccommerceAtom);

  // Use the adminEccommerceId value here
  console.log(adminEccommerceId);
const [showCEP, setShowCEP] = useState(false);

  const [formData, setFormData] = useState({
    adminID: adminEccommerceId , 
    userID: UserID, // Corrigido
    name: '',

    mobilePhone: '',
    email: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    state: '',

  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/signupUser`, formData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao criar usuário.');
      }
    }
  };




  const handleCepChange = async (event) => {
    const newCep = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setFormData({ ...formData, postalCode: newCep });

    if (newCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${newCep}/json/`,
          {}
        );
        const data = response.data;
        if (data.erro) {
          setIsCepInvalid(true)
          setShowCEP(false)
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            address: data.logradouro,
            complement: data.complemento,
            province: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
          setShowCEP(true);
          setIsCepInvalid(false)

        }


      } catch (error) {
        setIsCepInvalid(true)
        setShowCEP(false)
        console.error("Erro ao buscar endereço:", error);
        // Trate erros aqui, como exibir uma mensagem para o usuário
      }
    }
  };

  const formatCep = (cep) => {
    // Remove todos os caracteres não numéricos
    const numericCep = cep.replace(/\D/g, "");

    // Aplica a máscara
    if (numericCep.length > 5) {
      return `${numericCep.slice(0, 5)}-${numericCep.slice(5, 8)}`;
    } else {
      return numericCep;
    }
  };
  
  const inputStyle = {
    border: Object.values(formData).some((val) => val !== "")
      ? "1px solid #ccc"
      : "1px solid red",
  };
  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>       

        {/* Remova o campo de Customer ID do formulário */}
        <input type="text" name="name" placeholder="Nome" onChange={handleChange} value={formData.name} required />
        <input type="text" name="mobilePhone" placeholder="Telefone" onChange={handleChange} value={formData.mobilePhone} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input
              type="text"
              name="postalCode"
              onChange={handleCepChange}
              value={formatCep(formData.postalCode)}
              placeholder="77777-777"
              style={inputStyle}
              className={styles.input}

            />       
        <button type="submit">Cadastrar</button>
      
      
      
     
          
      
        {showCEP && (
            <>

              <div className={styles.child}>
                <label className={styles.label}>
                  Address:

                </label>

                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  style={inputStyle}
                  className={styles.input}

                />
              </div>

              <div className={styles.child}>
                <label className={styles.label}>
                  Número do endereço:

                </label>


                <input type="text" name="addressNumber" placeholder="Número" onChange={handleChange} value={formData.addressNumber} required />

              </div>







              <div className={styles.child}>
                <label className={styles.label}>
                  Complemento:

                </label>
                <input
                  type="text"
                  name="complement"
                  onChange={handleChange}
                  value={formData.complement}
                  className={styles.input}

                />

              </div>



              <div className={styles.child}>

                <label className={styles.label}>
                  Bairro:

                </label>
                <input
                  type="text"
                  name="province"
                  onChange={handleChange}
                  value={formData.province}
                  style={inputStyle}
                  className={styles.input}

                />

              </div>



              <div className={styles.child}>

                <label className={styles.label}>
                  Cidade:

                </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  style={inputStyle}
                  className={styles.input}

                />


              </div>






              <div className={styles.child}>
                <label className={styles.label}>
                  Estado:

                </label>
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={formData.state}
                  style={inputStyle}
                  className={styles.input}

                />

              </div>

            </>
          )}
   
      
      
      
      
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;