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
    DateCssObject,
    WeekCssObject,
    TemplateCssObject,
    MonthCssObject,
    MonthArrowCssObject,
    WeekDayCssObject,
    CalendarBodyCssObject,
    CalendarHeadCssObject,
    ...otherProps
  } = otherOption;
  const dateProps = {
    timezone,
    startDate,
    callbackFunction,
    indicateToday,
    multiSelect
  };
  const cssProps = {
    sizeOption,
    DateCssObject,
    WeekCssObject,
    TemplateCssObject,
    MonthCssObject,
    MonthArrowCssObject,
    WeekDayCssObject,
    CalendarBodyCssObject,
    CalendarHeadCssObject
  };

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
      <AppProvider contexts={[DateProvider, CssProvider]} {...props}>
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
  objectSetText: [],
  sizeOption: "md"
};

Calendar.propTypes = {
  timezone: PropTypes.string,
  startDate: PropTypes.string,
  callbackFunction: PropTypes.func,
  indicateToday: PropTypes.bool,
  multiSelect: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, date: PropTypes.string })
  ),
  sizeOption: PropTypes.oneOfType([
    PropTypes.oneOf(["sm", "md", "lg"]),
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string
    })
  ]),
  DateCssObject: PropTypes.object,
  WeekCssObject: PropTypes.object,
  TemplateCssObject: PropTypes.object,
  MonthCssObject: PropTypes.object,
  MonthArrowCssObject: PropTypes.object,
  WeekDayCssObject: PropTypes.object,
  CalendarBodyCssObject: PropTypes.object,
  CalendarHeadCssObject: PropTypes.object
};

export default Calendar;
