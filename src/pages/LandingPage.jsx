import React from "react";
import NavBar from "../components/NavBar";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <NavBar />
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
        
            <ul className={styles.ul}>
            <a href="https://imgur.com/eIsbYKG">
              <img
                src="https://i.imgur.com/eIsbYKG.jpg"
                title="source: imgur.com"
                className={styles.img}
              />
            </a>
              <li className={styles.li}>
                <a href="#sobre">Sobre</a>
              </li>
              <li className={styles.li}>
                <a href="#servicos">Serviços</a>
              </li>
              <li className={styles.li}>
                <a href="#contato">Contato</a>
              </li>
            </ul>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <button href="#Login" className={styles.button}>Login</button>
              </li>
              <li className={styles.li}>
                <button href="#Cadastro" className={styles.button}>Cadastro</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <section id="sobre">
          <h2>Sobre Nós</h2>
          <p>Informações sobre a empresa ou produto.</p>
        </section>
        <section id="servicos">
          <h2>Serviços</h2>
          <p>Detalhes sobre os serviços oferecidos.</p>
        </section>
        <section id="contato">
          <h2>Contato</h2>
          <p>Formulário ou informações de contato.</p>
        </section>
        <section id="sobre">
          <h2>Sobre Nós</h2>
          <p>Informações sobre a empresa ou produto.</p>
        </section>
        <section id="servicos">
          <h2>Serviços</h2>
          <p>Detalhes sobre os serviços oferecidos.</p>
        </section>
        <section id="contato">
          <h2>Contato</h2>
          <p>Formulário ou informações de contato.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Nossa Empresa</p>
      </footer>
    </div>
  );
};

export default LandingPage;
