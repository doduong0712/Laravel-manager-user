/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
require("./components");

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./components";
//import dotenv from "dotenv";

// const result = dotenv.config();
// console.log(result);

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}