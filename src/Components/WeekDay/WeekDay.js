import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const WeekDayThead = styled.thead`
  display: block;
  height: 10%;
  width: 100%;
  color: ${props => props.theme.fontColor};
`;
const WeekDayTr = styled.tr`
  display: block;
  width: 100%;
`;

const WeekDayTd = styled.td`
  display: inline-block;
  padding: 1vh 0.3%;
  width: 13.6%;
  text-align: center;
`;

const WeekDayDark = props => {
  const { cssObject } = props;
  return (
    <WeekDayThead style={cssObject}>
      <WeekDayTr>
        <WeekDayTd>Sun</WeekDayTd>
        <WeekDayTd>Mon</WeekDayTd>
        <WeekDayTd>Tue</WeekDayTd>
        <WeekDayTd>Wed</WeekDayTd>
        <WeekDayTd>Thu</WeekDayTd>
        <WeekDayTd>Fri</WeekDayTd>
        <WeekDayTd>Sat</WeekDayTd>
      </WeekDayTr>
    </WeekDayThead>
  );
};

WeekDayDark.propTypes = {
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default WeekDayDark;
