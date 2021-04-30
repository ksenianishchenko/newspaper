import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/app/App";
// Redux
import { Provider } from "react-redux";
import store from "../redux/configfureStore";
import { BrowserRouter } from 'react-router-dom';

import "../global_styles.scss";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
