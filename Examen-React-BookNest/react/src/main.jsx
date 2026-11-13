import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Punto de entrada principal de la aplicación React.
//
// TODO:
// - Envolver <App /> con <BrowserRouter> (react-router-dom) para habilitar el routing.
// - Envolver la app con <OrderProvider> (src/context/OrderContext.jsx) para que
//   el pedido esté disponible en todas las páginas y en la navbar.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
