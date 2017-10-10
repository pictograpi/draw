import React, { Component } from "react";
import Store from "../../stores/Store";
import { setFontFamily } from "../../stores/Status";

export default class FontFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      fontFamilies: Store.getState().status.availableFontFamilies
    };
  }

  handleFontFamilyChange(event) {
    Store.dispatch(setFontFamily(event.target.value));
  }

  componentWillMount() {
    Store.subscribe(() => {
      const statusStore = Store.getState().status;
      const selectedForm = statusStore.selectedForm || undefined;
      const isEllipse = selectedForm && selectedForm.type === "ellipse";
      const isRect = selectedForm && selectedForm.type === "rect";
      const isLine = selectedForm && selectedForm.type === "line";

      this.setState({
        isDisabled: !statusStore.isEditing || isEllipse || isRect || isLine,
        fontFamilies: statusStore.availableFontFamilies
      });
    });
  }

  render() {
    const fontsDOM = this.state.fontFamilies.map((fontFamily, index) =>
      <option key={index} value={fontFamily}>
        {fontFamily}
      </option>
    );

    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select is-small">
            <select
              disabled={this.state.isDisabled}
              onChange={this.handleFontFamilyChange}
            >
              {fontsDOM}
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className="fa fa-text-height" />
          </div>
        </div>
      </div>
    );
  }
}
