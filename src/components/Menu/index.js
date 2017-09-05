import React, { Component } from "react";
import {
  create,
  addRect,
  addCircle,
  addLine,
  setDrawingMode,
  addText,
  addTriangle
} from "../../services/Editor";
import Store from "../../stores/Store";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      filename: ""
    };
  }

  /**
   * Creates a new file when new file button is clicked.
   *
   * @param {any} event
   * @memberof Menu
   */
  onNewFile(event) {
    event.preventDefault();
    create();
  }

  /**
   * Adds a new rect to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  onAddRect(event) {
    event.preventDefault();
    this.disableDrawingMode();
    addRect();
  }

  /**
   * Adds a new circle to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  onAddCircle(event) {
    event.preventDefault();
    this.disableDrawingMode();
    addCircle();
  }

  /**
   * Adds a new line to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  onAddLine(event) {
    event.preventDefault();
    this.disableDrawingMode();
    addLine();
  }

  /**
   * Adds a new triangle to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  onAddTriangle(event) {
    event.preventDefault();
    this.disableDrawingMode();
    addTriangle();
  }

  /**
   * Enables canvas drawing mode.
   *
   * @param {any} event
   * @memberof Menu
   */
  onDrawingMode(event) {
    event.preventDefault();
    setDrawingMode(true);
  }

  /**
   * Adds a text to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  onAddText(event) {
    event.preventDefault();
    addText();
  }

  /**
   * Disables canvas drawing mode.
   *
   * @memberof Menu
   */
  disableDrawingMode() {
    setDrawingMode(false);
  }

  componentWillMount() {
    Store.subscribe(() => {
      const status = Store.getState().status;

      this.setState({
        isEditing: status.isEditing,
        filename: status.filename
      });
    });
  }

  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <a className="navbar-item" onClick={event => this.onNewFile(event)}>
              <span className="icon is-small">
                <i className="fa fa-file-o" />
              </span>
            </a>
            {this.state.isEditing &&
              <a className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-save" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-share-alt" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-print" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a
                className="navbar-item"
                onClick={event => this.onAddRect(event)}
              >
                <span className="icon is-small">
                  <i className="fa fa-square-o" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a
                className="navbar-item"
                onClick={event => this.onAddCircle(event)}
              >
                <span className="icon is-small">
                  <i className="fa fa-circle-thin" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a
                className="navbar-item"
                onClick={event => this.onAddTriangle(event)}
              >
                <span className="icon is-small">
                  <i className="fa fa-play fa-rotate-270" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-image" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a
                className="navbar-item"
                onClick={event => this.onAddLine(event)}
              >
                <span className="icon is-small">
                  <i className="fa fa-long-arrow-right" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a
                className="navbar-item"
                onClick={event => this.onDrawingMode(event)}
              >
                <span className="icon is-small">
                  <i className="fa fa-pencil" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a
                className="navbar-item"
                onClick={event => this.onAddText(event)}
              >
                <span className="icon is-small">
                  <i className="fa fa-font" />
                </span>
              </a>}
            {this.state.isEditing &&
              <a className="navbar-item">
                <span>
                  {" "}{this.state.filename}{" "}
                </span>
              </a>}
          </div>
        </div>
      </nav>
    );
  }
}
