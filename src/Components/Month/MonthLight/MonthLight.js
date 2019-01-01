import React from "react";
import PropTypes from "prop-types";
import style from "./MonthLight.style";

const MonthLight = props => {
  const { cssObject, month } = props;
  return (
    <div className={style.Month} style={cssObject}>
      {month}
    </div>
  );
};

MonthLight.defaultProps = {
  cssObject: {},
  month: ""
};

MonthLight.propTypes = {
  month: PropTypes.string.isRequired,
  cssObject: PropTypes.object
};

export default MonthLight;
