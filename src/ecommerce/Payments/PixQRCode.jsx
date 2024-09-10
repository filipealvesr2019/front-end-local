import { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import axios from "axios";
import { idAdminEccommerceAtom } from "../../../store/store";
import { useAtom } from "jotai";

export default function PixQRCode() {
  const [qrcode, setQrcode] = useState("");
  const { apiUrl } = useConfig();
  const [adminEccommerceID] = useAtom(idAdminEccommerceAtom);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${apiUrl}/api/qr-code/${adminEccommerceID}`);
        setQrcode(response.data);
        console.log("qrcode", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setQrcode(null);
      }
    }
    getProducts();
  }, []);
  return (
    <>
      {qrcode && (
        <>
          {" "}
          <img src={qrcode.qrCode.qrCodeUrl} alt="" />
          <span>{qrcode.qrCode.pixKey}</span>
        </>
      )}
    </>
  );
}
