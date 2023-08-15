import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "virtual:windi.css";
import "./overwrite.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
