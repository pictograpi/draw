import React, { Component } from "react";

export default class Menu extends Component {
  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-file" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-save" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-share" />
              </span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
