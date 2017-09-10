import React, { Component } from "react";
import Store from "../../stores/Store";
import { setBorderSize, setWidth, setHeight } from "../../stores/Status";

export default class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 20,
      height: 20,
      borderSize: 2
    };
  }

  /**
   * Stores new width.
   *
   * @param {any} event
   * @memberof Properties
   */
  handleWidthChange(event) {
    Store.dispatch(setWidth(Number.parseInt(event.target.value)));
  }

  /**
   * Stores new height.
   *
   * @param {any} event
   * @memberof Properties
   */
  handleHeightChange(event) {
    Store.dispatch(setHeight(Number.parseInt(event.target.value)));
  }

  /**
   * Stores new border size.
   *
   * @param {any} event
   * @memberof Properties
   */
  handleBorderSizeChange(event) {
    Store.dispatch(setBorderSize(Number.parseInt(event.target.value)));
  }

  componentWillMount() {
    Store.subscribe(() => {
      const statusStore = Store.getState().status;

      this.setState({
        isEditing: statusStore.isEditing,
        borderSize: statusStore.borderSize,
        width: statusStore.width,
        height: statusStore.height
      });
    });
  }

  render() {
    return (
      <div className="pd-properties container is-fluid">
        <label className="pd-properties--label label is-small">
          Properties
        </label>
        <div className="pd-properties--field field has-addons">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder={this.state.width}
              onChange={this.handleWidthChange}
              disabled={!this.state.isEditing}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-arrows-v" />
            </span>
          </p>
          <p className="control">
            <a
              className="button is-static is-small"
              disabled={!this.state.isEditing}
            >
              px
            </a>
          </p>
        </div>
        <div className="pd-properties--field field has-addons">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder={this.state.height}
              onChange={this.handleHeightChange}
              disabled={!this.state.isEditing}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-arrows-h" />
            </span>
          </p>
          <p className="control">
            <a
              className="button is-static is-small"
              disabled={!this.state.isEditing}
            >
              px
            </a>
          </p>
        </div>
        <div className="pd-properties--field field has-addons">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder={this.state.borderSize}
              onChange={this.handleBorderSizeChange}
              disabled={!this.state.isEditing}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-square-o" />
            </span>
          </p>
          <p className="control">
            <a
              className="button is-static is-small"
              disabled={!this.state.isEditing}
            >
              px
            </a>
          </p>
        </div>
      </div>
    );
  }
}
