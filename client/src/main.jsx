import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <CssBaseline />
      <App />
    </AuthContextProvider>
  </ThemeProvider>
);
