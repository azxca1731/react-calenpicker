import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DateContainer from "Containers/DateContainer";

const WeekTr = styled.tr`
  width: 100%;
  height: 16.6%;
  display: inline-flex;
  background-color: ${props => props.theme.backgroundColor};
`;

const Week = props => (
  <WeekTr style={props.cssObject}>
    <DateContainer weekNumber={props.weekNumber} day={1} />
    <DateContainer weekNumber={props.weekNumber} day={2} />
    <DateContainer weekNumber={props.weekNumber} day={3} />
    <DateContainer weekNumber={props.weekNumber} day={4} />
    <DateContainer weekNumber={props.weekNumber} day={5} />
    <DateContainer weekNumber={props.weekNumber} day={6} />
    <DateContainer weekNumber={props.weekNumber} day={7} />
  </WeekTr>
);

Week.defaultProps = {
  weekNumber: 0,
  cssObject: {}
};

Week.propTypes = {
  weekNumber: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
  cssObject: PropTypes.object
};

export default Week;
