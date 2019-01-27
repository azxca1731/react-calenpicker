import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const MonthArrowDiv = styled.div`
  padding: 25px;
  cursor: pointer;
  color: ${props => props.theme.fontColor};
  font-size: 130%;
  background-color: ${props => props.theme.backgroundColor};
`;

const MonthArrow = props => {
  const { type, onClick, cssObject } = props;
  return (
    <MonthArrowDiv onClick={onClick} style={cssObject}>
      {type === "left" ? "❮" : type === "right" ? "❯" : " "}
    </MonthArrowDiv>
  );
};

MonthArrow.defaultProps = {
  type: "left",
  onClick: () => {},
  cssObject: {}
};

MonthArrow.propTypes = {
  type: PropTypes.oneOf(["left", "right", "none"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object
};

export default MonthArrow;
