import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import axios from "axios";
import { useAtom } from "jotai";
import { storeID } from "../../../store/store";
import Cookies from "js-cookie";


export default function PixQRCode() {
  const [qrcode, setQrcode] = useState("");
  const { apiUrl } = useConfig();
  const [ecommerceID, setEcommerceID] = useAtom(storeID); // Use corretamente o atom

  useEffect(() => {
    async function getPix(id) {
      try {
        
        const response = await axios.get(`${apiUrl}/api/pix/ecommerce/${id}/qrcode`);
        setQrcode(response.data);
        console.log("qrcode", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setQrcode(null);
      }
    }
    getPix();
  }, []);


  useEffect(() => {
    // Recupera o storeID do cookie
    const savedStoreID = Cookies.get("storeID");

    if (savedStoreID) {
      setEcommerceID(savedStoreID); // Atualiza o atom com o storeID salvo no cookie
      setQrcode(savedStoreID); // Usa o storeID para buscar os produtos
      console.log("storeID recuperado dos cookies:", savedStoreID);
    } else if (ecommerceID) {
      setQrcode(ecommerceID); // Se não tiver cookie, usa o atom
      console.log("storeID do Atom:", ecommerceID);
    } else {
      console.log("storeID não disponível");
      setData([]); // Limpa os produtos se o storeID não estiver disponível
    }
  }, [ecommerceID, setEcommerceID]); // Dependência do ecommerceID
  return (
    <>
      {qrcode && (
        <>
          {" "}
          <img src={qrcode.qrCodeUrl} alt="" />
          <span>{qrcode.pixKey}</span>
        </>
      )}
    </>
  );
}
