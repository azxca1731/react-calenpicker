import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ArrowUp from "Styles/icons/ArrowUp";
import ArrowDoubleUp from "Styles/icons/ArrowDoubleUp";
import ArrowDown from "Styles/icons/ArrowDown";
import Modify from "Styles/icons/Modify";
import Close from "Styles/icons/Close";

const DateCardDiv = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.fontColor};
  height: ${props => props.height}px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10px 0px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.fontColor};
`;

const DateCardConfig = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
  margin: 4px 0px;
`;

const DateCardText = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  margin-top: 5px;
`;

const DateCardBody = styled.div`
  font-weight: bold;
  color: ${props => (props.isHoliday ? "red" : props.theme.fontColor)};
`;

const DateCard = props => {
  return (
    <DateCardDiv height={props.height}>
      <DateCardText>
        <DateCardBody isHoliday={props.isHoliday}>{props.text}</DateCardBody>
        <div>
          {props.index}/{props.dateLength}
        </div>
      </DateCardText>
      <DateCardConfig>
        <ArrowDoubleUp />
        <ArrowUp />
        <ArrowDown />
        <Modify />
        <Close onClick={props.handleDelete} />
      </DateCardConfig>
    </DateCardDiv>
  );
};

DateCard.defaultProps = {
  text: "",
  height: 100,
  isHoliday: false,
  index: 1,
  dateLength: 1,
  handleDelete: () => {}
};

DateCard.propTypes = {
  text: PropTypes.string,
  height: PropTypes.number,
  isHoliday: PropTypes.bool,
  index: PropTypes.number,
  dateLength: PropTypes.number,
  handleDelete: PropTypes.func
};

export default DateCard;
