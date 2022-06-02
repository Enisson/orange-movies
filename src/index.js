import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import { UserContextProvider } from "./contexts/UserContext";
import Navbar from "./components/Header/NavBar";

ReactDOM.render(
  <UserContextProvider>
    <BrowserRouter>
      <Navbar />
      <App />
      <Footer />
    </BrowserRouter>
  </UserContextProvider>,
  document.getElementById("root")
);
