import React from "react";
import PropTypes from "prop-types";
const Date = props => {
  const { handleDateClick } = props.handlers;
  return (
    <td onClick={handleDateClick} style={props.cssObject} className={props.Periods}>
      <div className={props.classNames}>
        {props.dayNumber}
        <div className={props.style["Date--text"]}>{props.text}</div>
        {props.children}
      </div>
    </td>
  );
};

Date.propTypes = {
  handlers: PropTypes.shape({
    handleDateClick: PropTypes.func,
    handleStart: PropTypes.func,
    handleEnd: PropTypes.func
  }),
  classNames: PropTypes.string,
  Periods: PropTypes.string,
  cssObject: PropTypes.object,
  dayNumber: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.node
};

export default Date;
