import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="hero is-large is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Create a new document</h1>
          </div>
        </div>
      </section>
    );
  }
}
