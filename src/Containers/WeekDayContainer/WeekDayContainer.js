import React from "react";
import PropTypes from "prop-types";

import { CssConnector } from "Containers/Provider";
import WeekDay from "Components/WeekDay";

const WeekDayContainer = props => <WeekDay {...props} />;

WeekDayContainer.propTypes = {
  theme: PropTypes.string
};

export default CssConnector(({ state }) => ({
  cssObject: state.WeekDayCssObject
}))(WeekDayContainer);
