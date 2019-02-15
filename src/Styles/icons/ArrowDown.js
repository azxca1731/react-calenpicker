import React from "react";
import PropTypes from "prop-types";

const SVG = ({ style = {}, fill = "#000", width = "100%", viewBox = "0 0 1792 1792" }) => (
  <svg width={width} style={style} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    <path fill={fill} d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
  </svg>
);

SVG.propTypes = {
  style: PropTypes.object,
  fill: PropTypes.string,
  width: PropTypes.string,
  viewBox: PropTypes.string
};

export default SVG;
