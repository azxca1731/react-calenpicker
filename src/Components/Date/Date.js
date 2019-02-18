import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import startImg from "Styles/assets/start-period.png";
import endImg from "Styles/assets/end-period.png";

const DateTd = styled.td`
  display: inline-block;
  padding: 0;
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

const DateTextDiv = styled.div`
  width: inherit;
  height: 100%;
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

const ScheduleDiv = styled.div`
  height: 5px;
  width: 100%;
  background-color: ${props => props.theme.secondaryColor};
  border: 1px solid ${props => props.theme.fontColor};
  border-right: ${props=> props.isStart ? "0" : "1px"};
  border-left: ${props=> props.isEnd ? "0" : "1px"};
  ${props => (props.isStart ? "border-radius: 5px 0 0 5px" : null)};
  ${props => (props.isEnd ? "border-radius: 0 5px 5px 0" : null)};
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

const DateIndicator = props => {
  const handleTextClicked = event => {
    const { dateString, canUpdateDate } = props;
    props.handleModal("READ", canUpdateDate);
    props.handleTargetSetValue(dateString);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <DateDiv isHoliday={props.isHoliday} isToday={props.isToday} isInThisMonth={props.isInThisMonth} isSaturday={props.isSaturday} dayNumber={props.dayNumber}>
      <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
      <DateTextDiv onClick={handleTextClicked}>{props.text}</DateTextDiv>
      {props.haveMoreDate ? <DateTextDiv onClick={handleTextClicked}>...</DateTextDiv> : null}
    </DateDiv>
  );
};

const SelectIndicator = props => (
  <DateDiv isHoliday={props.isHoliday} isToday={props.isToday} isInThisMonth={props.isInThisMonth} isSaturday={props.isSaturday} dayNumber={props.dayNumber}>
    <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
    <DateTextDiv>{props.text ? props.text : "선택"}</DateTextDiv>
  </DateDiv>
);

const ScheduleIndicator = props => {
  const handleScheduleClicked = event => {
    const { dateString, canUpdateDate } = props;
    props.handleModal("READ", canUpdateDate);
    props.handleTargetSetValue(dateString);
    event.preventDefault();
    event.stopPropagation();
  };
  const { schedules } = props;
  return (
    <DateDiv isHoliday={props.isHoliday} isToday={props.isToday} isInThisMonth={props.isInThisMonth} isSaturday={props.isSaturday} dayNumber={props.dayNumber}>
      <DateDayNumberDiv>{props.dayNumber}</DateDayNumberDiv>
      {schedules.map(({ text }, idx) => {
        return <ScheduleDiv isStart={props.isStart} isEnd={props.isEnd} key={`${text}${idx}`} onClick={handleScheduleClicked} />;
      })}
    </DateDiv>
  );
};

const Date = props => {
  const {
    isInPeriod,
    dayNumber,
    isHoliday,
    isInThisMonth,
    isToday,
    isSaturday,
    cssObject,
    text,
    indicatorType,
    handleDateClick,
    handleModal,
    dateString,
    handleTargetSetValue,
    haveMoreDate,
    canUpdateDate,
    schedules,
    scheduleIDs,
    isStart,
    isEnd
  } = props;
  let contents;
  if (indicatorType == "date") {
    contents = <DateIndicator {...{ isHoliday, isToday, isInThisMonth, isSaturday, dayNumber, text, handleModal, dateString, handleTargetSetValue, haveMoreDate, canUpdateDate }} />;
  } else if (indicatorType == "start") {
    contents = <StartIndicator {...{ dayNumber }} />;
  } else if (indicatorType == "end") {
    contents = <EndIndicator {...{ dayNumber }} />;
  } else if (indicatorType == "select") {
    contents = <SelectIndicator {...{ isHoliday, isToday, isInThisMonth, isSaturday, dayNumber, text }} />;
  } else {
    contents = (
      <ScheduleIndicator
        {...{ isHoliday, isToday, isInThisMonth, isSaturday, dayNumber, text, handleModal, dateString, handleTargetSetValue, haveMoreDate, canUpdateDate, schedules, scheduleIDs, isStart, isEnd }}
      />
    );
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

ScheduleIndicator.propTypes = {
  dayNumber: PropTypes.number,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isSaturday: PropTypes.bool,
  text: PropTypes.string,
  handleModal: PropTypes.func,
  dateString: PropTypes.string,
  handleTargetSetValue: PropTypes.func,
  haveMoreDate: PropTypes.bool,
  canUpdateDate: PropTypes.bool,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
      isHoliday: PropTypes.bool,
      scheduleID: PropTypes.string
    })
  )
};

DateIndicator.propTypes = {
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isSaturday: PropTypes.bool,
  dayNumber: PropTypes.number,
  text: PropTypes.string,
  handleModal: PropTypes.func,
  dateString: PropTypes.string,
  handleTargetSetValue: PropTypes.func,
  haveMoreDate: PropTypes.bool,
  canUpdateDate: PropTypes.bool
};

SelectIndicator.propTypes = {
  isHoliday: PropTypes.bool,
  isToday: PropTypes.bool,
  isInThisMonth: PropTypes.bool,
  isSaturday: PropTypes.bool,
  dayNumber: PropTypes.number,
  text: PropTypes.string,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool
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
  indicatorType: PropTypes.oneOf(["date", "start", "end", "select", "schedule"]),
  handleModal: PropTypes.func,
  dateString: PropTypes.string,
  handleTargetSetValue: PropTypes.func,
  haveMoreDate: PropTypes.bool,
  canUpdateDate: PropTypes.bool,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
      isHoliday: PropTypes.bool,
      scheduleId: PropTypes.string
    })
  ),
  scheduleIDs: PropTypes.arrayOf(PropTypes.string),
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool
};

export default Date;
