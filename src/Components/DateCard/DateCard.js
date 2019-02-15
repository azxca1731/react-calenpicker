import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const DateCardConfig = styled.div``;

const DateCardText = styled.h4`
  margin-left: 10px;
`;

const DateCard = props => {
  return (
    <DateCardDiv height={props.height}>
      <DateCardText>{props.text}</DateCardText>
      <DateCardConfig />
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
