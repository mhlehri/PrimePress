import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./components/Authprovider/AuthProvider.jsx";
import Route from "./Route.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circle2 } from "react-preloaders";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer></ToastContainer>
      <Route></Route>
      <Circle2 color="teal" />
    </AuthProvider>
  </React.StrictMode>
);
