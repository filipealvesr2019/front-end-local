import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AuthProvider from "../context/AdminAuthProvider.jsx";
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
import Products from "./components/CreateProducts/CreateProducts.jsx";
import LoginForm from "../src/ecommerce/login/LoginForm.jsx";
import Profile from "./ecommerce/Profile/Profile.jsx";

import RegisterLinkUser from "../src/ecommerce/login/RegisterLinkUser.jsx";
import RegisterUser from "../src/ecommerce/login/RegisterUser.jsx";
import PasswordResetRequestUser from "../src/ecommerce/login/PasswordResetRequestUser.jsx";
import ResetPasswordPageUser from "../src/ecommerce/login/ResetPasswordPageUser.jsx";
import { ConfigProvider } from "./ecommerce/context/ConfigContext.jsx";
import ProductDetails from "./ecommerce/Products/ProductDetails.jsx";
import UserAuthProvider from "./ecommerce/context/UserAuthProvider.jsx";
import AdminAuthProvider from "../context/AdminAuthProvider.jsx";
import PixQRCode from "./ecommerce/Payments/PixQRCode.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SalesDetails from "./pages/Sales/SalesDetails.jsx";
import { AdminProvider } from "./ecommerce/context/AdminContext.jsx";


const theme = createTheme();

const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterLink />} />
    <Route path="/register/:token" element={<Register />} />
    <Route path="/forgotPassword" element={<PasswordResetRequest />} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    <Route path="/loja/:subdomain" element={<LojaPage />} />
    <Route path="/theme/:id" element={<ThemeDetail />} />
    <Route path="/looks" element={<UpdateTheme />} />
    <Route path="/sidebar" element={<Sidebar />} />
    <Route path="/temas" element={<ThemeList />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/products" element={<Products />} />
    <Route path="/signin" element={<LoginForm />} />
    <Route path="/profile" element={<Profile />} />

    <Route path="/user/register" element={<RegisterLinkUser />} />
    <Route path="/user/register/:token" element={<RegisterUser />} />
    <Route path="/user/forgotPassword" element={<PasswordResetRequestUser />} />
    <Route
      path="/user/reset-password/:token"
      element={<ResetPasswordPageUser />}
    />
    <Route path="/user/product/:productId" element={<ProductDetails />} />
    <Route path="/admin/sales/:productId" element={<SalesDetails />} />

    <Route path="/qrcode" element={<PixQRCode />} />

  </Routes>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    

     <ThemeProvider theme={theme}>
     <ConfigProvider>
      <AdminAuthProvider >
        <UserAuthProvider>
          <ChakraProvider>
            <Router>
              <Root />
            </Router>
          </ChakraProvider>
        </UserAuthProvider>
      </AdminAuthProvider >
    </ConfigProvider>
     </ThemeProvider>
  


  </React.StrictMode>
);
