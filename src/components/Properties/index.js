import React, { Component } from "react";
import Store from "../../stores/Store";

export default class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  componentWillMount() {
    Store.subscribe(() => {
      const statusState = Store.getState().status;

      this.setState({
        isEditing: statusState.isEditing
      });
    });
  }

  render() {
    return (
      <div className="pd-properties container is-fluid">
        <label className="pd-properties--label label is-small">
          Properties
        </label>
        <div className="pd-properties--field field">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="12px"
              disabled={!this.state.isEditing}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-arrows-v" />
            </span>
          </p>
        </div>
        <div className="pd-properties--field field">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="12px"
              disabled={!this.state.isEditing}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-arrows-h" />
            </span>
          </p>
        </div>
        <div className="pd-properties--field field">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="2px"
              disabled={!this.state.isEditing}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-square-o" />
            </span>
          </p>
        </div>
      </div>
    );
  }
}
