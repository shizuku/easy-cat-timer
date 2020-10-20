import React from "react";
import ReactDOM from "react-dom";
import { ipcRenderer } from "electron";
import { App } from "./components/app";
import "../shared/locales";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

ipcRenderer.send("get-locale");
