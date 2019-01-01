import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector } from "Containers/Provider";
import MonthDark from "Components/Month/MonthDark";
import MonthLight from "Components/Month/MonthLight";

const MonthContainer = props => {
  if (props.theme == "light") {
    return <MonthLight style={props.cssObject} month={props.month} />;
  } else {
    return <MonthDark style={props.cssObject} month={props.month} />;
  }
};

MonthContainer.propTypes = {
  month: PropTypes.string.isRequired,
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.MonthCssObject
  }))(MonthContainer)
);
