import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AuthProvider from "../context/AuthContext.jsx";
import RegisterLink from "./pages/RegisterLink.jsx";
import Register from "./pages/Register.jsx";
import PasswordResetRequest from "./pages/PasswordResetRequest.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ThemeDetail from "./ecommerce/ThemeDetail.jsx";
import LojaPage from "./ecommerce/LojaPage.jsx";
import UpdateTheme from "./ecommerce/UpdateTheme.jsx";

import Sidebar from "./pages/Sidebar.jsx";
import ThemeList from "./ecommerce/ThemeList.jsx";
import CartPage from "./ecommerce/cartPage/Cart.jsx";
const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterLink />} />
    <Route path="/register/:token" element={<Register />} />
    <Route path="/forgotPassword" element={<PasswordResetRequest />} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    <Route path="/loja" element={<LojaPage />} />
    <Route path="/theme/:id" element={<ThemeDetail />} />
    <Route path="/looks" element={<UpdateTheme />} />~
    <Route path="/sidebar" element={<Sidebar />} />
    <Route path="/temas" element={<ThemeList />} />

    <Route path="/cart" element={<CartPage />} />

  </Routes>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <AuthProvider>
        <ChakraProvider>
          <Router>
            <Root />
          </Router>
        </ChakraProvider>
      </AuthProvider>

  </React.StrictMode>
);
