import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector } from "Containers/Provider";
import MonthArrowDark from "Components/MonthArrow/MonthArrowDark";
import MonthArrowLight from "Components/MonthArrow/MonthArrowLight";

const MonthArrowContainer = props => {
  const { theme, ...sendprops } = props;
  if (theme == "light") {
    return <MonthArrowLight {...sendprops} />;
  } else {
    return <MonthArrowDark {...sendprops} />;
  }
};

MonthArrowContainer.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.MonthArrowCssObject
  }))(MonthArrowContainer)
);
