import React from "react";
import ReactDOM from "react-dom";
import { store } from "./reducer/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./style/index.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
