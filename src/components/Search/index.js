import React, { Component } from "react";
import Store from "../../stores/Store";
import { getPictographs } from "../../stores/Pictographs";
import { addImage } from "../../services/Editor";
import { setIsSearchVisible } from "../../stores/Status";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isLoading: false,
      query: "",
      pictographs: [],
      limitToShowShadow: 18
    };
  }

  componentWillMount() {
    Store.subscribe(() => {
      const statusStore = Store.getState().status;
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        isVisible: statusStore.isSearchVisible,
        pictographs: pictographsStore.pictographs,
        isLoading: pictographsStore.isLoading
      });
    });
  }

  /**
   * Obtains pictographs when search is submit.
   * @param {Object} event DOM Object.
   */
  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      pictographs: []
    });
    Store.dispatch(getPictographs(this.state.query));
  }

  /**
   * Refreshes query when its changed.
   * @param {Object} event DOM Object.
   */
  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  /**
   * Adds an image to the canvas when it is clicked.
   * @param {Object} pictograph Pictograph to add to the canvas.
   */
  handleImageClick(pictograph) {
    addImage(pictograph.image.url);
    Store.dispatch(setIsSearchVisible(false));
  }

  render() {
    const resultsDOM = this.state.pictographs.map(pictograph => {
      return (
        <div key={pictograph.id} className="column is-2">
          <a
            onClick={event => this.handleImageClick(pictograph)}
            className="image is-square pd-search--pictograph"
          >
            <img src={pictograph.image.url} />
          </a>
        </div>
      );
    });
    const loadingDOM = <div className="column">Cargando...</div>;
    const hasShadow = this.state.pictographs > this.state.limitToShowShadow;

    return (
      <div
        className={`pd-search tile is-ancestor is-vertical ${this.state
          .isVisible && "pd-search__visible"}`}
      >
        <div className="tile is-parent">
          <div className="tile is-child box">
            <p className="title">Search pictographs</p>
            <form
              className="field has-addons"
              onSubmit={event => this.handleSubmit(event)}
            >
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Casa"
                  onChange={event => this.handleChange(event)}
                  value={this.state.query}
                />
              </div>
              <div className="control">
                <input
                  type="submit"
                  className="button is-primary"
                  value="Search"
                />
              </div>
            </form>
            <div
              className={`pd-search--results ${hasShadow &&
                "pd-search--results__shadowed"}`}
            >
              <div className="columns">
                {this.state.isLoading ? loadingDOM : resultsDOM}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
