import React, { Component } from "react";
import Store from "../../stores/Store";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  componentWillMount() {
    Store.subscribe(() => {
      this.setState({
        isEditing: Store.getState().status.isEditing
      });
    });
  }

  render() {
    return (
      <div className="pd-home">
        {!this.state.isEditing &&
          <section className="hero is-large is-primary">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">Create a new document</h1>
              </div>
            </div>
          </section>}
        <div
          className={`container is-fluid pd-home--editor-wrapper ${!this.state
            .isEditing && "pd-home--editor-wrapper__hidden"}`}
        >
          <canvas className="pd-home--editor" id="editor" />
        </div>
      </div>
    );
  }
}
