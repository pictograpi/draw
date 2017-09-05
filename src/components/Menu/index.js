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
import { ChromePicker } from "react-color";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isBorderColorPickerVisible: false,
      isFillColorPickerVisible: false,
      filename: "",
      fillColor: "#4A90E2",
      borderColor: "#50E3C2"
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
  handleAddCircleClick(event) {
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

  handleFillColorClick() {
    this.setState({
      isBorderColorPickerVisible: false,
      isFillColorPickerVisible: !this.state.isFillColorPickerVisible
    });
  }

  handleBorderColorClick() {
    this.setState({
      isFillColorPickerVisible: false,
      isBorderColorPickerVisible: !this.state.isBorderColorPickerVisible
    });
  }

  handleChangeFillColor(color) {
    this.setState({
      fillColor: color.hex
    });
  }

  handleChangeBorderColor(color) {
    this.setState({
      borderColor: color.hex
    });
  }

  handleCoverClick() {
    this.setState({
      isFillColorPickerVisible: false,
      isBorderColorPickerVisible: false
    });
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
      <nav className="container is-fluid level">
        {(this.state.isBorderColorPickerVisible ||
          this.state.isFillColorPickerVisible) &&
          <div
            className="pd-menu--color-cover"
            onClick={() => this.handleCoverClick()}
          />}
        <div className="level-left">
          <div className="level-item">
            <div className="field has-addons">
              <p className="control">
                <a
                  className="button"
                  onClick={event => this.handleNewFileClick(event)}
                >
                  <span className="icon is-small">
                    <i className="fa fa-file-o" />
                  </span>
                  <span>New</span>
                </a>
              </p>
              <p className="control">
                <a className="button" disabled={!this.state.isEditing}>
                  <span className="icon is-small">
                    <i className="fa fa-save" />
                  </span>
                  <span>Save</span>
                </a>
              </p>
              <p className="control">
                <a className="button" disabled={!this.state.isEditing}>
                  <span className="icon is-small">
                    <i className="fa fa-share-alt" />
                  </span>
                  <span>Share</span>
                </a>
              </p>
              <p className="control">
                <a className="button" disabled={!this.state.isEditing}>
                  <span className="icon is-small">
                    <i className="fa fa-print" />
                  </span>
                  <span>Print</span>
                </a>
              </p>
            </div>
          </div>
          <div className="level-item">
            <div className="field has-addons">
              <p className="control">
                <a
                  className="button"
                  disabled={!this.state.isEditing}
                  onClick={event => this.handleAddRectClick(event)}
                >
                  <span className="icon is-small">
                    <i className="fa fa-square-o" />
                  </span>
                </a>
              </p>
              <p className="control">
                <a
                  className="button"
                  disabled={!this.state.isEditing}
                  onClick={event => this.handleAddCircleClick(event)}
                >
                  <span className="icon is-small">
                    <i className="fa fa-circle-thin" />
                  </span>
                </a>
              </p>
              <p className="control">
                <a
                  className="button"
                  disabled={!this.state.isEditing}
                  onClick={event => this.handleAddTriangleClick(event)}
                >
                  <span className="icon is-small">
                    <i className="fa fa-play fa-rotate-270" />
                  </span>
                </a>
              </p>
              <p className="control">
                <a className="button" disabled={!this.state.isEditing}>
                  <span className="icon is-small">
                    <i className="fa fa-long-arrow-right" />
                  </span>
                </a>
              </p>
              <p className="control">
                <a className="button" disabled={!this.state.isEditing}>
                  <span className="icon is-small">
                    <i className="fa fa-image" />
                  </span>
                </a>
              </p>
              <p className="control">
                <a
                  className="button"
                  disabled={!this.state.isEditing}
                  onClick={event => this.handleAddTextClick(event)}
                >
                  <span className="icon is-small">
                    <i className="fa fa-font" />
                  </span>
                </a>
              </p>
            </div>
          </div>
          <div className="level-item">
            <div className="field has-addons">
              <div className="control">
                <a
                  className="button is-white"
                  style={{ color: this.state.fillColor }}
                  disabled={!this.state.isEditing}
                  onClick={event => this.handleFillColorClick(event)}
                >
                  <span className="icon is-medium">
                    <i className="fa fa-square" />
                  </span>
                </a>
                {this.state.isFillColorPickerVisible &&
                  <div className="pd-menu--color-popover">
                    <ChromePicker
                      color={this.state.fillColor}
                      onChangeComplete={color =>
                        this.handleChangeFillColor(color)}
                    />
                  </div>}
              </div>
              <div className="control">
                <a
                  className="button is-white"
                  style={{ color: this.state.borderColor }}
                  disabled={!this.state.isEditing}
                  onClick={event => this.handleBorderColorClick(event)}
                >
                  <span className="icon is-medium">
                    <i className="fa fa-square-o" />
                  </span>
                </a>
                {this.state.isBorderColorPickerVisible &&
                  <div className="pd-menu--color-popover">
                    <ChromePicker
                      color={this.state.borderColor}
                      onChangeComplete={color =>
                        this.handleChangeBorderColor(color)}
                    />
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
