import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "/src/contexts/AuthContext";
import FirestoreContextProvider from "/src/contexts/FirestoreContext";
import CartContextProvider from "/src/contexts/CartContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <FirestoreContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>,
);
