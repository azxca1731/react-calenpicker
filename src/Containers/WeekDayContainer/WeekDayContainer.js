import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector } from "Containers/Provider";
import WeekDayDark from "Components/WeekDay/WeekDayDark";
import WeekDayLight from "Components/WeekDay/WeekDayLight";

const WeekDayContainer = props => {
  const { theme, ...sendprops } = props;
  if (theme == "light") {
    return <WeekDayLight {...sendprops} />;
  } else {
    return <WeekDayDark {...sendprops} />;
  }
};

WeekDayContainer.propTypes = {
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.WeekDayCssObject
  }))(WeekDayContainer)
);
