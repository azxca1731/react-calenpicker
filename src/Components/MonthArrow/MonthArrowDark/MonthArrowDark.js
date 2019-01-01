import React from "react";
import PropTypes from "prop-types";
import style from "./MonthArrowDark.style";

const MonthArrowDark = props => {
  const { type, onClick, cssObject } = props;
  return (
    <div className={style.MonthArrow} onClick={onClick} style={cssObject}>
      {type === "left" ? "❮" : "❯"}
    </div>
  );
};

MonthArrowDark.defaultProps = {
  type: "left",
  onClick: () => {},
  cssObject: {}
};

MonthArrowDark.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object
};

export default MonthArrowDark;
