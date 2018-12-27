import React from "react";
import PropTypes from "prop-types";

import Template from "../Components/Template";
import CalendarHead from "../Containers/CalendarHead";
import CalendarBody from "../Containers/CalendarBody";
import { DateProvider, PropsProvider } from "../Containers/Provider";

const AppProvider = props => {
  const { contexts, children, ...otherOption } = props;
  const {
    timezone,
    startDate,
    callbackFunction,
    indicateToday,
    multiSelect,
    ...otherProps
  } = otherOption;
  const dateProps = {
    timezone,
    startDate,
    callbackFunction,
    indicateToday,
    multiSelect
  };

  return contexts.reduce(
    (prev, context) =>
      React.createElement(
        context,
        context.name === "DateProvider" ? dateProps : otherProps,
        prev
      ),
    children
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <AppProvider contexts={[DateProvider]} {...props}>
        <AppProvider contexts={[PropsProvider]} {...props}>
          <Template head={<CalendarHead />}>
            <CalendarBody />
          </Template>
        </AppProvider>
        {props.duplicate ? (
          <AppProvider contexts={[PropsProvider]} {...props} duplicated>
            <Template head={<CalendarHead />}>
              <CalendarBody />
            </Template>
          </AppProvider>
        ) : null}
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
  )
};

export default Calendar;
