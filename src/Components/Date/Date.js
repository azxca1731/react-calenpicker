import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import startImg from "Styles/assets/start-period.png";
import endImg from "Styles/assets/end-period.png";

const DateTd = styled.td`
  display: inline-block;
  padding-left: 0.3%;
  padding-right: 0.3%;
  width: 13.6%;
  height: 100%;
  text-align: center;
  position: relative;
  font-weight: bold;
  background-color: ${props => (props.isInPeriod ? props.theme.secondaryColor : props.theme.backgroundColor)};
`;

const DateDiv = styled.div`
  color: ${props => {
    const { isHoliday, isToday, dayNumber, isSaturday } = props;
    if (dayNumber == 0 || isHoliday) return props.theme.holidayColor;
    else if (isToday) return props.theme.todayColor;
    else if (isSaturday) return props.theme.saturdayColor;
    else return props.theme.fontColor;
  }};
  opacity: ${props => (props.isInThisMonth ? 1 : 0.3)};
`;

export const DateTextDiv = styled.div`
  width: inherit;
  height: 100%;
  justify-content: center;
  overflow-x: hidden;
  font-size: 80%;
`;

const DateDayNumberDiv = styled.div`
  margin-bottom: 20%;
`;

const EndPointDiv = styled.div`
  height: 100%;
  background: url(${props => props.img}) no-repeat;
  background-size: 100% 100%;
`;

const StartIndicator = props => (
  <EndPointDiv img={startImg}>
    <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
    <DateTextDiv>시작</DateTextDiv>
  </EndPointDiv>
);

const EndIndicator = props => (
  <EndPointDiv img={endImg}>
    <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
    <DateTextDiv>끝</DateTextDiv>
  </EndPointDiv>
);

const DateIndicator = props => (
  <DateDiv isHoliday={props.isHoliday} isToday={props.isToday} isInThisMonth={props.isInThisMonth} isSaturday={props.isSaturday} dayNumber={props.dayNumber}>
    <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
    <DateTextDiv>{props.text}</DateTextDiv>
  </DateDiv>
);

const SelectIndicator = props => (
  <DateDiv isHoliday={props.isHoliday} isToday={props.isToday} isInThisMonth={props.isInThisMonth} isSaturday={props.isSaturday} dayNumber={props.dayNumber}>
    <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
    <DateTextDiv>{props.text ? props.text : "선택"}</DateTextDiv>
  </DateDiv>
);

const Date = props => {
  const { isInPeriod, dayNumber, isHoliday, isInThisMonth, isToday, isSaturday, cssObject, text, indicatorType, handleDateClick } = props;
  let contents;
  if (indicatorType == "date") {
    contents = DateIndicator({ isHoliday, isToday, isInThisMonth, isSaturday, dayNumber, text });
  } else if (indicatorType == "start") {
    contents = StartIndicator({ dayNumber });
  } else if (indicatorType == "end") {
    contents = EndIndicator({ dayNumber });
  } else {
    contents = SelectIndicator({ isHoliday, isToday, isInThisMonth, isSaturday, dayNumber, text });
  }
  return (
    <DateTd onClick={handleDateClick} style={cssObject} isInPeriod={isInPeriod}>
      {contents}
    </DateTd>
  );
};
Date.defaultProps = {
  handlers: {
    handleDateClick: () => {}
  },
  cssObject: {},
  dayNumber: 1,
  indicatorType: "date",
  isInPeriod: false,
  isInThisMonth: false
};

StartIndicator.propTypes = {
  dayNumber: PropTypes.number
};

EndIndicator.propTypes = {
  dayNumber: PropTypes.number
};

DateIndicator.propTypes = {
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isSaturday: PropTypes.bool,
  dayNumber: PropTypes.number,
  text: PropTypes.string
};

SelectIndicator.propTypes = {
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isSaturday: PropTypes.bool,
  dayNumber: PropTypes.number,
  text: PropTypes.string
};

Date.propTypes = {
  handleDateClick: PropTypes.func,
  cssObject: PropTypes.object,
  dayNumber: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.any,
  isInPeriod: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isSaturday: PropTypes.bool,
  indicatorType: PropTypes.oneOf(["date", "start", "end", "select"])
};

export default Date;
