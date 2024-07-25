import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

const Root = () => (
  <Routes>
        <Route path="/" element={<App />} />

    <Route path="/login" element={<Login />} />
   
  </Routes>
);





ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>

  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>
    </AuthProvider>

);
