import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>PictograpiDraw</strong> by{" "}
              <a href="http://pictograpi.com">Pictograpi Team</a>. The website
              content is licensed by{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                CC BY-NC-SA 4.0
              </a>.
            </p>
            <p>
              <a
                target="_blank"
                className="icon"
                href="https://github.com/pictograpi/draw"
              >
                <i className="fa fa-github" />
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
