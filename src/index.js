import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./App.scss";







const root = document.getElementById("root");

ReactDom.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    root
);
