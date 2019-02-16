import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Icon = styled.svg`
  fill: ${props => props.theme.fontColor};
  cursor: pointer;
`;

const SVG = ({ style = {}, width = "15px", viewBox = "0 0 1792 1792", onClick = () => {} }) => (
  <div onClick={onClick}>
    <Icon width={width} style={style} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <path d="M1344 960v-128q0-26-19-45t-45-19h-256v-256q0-26-19-45t-45-19h-128q-26 0-45 19t-19 45v256h-256q-26 0-45 19t-19 45v128q0 26 19 45t45 19h256v256q0 26 19 45t45 19h128q26 0 45-19t19-45v-256h256q26 0 45-19t19-45zm320-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
    </Icon>
  </div>
);

SVG.propTypes = {
  style: PropTypes.object,
  width: PropTypes.string,
  viewBox: PropTypes.string,
  onClick: PropTypes.func
};

export default SVG;
