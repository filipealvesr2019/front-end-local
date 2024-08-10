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
import { ClerkProvider, RedirectToSignIn } from "@clerk/clerk-react";
import Products from "./components/Products.jsx";
import LoginForm from '../src/ecommerce/login/LoginForm.jsx'
import Profile from "./ecommerce/Profile/Profile.jsx";


import RegisterLinkUser from "../src/ecommerce/login/RegisterLinkUser.jsx";
import RegisterUser from "../src/ecommerce/login/RegisterUser.jsx";
import PasswordResetRequestUser from "../src/ecommerce/login/PasswordResetRequestUser.jsx";
import ResetPasswordPageUser from "../src/ecommerce/login/ResetPasswordPageUser.jsx";
// Import your publishable key
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


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
    <Route path="/looks" element={<UpdateTheme />} />
    <Route path="/sidebar" element={<Sidebar />} />
    <Route path="/temas" element={<ThemeList />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/products" element={<Products />} />
    <Route path="/signin" element={<LoginForm />} />
    <Route path="/profile" element={<Profile />} />



    <Route path="/user/register" element={<RegisterLinkUser />} />
    <Route path="/user/register/:token" element={<RegisterUser />} />
    <Route path="/user/forgotPassword" element={<PasswordResetRequestUser  />} />
    <Route path="/user/reset-password/:token" element={<ResetPasswordPageUser  />} />
   
  </Routes>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
  publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"
  
 navigate={(to) => window.history.pushState(null, '', to)}
    >
      <AuthProvider>
        <ChakraProvider>
          <Router>
            <Root />
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);
