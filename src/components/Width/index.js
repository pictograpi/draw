import React, { Component } from "react";
import Store from "../../stores/Store";
import { setWidth } from "../../stores/Status";

export default class Width extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 20,
      isDisabled: true
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

  componentWillMount() {
    Store.subscribe(() => {
      const statusStore = Store.getState().status;
      const selectedForm = statusStore.selectedForm || undefined;
      const isTextForm = selectedForm && selectedForm.type === "i-text";
      const isLineForm = selectedForm && selectedForm.type === "line";

      this.setState({
        width: statusStore.width,
        isDisabled: !statusStore.isEditing || isTextForm || isLineForm
      });
    });
  }

  render() {
    return (
      <div className="field has-addons">
        <p className="control has-icons-left">
          <input
            className="input is-small"
            type="text"
            value={this.state.width}
            onChange={this.handleWidthChange}
            disabled={this.state.isDisabled}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-arrows-h" />
          </span>
        </p>
        <p className="control">
          <a
            className="button is-static is-small"
            disabled={this.state.isDisabled}
          >
            px
          </a>
        </p>
      </div>
    );
  }
}
