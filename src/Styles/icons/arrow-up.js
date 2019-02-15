import React from "react";
import PropTypes from "prop-types";

const SVG = ({ style = {}, fill = "#000", width = "100%", viewBox = "0 0 12 9" }) => (
  <svg width={width} style={style} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    <path fill={fill} d="M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z" />
  </svg>
);

SVG.propTypes = {
  style: PropTypes.object,
  fill: PropTypes.string,
  width: PropTypes.string,
  viewBox: PropTypes.string
};

export default SVG;
