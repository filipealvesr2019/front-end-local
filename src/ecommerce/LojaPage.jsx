import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar/Navbar";
import Tabs from "./tabs/Tabs";
import SearchBar from "./SearchBar/SearchBar";
import Layout1 from "../ecommerce/layout/Layout1.module.css";
import Layout2 from "../ecommerce/layout/Layout2.module.css";
import Header from '../ecommerce/header/Header'
import Products from './Products/ProductsGET';
import { useConfig } from "./context/ConfigContext";
const LojaPage = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [mainBackgroundColor, setMainBackgroundColor] = useState("");
  const [mainColor, setMainColor] = useState("");
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("");
  const [footerColor, setFooterColor] = useState("");
  const [logo, setLogo] = useState("");
  const [layout, setLayout] = useState("");
  const [headerColorFrame, setHeaderColorFrame] = useState(
    headerBackgroundColor
  );
  const [headerTextColorFrame, setHeaderTextColorFrame] = useState(headerColor);
  const [mainColorFrame, setMainColorFrame] = useState(mainBackgroundColor);
  const [mainTextColorFrame, setMainTextColorFrame] = useState(mainColor);
  const [footerColorFrame, setFooterColorFrame] = useState(mainBackgroundColor);
  const [footerTextColorFrame, setFooterTextColorFrame] = useState(mainColor);
  const { apiUrl } = useConfig();

  const customerID = Cookies.get("customerID"); // Obtenha o ID do cliente do cookie

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/ecommerce/user/${customerID}`
        );
        setEcommerce(response.data);
        setLogo(response.data.theme.header.Logo);
        setHeaderBackgroundColor(response.data.theme.header.backgroundColor);
        setHeaderColor(response.data.theme.header.color);
        setMainBackgroundColor(response.data.theme.main.backgroundColor);
        setMainColor(response.data.theme.main.color);
        setFooterBackgroundColor(response.data.theme.footer.backgroundColor);
        setLayout(response.data.layout);
        setFooterColor(response.data.theme.footer.color);
      } catch (error) {
        console.error("Erro ao buscar o e-commerce:", error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  const layoutStyles = () => {
    switch (layout) {
      case "layout1":
        return Layout1;
      case "layout2":
        return Layout2;
      default:
        return {}; // Retorna um objeto vazio se nenhum layout for encontrado
    }
  };

  const styles = layoutStyles(); // Chame a função para obter o estilo correto

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "CHANGE_HEADER_COLOR") {
        setHeaderColorFrame(event.data.color);
      }
      if (event.data.type === "CHANGE_HEADER_TEXT_COLOR") {
        setHeaderTextColorFrame(event.data.color);
      }
      if (event.data.type === "CHANGE_MAIN_COLOR") {
        setMainColorFrame(event.data.color);
      }
      if (event.data.type === "CHANGE_MAIN_TEXT_COLOR") {
        setMainTextColorFrame(event.data.color);
      }
      if (event.data.type === "CHANGE_FOOTER_COLOR") {
        setFooterColorFrame(event.data.color);
      }
      if (event.data.type === "CHANGE_FOOTER_TEXT_COLOR") {
        setFooterTextColorFrame(event.data.color);
      }
      if (event.data.type === "SCROLL_TO_CAROUSEL") {
        document
          .getElementById("carrosel")
          .scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screenContainer}>
          <div
            style={{ backgroundColor: mainBackgroundColor, color: mainColor }}
          >
             <Header
              headerColorFrame={headerColorFrame}
              headerBackgroundColor={headerBackgroundColor}
              headerTextColorFrame={headerTextColorFrame}
              headerColor={headerColor}
              logo={logo}
              layout={layout}
            />
           
            <Tabs />
            <main
              className={styles.main}
              style={{
                backgroundColor: mainColorFrame
                  ? mainColorFrame
                  : mainBackgroundColor,
                color: mainTextColorFrame ? mainTextColorFrame : mainColor,
              }}
            >

              <Products />
            </main>
            <footer
              style={{
                backgroundColor: footerColorFrame
                  ? footerColorFrame
                  : footerBackgroundColor,
                color: footerTextColorFrame
                  ? footerTextColorFrame
                  : footerColor,
              }}
              className={styles.footer}
            >
              <span>Footer da Loja</span>
            </footer>

            <div
              id="carrosel"
              style={{
                marginTop: "15rem",
                color: "black",
              }}
            >
              {/* Carrossel content here */}
              carrosel loja
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LojaPage;
