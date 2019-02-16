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
      <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
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
