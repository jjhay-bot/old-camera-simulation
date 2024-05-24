import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import { client } from "./qraphql/client";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
