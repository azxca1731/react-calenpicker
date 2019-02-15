import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ArrowUp from "Styles/icons/ArrowUp";
import ArrowDoubleUp from "Styles/icons/ArrowDoubleUp";
import ArrowDown from "Styles/icons/ArrowDown";
import Modify from "Styles/icons/Modify";

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
  margin-left: 10px;
  margin-top: 5px;
`;

const DateCard = props => {
  return (
    <DateCardDiv height={props.height}>
      <DateCardText>{props.text}</DateCardText>
      <DateCardConfig>
        <ArrowDoubleUp />
        <ArrowUp />
        <ArrowDown />
        <Modify />
      </DateCardConfig>
    </DateCardDiv>
  );
};

DateCard.defaultProps = {
  text: "",
  height: 100
};

DateCard.propTypes = {
  text: PropTypes.text,
  height: PropTypes.number
};

export default DateCard;
