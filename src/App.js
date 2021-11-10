import React from "react";

import AppProvider from "context/AppProvider";

import Main from "./Main";

import "./config.css";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
