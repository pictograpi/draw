import React, { Component } from "react";
import Store from "../../stores/Store";
import { setHeight } from "../../stores/Status";

export default class Height extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 20,
      isDisabled: true
    };
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

  componentWillMount() {
    Store.subscribe(() => {
      const statusStore = Store.getState().status;
      const selectedForm = statusStore.selectedForm || undefined;
      const isTextForm = selectedForm && selectedForm.type === "i-text";
      const isLineForm = selectedForm && selectedForm.type === "line";

      this.setState({
        isDisabled: !statusStore.isEditing || isTextForm || isLineForm,
        height: statusStore.height
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
            value={this.state.height}
            onChange={this.handleHeightChange}
            disabled={this.state.isDisabled}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-arrows-v" />
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
