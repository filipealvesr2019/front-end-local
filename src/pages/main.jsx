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



const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterLink/>} />
    
    <Route path="/register/:token" element={<Register/>} />

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
