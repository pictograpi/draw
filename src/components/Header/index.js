import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar is-dark has-shadow" id="top">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            PictograpiDraw <span>(beta)</span>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a
              className="navbar-item"
              href="http://pictograpi.com/#contact"
              target="_blank"
            >
              Contact Us
            </a>
            <a
              className="navbar-item"
              href="http://pictograpi.com"
              target="_blank"
            >
              Pictograpi
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
