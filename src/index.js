import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";

render(
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("app-container")
);
