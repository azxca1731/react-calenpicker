import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Icon = styled.svg`
  fill: ${props => props.theme.fontColor};
  cursor: pointer;
`;

const SVG = ({ style = {}, width = "15px", viewBox = "0 0 1792 1792" }) => (
  <Icon width={width} style={style} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    <path d="M1395 1312q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23zm0-384q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z" />
  </Icon>
);

SVG.propTypes = {
  style: PropTypes.object,
  width: PropTypes.string,
  viewBox: PropTypes.string
};

export default SVG;
