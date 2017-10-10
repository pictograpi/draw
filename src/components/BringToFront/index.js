import React, { Component } from "react";
import Store from "../../stores/Store";
import { bringToFront } from "../../services/Editor";

export default class BringToFront extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isFormSelected: false
    };
  }

  /**
   * Moves selected forms forward.
   *
   * @memberof BringToFront
   */
  handleBringToFrontClick() {
    bringToFront();
  }

  componentWillMount() {
    Store.subscribe(() => {
      const statusStore = Store.getState().status;
      const selectedForm = statusStore.selectedForm || undefined;

      this.setState({
        isEditing: statusStore.isEditing,
        isFormSelected: selectedForm !== undefined
      });
    });
  }

  render() {
    return (
      <div
        className="pd-properties--button button is-small"
        disabled={!this.state.isEditing || !this.state.isFormSelected}
        onClick={event => this.handleBringToFrontClick()}
      >
        <span className="icon is-small">
          <i className="fa fa-rotate-180 fa-sort-amount-asc" />
        </span>
      </div>
    );
  }
}
