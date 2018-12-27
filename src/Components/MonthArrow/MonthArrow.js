import React from "react";
import PropTypes from "prop-types";
import { CssConnector } from "../../Containers/Provider";
import style from "./MonthArrow.style";

class MonthArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, onClick, cssObject } = this.props;
    return (
      <div className={style.MonthArrow} onClick={onClick} style={cssObject}>
        {type === "left" ? "❮" : "❯"}
      </div>
    );
  }
}

MonthArrow.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.MonthArrowCssObject
}))(MonthArrow);
