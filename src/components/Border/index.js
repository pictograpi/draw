import React, { Component } from "react";
import Store from "../../stores/Store";
import { setBorderSize } from "../../stores/Status";

export default class Border extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      borderSize: 2
    };
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
      const selectedForm = statusStore.selectedForm || undefined;
      const isTextForm = selectedForm && selectedForm.type === "i-text";

      this.setState({
        borderSize: statusStore.borderSize,
        isDisabled: !statusStore.isEditing || isTextForm
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
            value={this.state.borderSize}
            onChange={this.handleBorderSizeChange}
            disabled={this.state.isDisabled}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-square-o" />
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
