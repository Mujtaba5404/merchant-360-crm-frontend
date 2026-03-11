import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import MantineThemeOverride from "../mantine.config";
import App from "./App";
import "./index.css";
const theme = createTheme(MantineThemeOverride);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
