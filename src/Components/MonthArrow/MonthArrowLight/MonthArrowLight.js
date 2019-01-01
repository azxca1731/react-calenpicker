import React from "react";
import PropTypes from "prop-types";
import style from "./MonthArrowLight.style";

const MonthArrowLight = props => {
  const { type, onClick, cssObject } = props;
  return (
    <div className={style.MonthArrow} onClick={onClick} style={cssObject}>
      {type === "left" ? "❮" : "❯"}
    </div>
  );
};

MonthArrowLight.defaultProps = {
  type: "left",
  onClick: () => {},
  cssObject: {}
};

MonthArrowLight.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object
};

export default MonthArrowLight;
