import React from "react";
import PropTypes from "prop-types";
import { CssConnector, PropsConnector } from "../../Containers/Provider";
import dark from "./MonthArrow.style.dark";
import light from "./MonthArrow.style.light";

class MonthArrow extends React.Component {
  constructor(props) {
    super(props);
    this.style = props.theme == "light" ? light : dark;
  }

  render() {
    const { type, onClick, cssObject } = this.props;
    return (
      <div
        className={this.style.MonthArrow}
        onClick={onClick}
        style={cssObject}
      >
        {type === "left" ? "❮" : "❯"}
      </div>
    );
  }
}

MonthArrow.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.MonthArrowCssObject
  }))(MonthArrow)
);
