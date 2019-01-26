import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DateTD = styled.td`
  display: inline-block;
  padding-left: 0.3%;
  padding-right: 0.3%;
  width: 13.6%;
  height: 100%;
  text-align: center;
  position: relative;
  font-weight: bold;
  background-color: ${props => (props.isInPeriod ? props.theme.secondaryColor : "white")};
`;

const DateDIV = styled.div`
  color: ${props => {
    const { isHoliday, isToday, dayNumber, isSaturday } = props;
    if (dayNumber == 0 || isHoliday) return props.theme.holidayColor;
    else if (isToday) return props.theme.todayColor;
    else if (isSaturday) return props.theme.saturdayColor;
    else return props.theme.fontColor;
  }};
  opacity: ${props => (props.isInThisMonth ? 1 : 0.3)};
`;

export const DateTextDIV = styled.div`
  width: inherit;
  height: 100%;
  justify-content: center;
  overflow-x: hidden;
  font-size: 80%;
`;

const Date = props => {
  const { handleDateClick } = props.handlers;
  const { isInPeriod, dayNumber, isHoliday, isInThisMonth, isToday, isSaturday } = props;
  return (
    <DateTD onClick={handleDateClick} style={props.cssObject} isInPeriod={isInPeriod}>
      <DateDIV isHoliday={isHoliday} isToday={isToday} isInThisMonth={isInThisMonth} isSaturday={isSaturday} dayNumber={dayNumber}>
        {props.dayNumber}
        <DateTextDIV>{props.text}</DateTextDIV>
        {props.children}
      </DateDIV>
    </DateTD>
  );
};

Date.propTypes = {
  handlers: PropTypes.shape({
    handleDateClick: PropTypes.func,
    handleStart: PropTypes.func,
    handleEnd: PropTypes.func
  }),
  classNames: PropTypes.string,
  cssObject: PropTypes.object,
  dayNumber: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.node,
  isInPeriod: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isSaturday: PropTypes.bool
};

export default Date;
