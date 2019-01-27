import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const MonthDiv = styled.div`
  color: ${props => props.theme.fontColor};
  font-size: 150%;
`;

const Month = props => {
  const { cssObject, month } = props;
  return <MonthDiv style={cssObject}>{month}</MonthDiv>;
};

Month.defaultProps = {
  cssObject: {},
  month: "2018-10"
};

Month.propTypes = {
  month: PropTypes.string.isRequired,
  cssObject: PropTypes.object
};

export default Month;
