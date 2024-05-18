import { StrictMode } from "react";
import AppRouter from "./components/AppRouter";
import { createRoot } from "react-dom";
import React, {useEffect} from "react";
import Login from "./components/Login";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
import Spotify from "./components/Spotify";
import { AuthProvider } from "./components/context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
  );
}