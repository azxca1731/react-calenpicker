import React from "react";
import PropTypes from "prop-types";
import style from "./MonthDark.style";

const MonthDark = props => {
  const { cssObject, month } = props;
  return (
    <div className={style.Month} style={cssObject}>
      {month}
    </div>
  );
};

MonthDark.defaultProps = {
  cssObject: {},
  month: ""
};

MonthDark.propTypes = {
  month: PropTypes.string.isRequired,
  cssObject: PropTypes.object
};

export default MonthDark;
