import React from "react";
import PropTypes from "prop-types";

import Template from "../Components/Template";
import CalendarHead from "../Containers/CalendarHead";
import CalendarBody from "../Containers/CalendarBody";
import {
  DateProvider,
  PropsProvider,
  CssProvider
} from "../Containers/Provider";

const AppProvider = props => {
  const { contexts, children, ...otherOption } = props;
  const {
    timezone,
    startDate,
    callbackFunction,
    indicateToday,
    multiSelect,
    sizeOption,
    ...otherProps
  } = otherOption;
  const dateProps = {
    timezone,
    startDate,
    callbackFunction,
    indicateToday,
    multiSelect
  };
  const cssProps = { sizeOption };

  return contexts.reduce((prev, context) => {
    let props;
    switch (context) {
      case DateProvider:
        props = dateProps;
        break;
      case CssProvider:
        props = cssProps;
        break;
      case PropsProvider:
        props = otherProps;
        break;
      default:
        break;
    }
    return React.createElement(context, props, prev);
  }, children);
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <AppProvider
        contexts={[DateProvider, PropsProvider, CssProvider]}
        {...props}
      >
        <Template head={<CalendarHead />}>
          <CalendarBody />
        </Template>
      </AppProvider>
    );
  }
}

Calendar.defaultProps = {
  timezone: "ko",
  callbackFunction: () => {},
  objectSetText: []
};

Calendar.propTypes = {
  timezone: PropTypes.string,
  startDate: PropTypes.string,
  callbackFunction: PropTypes.func,
  indicateToday: PropTypes.bool,
  multiSelect: PropTypes.bool,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, date: PropTypes.string })
  ),
  sizeOption: PropTypes.oneOfType([
    PropTypes.oneOf(["sm", "md", "lg"]),
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string
    })
  ])
};

export default Calendar;
