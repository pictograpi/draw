import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  create,
  addRect,
  addEllipse,
  addLine,
  setDrawingMode,
  addText,
  addTriangle
} from "../../services/Editor";
import {
  setBorderColor,
  setFillColor,
  setIsSearchVisible
} from "../../stores/Status";
import { ChromePicker } from "react-color";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isBorderColorPickerVisible: false,
      isFillColorPickerVisible: false
    };
  }

  /**
   * Creates a new file when new file button is clicked.
   *
   * @param {any} event
   * @memberof Menu
   */
  handleNewFileClick(event) {
    event.preventDefault();
    create();
  }

  /**
   * Adds a new rect to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  handleAddRectClick(event) {
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
  handleaddEllipseClick(event) {
    event.preventDefault();
    this.disableDrawingMode();
    addEllipse();
  }

  /**
   * Adds a new line to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  handleAddLineClick(event) {
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
  handleAddTriangleClick(event) {
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
  handleDrawingModeClick(event) {
    event.preventDefault();
    setDrawingMode(true);
  }

  /**
   * Adds a text to the canvas.
   *
   * @param {any} event
   * @memberof Menu
   */
  handleAddTextClick(event) {
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

  /**
   * Opens fill color picker.
   *
   * @memberof Menu
   */
  handleFillColorClick() {
    this.setState({
      isBorderColorPickerVisible: false,
      isFillColorPickerVisible: !this.state.isFillColorPickerVisible
    });
  }

  /**
   * Opens border color picker.
   *
   * @memberof Menu
   */
  handleBorderColorClick() {
    this.setState({
      isFillColorPickerVisible: false,
      isBorderColorPickerVisible: !this.state.isBorderColorPickerVisible
    });
  }

  /**
   * Stores fill color when it is changed.
   *
   * @param {string} color New color selected.
   * @memberof Menu
   */
  handleChangeFillColor(color) {
    Store.dispatch(setFillColor(color));
  }

  /**
   * Stores border color when it is changed.
   *
   * @param {string} color New color selected.
   * @memberof Menu
   */
  handleChangeBorderColor(color) {
    Store.dispatch(setBorderColor(color));
  }

  /**
   * Handles any click outside the pickers to close them.
   *
   * @memberof Menu
   */
  handleCoverClick() {
    this.setState({
      isFillColorPickerVisible: false,
      isBorderColorPickerVisible: false
    });
  }

  /**
   * Handles search click and toggles search status.
   */
  handleSearchClick() {
    Store.dispatch(setIsSearchVisible(!this.state.isSearchVisible));
  }

  componentWillMount() {
    Store.subscribe(() => {
      const status = Store.getState().status;

      this.setState({
        isEditing: status.isEditing,
        filename: status.filename,
        fillColor: (status.fillColor || {}).rgb,
        borderColor: (status.borderColor || {}).rgb,
        fillColorRGBAString: status.fillColorRGBAString,
        borderColorRGBAString: status.borderColorRGBAString,
        isSearchVisible: status.isSearchVisible
      });
    });
  }

  render() {
    return (
      <aside className="pd-sidebar column is-1">
        {(this.state.isBorderColorPickerVisible ||
          this.state.isFillColorPickerVisible) &&
          <div
            className="pd-sidebar--color-cover"
            onClick={() => this.handleCoverClick()}
          />}
        <p className="field has-text-centered">
          <a
            className="pd-sidebar--button button"
            onClick={event => this.handleNewFileClick(event)}
          >
            <span className="icon">
              <i className="fa fa-file-o" />
            </span>
          </a>
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
          >
            <span className="icon">
              <i className="fa fa-save" />
            </span>
          </a>
        </p>
        <p className="field has-text-centered">
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
          >
            <span className="icon">
              <i className="fa fa-share-alt" />
            </span>
          </a>
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
          >
            <span className="icon">
              <i className="fa fa-print" />
            </span>
          </a>
        </p>
        <hr />
        <p className="field has-text-centered">
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
            onClick={event => this.handleAddRectClick(event)}
          >
            <span className="icon">
              <i className="fa fa-square-o" />
            </span>
          </a>
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
            onClick={event => this.handleaddEllipseClick(event)}
          >
            <span className="icon">
              <i className="fa fa-circle-thin" />
            </span>
          </a>
        </p>
        <p className="field has-text-centered">
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
            onClick={event => this.handleAddTriangleClick(event)}
          >
            <span className="icon">
              <i className="fa fa-play fa-rotate-270" />
            </span>
          </a>
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
            onClick={event => this.handleAddLineClick(event)}
          >
            <span className="icon">
              <i className="fa fa-long-arrow-right" />
            </span>
          </a>
        </p>
        <p className="field has-text-centered">
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
            onClick={event => this.handleSearchClick(event)}
          >
            <span className="icon">
              <i className="fa fa-image" />
            </span>
          </a>
          <a
            className="pd-sidebar--button button"
            disabled={!this.state.isEditing}
            onClick={event => this.handleAddTextClick(event)}
          >
            <span className="icon">
              <i className="fa fa-font" />
            </span>
          </a>
        </p>
        <hr />
        <p className="field has-text-centered">
          <a
            className="pd-sidebar--button button is-white"
            style={{ color: this.state.fillColorRGBAString }}
            disabled={!this.state.isEditing}
            onClick={event => this.handleFillColorClick(event)}
          >
            <span className="icon is-medium">
              <i className="fa fa-square" />
            </span>
          </a>
          {this.state.isFillColorPickerVisible &&
            <div className="pd-sidebar--color-popover">
              <ChromePicker
                color={this.state.fillColor}
                onChangeComplete={color => this.handleChangeFillColor(color)}
              />
            </div>}
          <a
            className="pd-sidebar--button button is-white"
            style={{ color: this.state.borderColorRGBAString }}
            disabled={!this.state.isEditing}
            onClick={event => this.handleBorderColorClick(event)}
          >
            <span className="icon is-medium">
              <i className="fa fa-square-o" />
            </span>
          </a>
          {this.state.isBorderColorPickerVisible &&
            <div className="pd-sidebar--color-popover">
              <ChromePicker
                color={this.state.borderColor}
                onChangeComplete={color => this.handleChangeBorderColor(color)}
              />
            </div>}
        </p>
      </aside>
    );
  }
}
