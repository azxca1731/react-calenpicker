import React from "react";
import PropTypes from "prop-types";

import { CssConnector } from "Containers/Provider";
import Week from "Components/Week";

const WeekContainer = props => {
  return <Week {...props} />;
};

WeekContainer.propTypes = {
  weekNumber: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.WeekCssObject
}))(WeekContainer);
