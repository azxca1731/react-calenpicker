import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import light from "../Styles/theme/light";
import dark from "../Styles/theme/dark";

import TemplateContainer from "Containers/TemplateContainer";
import CalendarHead from "Containers/CalendarHead";
import CalendarBody from "Containers/CalendarBody";
import { DateProvider, PropsProvider, CssProvider } from "Containers/Provider";

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
    const theme =
      this.props.theme && this.props.theme === "light" ? light : dark;
    return (
      <ThemeProvider theme={theme}>
        <AppProvider contexts={[DateProvider, CssProvider]} {...props}>
          <AppProvider contexts={[PropsProvider]} {...props}>
            <TemplateContainer head={<CalendarHead />}>
              <CalendarBody />
            </TemplateContainer>
          </AppProvider>
          {props.duplicate ? (
            <AppProvider contexts={[PropsProvider]} {...props} duplicated>
              <TemplateContainer head={<CalendarHead />}>
                <CalendarBody />
              </TemplateContainer>
            </AppProvider>
          ) : null}
        </AppProvider>
      </ThemeProvider>
    );
  }
}

Calendar.defaultProps = {
  callbackFunction: () => {},
  objectSetText: [],
  sizeOption: "md",
  theme: "light"
};

Calendar.propTypes = {
  theme: PropTypes.string,
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
