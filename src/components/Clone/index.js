import React, { Component } from "react";
import Store from "../../stores/Store";

export default class Clone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isFormSelected: false
    };
  }

  /**
   * Clones selected forms.
   *
   * @memberof Properties
   */
  handleCloneClick() {
    cloneSelectedForm();
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
        onClick={event => this.handleCloneClick()}
      >
        <span className="icon is-small">
          <i className="fa fa-clone" />
        </span>
      </div>
    );
  }
}
