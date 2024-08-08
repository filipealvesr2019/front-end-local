import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar/Navbar";
import Tabs from "./tabs/Tabs";
import SearchBar from "./SearchBar/SearchBar";
import Layout1 from "../ecommerce/layout/Layout1.module.css";
import Layout2 from "../ecommerce/layout/Layout2.module.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

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

  const customerID = Cookies.get("customerID"); // Obtenha o ID do cliente do cookie

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/ecommerce/user/${customerID}`
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
            <header
              style={{
                backgroundColor: headerColorFrame
                  ? headerColorFrame
                  : headerBackgroundColor,
                color: headerTextColorFrame
                  ? headerTextColorFrame
                  : headerColor,
                cursor: headerBackgroundColor || headerColor ? "pointer" : "",
              }}
              className={styles.header}
            >
              <Navbar />

              <img style={{ color: "white", width: "5vw" }} src={logo} />
              <SearchBar />
              <div className={styles.header__icons}>
                <a>
                  <img
                    src="https://i.imgur.com/ItjKDhc.png"
                    title="source: imgur.com"
                    style={{ width: "2.5rem" }}
                  />
                </a>
<Link to={'/cart'}>
                <a>
                  <img
                    src="https://i.imgur.com/1XrvJJL.png"
                    title="source: imgur.com"
                    style={{ width: "2.5rem" }}
                  />
                </a>

</Link>

<SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

     
              </div>
            </header>
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
              <span>Conteúdo Principal da Loja</span>
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
