import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import axios from "axios";
import { useAtom } from "jotai";

export default function PixQRCode() {
  const [qrcode, setQrcode] = useState("");
  const { apiUrl } = useConfig();
  const [storeID] = useAtom(storeID);

  useEffect(() => {
    async function getPix() {
      try {
        
        const response = await axios.get(`${apiUrl}/api/pix/ecommerce/${storeID}/qrcode`);
        setQrcode(response.data);
        console.log("qrcode", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setQrcode(null);
      }
    }
    getPix();
  }, []);
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
