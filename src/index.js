import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, faHeartReg, faExpandArrowsAlt, faCompressArrowsAlt, faArrowLeft, faArrowRight);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
