import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./components/Authprovider/AuthProvider.jsx";
import Route from "./Route.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circle2 } from "react-preloaders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <AuthProvider>
        <ToastContainer></ToastContainer>
        <Route></Route>
        <Circle2 color="teal" />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
