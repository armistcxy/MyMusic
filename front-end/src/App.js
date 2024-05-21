import { StrictMode } from "react";
import AppRouter from "./components/AppRouter";
import { createRoot } from "react-dom";
import React, { useEffect } from "react";
import Login from "./components/Login";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
import Spotify from "./components/Spotify";
import { AuthProvider } from "./components/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AuthProvider>
  );
}