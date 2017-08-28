import React, { Component } from "react";

export default class Menu extends Component {
  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-file-o" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-save" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-share-alt" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-print" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-square-o" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-circle-thin" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-image" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-long-arrow-right" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-pencil" />
              </span>
            </a>
            <a className="navbar-item">
              <span className="icon is-small">
                <i className="fa fa-font" />
              </span>
            </a>
            <a className="navbar-item">
              <span>untitled.png</span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
