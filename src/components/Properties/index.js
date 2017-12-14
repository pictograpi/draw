import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  updateForms,
  removeSelectedForms,
  cloneSelectedForm
} from "../../services/Editor";
import Width from "../Width";
import Height from "../Height";
import Border from "../Border";
import FontFamily from "../FontFamily";
import Clone from "../Clone";
import BringToFront from "../BringToFront";
import BringToBack from "../BringToBack";

export default class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isFormSelected: false,
    };
  }

  /**
   * Sets form properties when resize is clicked.
   *
   * @memberof Properties
   */
  handleResizeClick() {
    updateForms();
  }

  /**
   * Removes selected forms.
   *
   * @memberof Properties
   */
  handleRemoveClick() {
    removeSelectedForms();
  }

  componentWillMount() {
    const statusStore = Store.getState().status;
    Store.subscribe(() => {
      const isFormSelected = !!statusStore.selectedForm;

      this.setState({
        isEditing: statusStore.isEditing,
        isFormSelected
      });
    });
  }

  render() {
    return (
      <div className="pd-properties container is-fluid">
        <label className="pd-properties--label label is-small">
          Properties
        </label>
        <div className="pd-properties--field">
          <Width />
        </div>
        <div className="pd-properties--field">
          <Height />
        </div>
        <div className="pd-properties--field">
          <Border />
        </div>
        <div className="pd-properties--field">
          <FontFamily />
        </div>
        <div
          className="pd-properties--button button is-small is-primary"
          disabled={!this.state.isEditing || !this.state.isFormSelected}
          onClick={event => this.handleResizeClick()}
        >
          Update
        </div>
        <Clone />
        <BringToFront />
        <BringToBack />
        <div
          className="pd-properties--button button is-small is-danger"
          disabled={!this.state.isEditing || !this.state.isFormSelected}
          onClick={event => this.handleRemoveClick()}
        >
          <span className="icon is-small">
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
    );
  }
}
