import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ColorCircle from "../ecommerce/colors/ColorCircle"; // Import the ColorCircle component

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Cookies from "js-cookie";

// import Layout1 from "../ecommerce/layout/Layout1.module.css";
// import Layout2 from "../ecommerce/layout/Layout2.module.css";
import styles from "./UpdateTheme.module.css";
const UpdateTheme = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [icon, setIcon] = useState("");
  const [mainBackgroundColor, setMainBackgroundColor] = useState("");
  const [mainColor, setMainColor] = useState("");
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("");
  const [footerColor, setFooterColor] = useState("");
  const [switchIcon, setSwitchIcon] = useState(true); // Alterei para booleano
  const [logo, setLogo] = useState("");
  const [layout, setLayout] = useState("");
  const [showCart, setshowCart] = useState(false);

  const customerID = Cookies.get("customerID"); // Obtenha o ID do cliente do cookie
  const [ecommerceID, setEcommerceID] = useState("");
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
        setIcon(response.data.theme.header.icons);

        setMainColor(response.data.theme.main.color);
        setFooterBackgroundColor(response.data.theme.footer.backgroundColor);
        setFooterColor(response.data.theme.footer.color);
        setLayout(response.data.layout);
        setEcommerceID(response.data._id);
      } catch (error) {
        console.error("Erro ao buscar o e-commerce:", error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  const handleSaveTheme = async () => {
    try {
      await axios.put(
        `http://localhost:3002/api/ecommerce/${ecommerceID}/update-theme`,
        {
          theme: {
            header: {
              backgroundColor: headerBackgroundColor,
              color: headerColor,
            },
            main: { backgroundColor: mainBackgroundColor, color: mainColor },
            footer: {
              backgroundColor: footerBackgroundColor,
              color: footerColor,
            },
          },
        }
      );
      setIsEditMode(false);
      setEditingSection(null);
      alert("Tema atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o tema:", error);
    }
  };

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  const handleClickSwitchIcon = () => {
    setSwitchIcon((prev) => !prev); // Alterna o valor booleano
  };

  const handleSwitchPage = (page) => {
    setEditingSection(page); // Atualiza a seção de edição
  };

  const renderSwitchPage = () => {
    switch (editingSection) {
      case "home":
        return (
          <div style={{ backgroundColor: "white" }}>
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />{" "}
            <span>Sair</span>
            <label>Cor de Fundo do Header:</label>
            <ColorCircle
              color={headerBackgroundColor}
              onChange={changeHeaderColor}
            />
            <label>Cor do Texto do Header:</label>
            <ColorCircle color={headerColor} onChange={changeHeaderTextColor} />
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />
            <span>Sair</span>
            <label>Cor de Fundo do Main:</label>
            <ColorCircle
              color={mainBackgroundColor}
              onChange={changeMainColor}
            />
            <label>Cor do Texto do Main:</label>
            <ColorCircle color={mainColor} onChange={changeMainTextColor} />
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />{" "}
            <span>Sair</span>
            <label>Cor de Fundo do Footer:</label>
            <ColorCircle
              color={footerBackgroundColor}
              onChange={changeFooterColor}
            />
            <label>Cor do Texto do Footer:</label>
            <ColorCircle color={footerColor} onChange={changeFooterTextColor} />
            <span onClick={() => setshowCart(true)}>carrinho</span>
          </div>
        );
      case "productDetails":
        return <div>productDetails</div>;
      case "cartPage":
        return <div>cartPage</div>;
      default:
        return <></>;
    }
  };

  const renderSwitchContent = () => {
    switch (editingSection) {
      case "home":
        return <div>pagina inicial</div>;
      case "productDetails":
        return <div>detalhes do produto</div>;
      default:
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyItems: "flex-end",
                width: "100vw",
              }}
            ></div>
          </>
        );
    }
  };

  const renderSwitchToMobileContent = () => {
    switch (editingSection) {
      case "home":
        return <div>pagina inicial mobile</div>;
      case "productDetails":
        return <div>detalhes do produto mobile</div>;
      default:
        return <></>;
    }
  };
  // const layoutStyles = () => {
  //   switch (layout) {
  //     case "layout1":
  //       return Layout1;
  //     case "layout2":
  //       return Layout2;
  //     default:
  //       return {}; // Retorna um objeto vazio se nenhum layout for encontrado
  //   }
  // };

  // const styles = layoutStyles(); // Chame a função para obter o estilo correto

  const changeHeaderColor = (color) => {
    setHeaderBackgroundColor(color); // Atualiza o estado com a nova cor

    const iframe = document.getElementById("mobile-view");
    if (iframe) {
      // Envia uma mensagem para o iframe para alterar a cor do header
      iframe.contentWindow.postMessage(
        { type: "CHANGE_HEADER_COLOR", color },
        "*"
      );
    }
  };

  const changeHeaderTextColor = (color) => {
    setHeaderColor(color); // Atualiza o estado com a nova cor

    const iframe = document.getElementById("mobile-view");
    if (iframe) {
      // Envia uma mensagem para o iframe para alterar a cor do header
      iframe.contentWindow.postMessage(
        { type: "CHANGE_HEADER_TEXT_COLOR", color },
        "*"
      );
    }
  };

  const changeMainColor = (color) => {
    setMainBackgroundColor(color); // Atualiza o estado com a nova cor

    const iframe = document.getElementById("mobile-view");
    if (iframe) {
      // Envia uma mensagem para o iframe para alterar a cor do header
      iframe.contentWindow.postMessage(
        { type: "CHANGE_MAIN_COLOR", color },
        "*"
      );
    }
  };

  const changeMainTextColor = (color) => {
    setMainColor(color); // Atualiza o estado com a nova cor

    const iframe = document.getElementById("mobile-view");
    if (iframe) {
      // Envia uma mensagem para o iframe para alterar a cor do header
      iframe.contentWindow.postMessage(
        { type: "CHANGE_MAIN_TEXT_COLOR", color },
        "*"
      );
    }
  };

  const changeFooterColor = (color) => {
    setMainBackgroundColor(color); // Atualiza o estado com a nova cor

    const iframe = document.getElementById("mobile-view");
    if (iframe) {
      // Envia uma mensagem para o iframe para alterar a cor do header
      iframe.contentWindow.postMessage(
        { type: "CHANGE_FOOTER_COLOR", color },
        "*"
      );
    }
  };

  const changeFooterTextColor = (color) => {
    setMainColor(color); // Atualiza o estado com a nova cor

    const iframe = document.getElementById("mobile-view");
    if (iframe) {
      // Envia uma mensagem para o iframe para alterar a cor do header
      iframe.contentWindow.postMessage(
        { type: "CHANGE_FOOTER_TEXT_COLOR", color },
        "*"
      );
    }
  };

  const scrollToCarousel = () => {
    const lojaIframe = document.getElementById("mobile-view");
    if (lojaIframe) {
      lojaIframe.contentWindow.postMessage({ type: "SCROLL_TO_CAROUSEL" }, "*");
    }
  };

  return (
    <>
      <div className={styles.section}>
        <span
          style={{
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleClickSwitchIcon}
        >
          {switchIcon ? "modo desktop" : "modo celular"}
        </span>
        <a
          onClick={handleClickSwitchIcon}
          style={{
            color: "white",
            cursor: "pointer",
          }}
        >
          <img
            src={
              switchIcon
                ? "https://i.imgur.com/9TngDuX.png"
                : "https://i.imgur.com/A2cWRwb.png"
            }
            title="source: imgur.com"
          />
        </a>
      </div>

      <div className={styles.container}>
        <div className={styles.div}>{renderSwitchPage()}</div>

        <div className={styles.screenContainer}>
          {switchIcon ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {editingSection != "home" && (
                  <div className={styles.menu}>
                    <span
                      onClick={() => handleSwitchPage("home")}
                    
                      className={styles.span}
                    >
                      <img
                        src="https://i.imgur.com/gGxXnvp.png"
                        alt=""
                        style={{ width: "1.32rem" }}
                        className={styles.span}
                      />{" "}
                      Página Inicial
                    </span>
                    <span onClick={() => handleSwitchPage("CategoriesPage")}   className={styles.span}>
                      Página de categorias
                    </span>
                    <span onClick={() => handleSwitchPage("productDetails")}   className={styles.span}>
                      Detalhes do Produto
                    </span>
                    <span onClick={() => handleSwitchPage("cartPage")}   className={styles.span}>
                      pagina do carrinho
                    </span>
                    <span onClick={() => handleSwitchPage("paymentsPage")}   className={styles.span}>
                      pagina de pagamento
                    </span>
                    <span onClick={() => handleSwitchPage("footerText")}   className={styles.span}>
                      Texto do Footer
                    </span>
                    <span
                      style={{
                        color: "black",
                        cursor: "pointer",
                      }}
                      onClick={scrollToCarousel}
                    >
                      Carrosel
                    </span>
                  </div>
                )}
                {showCart ? (
                  <div
                    className="mobile-device"
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <iframe
                      id="mobile-view"
                      src="http://localhost:3004/cart" // URL da página mobile
                      title="Mobile View"
                      style={{
                        width: "1180px",
                        height: "700px",
                        border: "none",
                        borderRadius: "10px",
                      }} // Exemplo de dimensões de um iPhone X
                    />
                  </div>
                ) : (
                  <div
                    className="mobile-device"
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <iframe
                      id="mobile-view"
                      src="http://localhost:3004/loja" // URL da página mobile
                      title="Mobile View"
                      style={{
                        width: "1180px",
                        height: "700px",
                        border: "none",
                        borderRadius: "10px",
                      }} // Exemplo de dimensões de um iPhone X
                    />
                  </div>
                )}
              </div>

              <div className={styles.containerDesktop}>
                {renderSwitchContent()}
              </div>
            </>
          ) : (
            <>
              <div className={styles.containerMobile}>
                {editingSection != "home" && (
                  <div className={styles.menu}>
                    <span onClick={() => handleSwitchPage("home")}>
                      Página Inicial
                    </span>
                    <span onClick={() => handleSwitchPage("CategoriesPage")}>
                      Página de categorias
                    </span>
                    <span onClick={() => handleSwitchPage("productDetails")}>
                      Detalhes do Produto
                    </span>
                    <span onClick={() => handleSwitchPage("cartPage")}>
                      pagina do carrinho
                    </span>
                    <span onClick={() => handleSwitchPage("paymentsPage")}>
                      pagina de pagamento
                    </span>
                    <span onClick={() => handleSwitchPage("footerText")}>
                      Texto do Footer
                    </span>
                  </div>
                )}
                <div className={styles.containerDesktop}>
                  {renderSwitchToMobileContent()}
                </div>
                <div>
                  <div className={styles.div}>
                    <iframe
                      id="mobile-view"
                      src="http://localhost:3004/loja" // URL da página mobile
                      title="Mobile View"
                      style={{
                        width: "375px",
                        height: "812px",
                        border: "none",
                        borderRadius: "10px",
                      }} // Exemplo de dimensões de um iPhone X
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button onClick={handleSaveTheme}>Salvar Tema</button>
    </>
  );
};

export default UpdateTheme;
