import React from "react";
import ReactDom from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import mystore from './redux/mystore';
import "./css/style.css";
import App from "./components/App";

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={mystore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);