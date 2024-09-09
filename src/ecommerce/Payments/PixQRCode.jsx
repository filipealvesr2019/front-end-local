import { useEffect, useState } from "react"
import { useConfig } from "../context/ConfigContext";
import Cookies from "js-cookie";
import axios from "axios";

export default function PixQRCode(){
    const [qrcode, setQrcode] = useState('');
    const { apiUrl } = useConfig();
    const AdminID = Cookies.get("AdminID");

    useEffect(() => {

        async function getProducts() {
            try {
              const response = await axios.get(`${apiUrl}/api/qr-code/${AdminID}`);
              setQrcode(response.data);
              console.log("qrcode", response.data);
            } catch (error) {
              console.error("Error fetching products:", error);
              setQrcode(null);
            }
          }
          getProducts()
    }, [])
    return (
        <>
        <img src={qrcode.qrCode.qrCodeUrl} alt="" />
        <span>{qrcode.qrCode.pixKey}</span>

        </>
    )
}