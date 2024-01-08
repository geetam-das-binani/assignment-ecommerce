import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import Home from "./components/Home/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Product/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute Component={Home} />} />
        <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
