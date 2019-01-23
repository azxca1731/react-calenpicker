import React from "react";
import PropTypes from "prop-types";
const Date = props => {
  return (
    <td onClick={props.handleDateClick} style={props.cssObject} className={props.handleInPeriod()}>
      <div className={props.classNames}>
        {props.dayNumber}
        <div className={props.style["Date--text"]}>{props.text}</div>
        {props.handleStart()} {props.handleEnd()}
      </div>
    </td>
  );
};

Date.propTypes = {
  handleDateClick: PropTypes.func,
  handleStart: PropTypes.func,
  handleEnd: PropTypes.func,
  handleInPeriod: PropTypes.func,
  classNames: PropTypes.string,
  cssObject: PropTypes.object,
  dayNumber: PropTypes.string,
  text: PropTypes.text,
  style: PropTypes.any
};

export default Date;
