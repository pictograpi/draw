import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./views/Home";

render(
  <BrowserRouter>
    <div>
      <Header />
      <div className="columns is-gapless">
        <Sidebar />
        <Route exact path="/" component={Home} />
      </div>
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("app-container")
);
