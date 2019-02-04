import React from "react";
import PropTypes from "prop-types";

import { CssConnector } from "Containers/Provider";
import MontArrow from "Components/MonthArrow";

const MonthArrowContainer = props => <MontArrow {...props} />;

MonthArrowContainer.propTypes = {
  type: PropTypes.oneOf(["left", "right", "none"]).isRequired,
  onClick: PropTypes.func.isRequired,
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.MonthArrowCssObject
}))(MonthArrowContainer);
