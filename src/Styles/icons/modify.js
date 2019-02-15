import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Icon = styled.svg`
  fill: ${props => props.theme.fontColor};
  cursor: pointer;
`;

const SVG = ({ style = {}, width = "15px", viewBox = "0 0 1792 1792" }) => (
  <Icon width={width} style={style} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    <path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z" />
  </Icon>
);

SVG.propTypes = {
  style: PropTypes.object,
  width: PropTypes.string,
  viewBox: PropTypes.string
};

export default SVG;
