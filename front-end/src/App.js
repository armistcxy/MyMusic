import React from "react";
import { StrictMode } from "react"; // Import StrictMode
import AppRouter from "./components/AppRouter";
import { createRoot } from "react-dom"; // Import createRoot

export default function App() {
  return (
    <StrictMode> {/* Wrap your app in StrictMode */}
      <AppRouter />
    </StrictMode>
  );
}