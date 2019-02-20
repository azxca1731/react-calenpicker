import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import light from "Styles/theme/light";
import dark from "Styles/theme/dark";

import TemplateContainer from "Containers/TemplateContainer";
import CalendarHead from "Containers/CalendarHead";
import CalendarBody from "Containers/CalendarBody";
import {
  DateProvider,
  PropsProvider,
  CssProvider,
  ScheduleProvider
} from "Containers/Provider";

const AppProvider = props => {
  const { contexts, children, ...otherOption } = props;
  const {
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
    schedules,
    scheduleListener,
    ...otherProps
  } = otherOption;
  const dateProps = {
    startDate,
    callbackFunction,
    indicateToday,
    multiSelect
  };
  const scheduleProps = { schedules, scheduleListener };
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
      case ScheduleProvider:
        props = scheduleProps;
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

  handleTheme = () => {
    const { customTheme, theme } = this.props;
    if (customTheme) {
      if (theme === "light") {
        return { ...light, ...customTheme };
      } else {
        return { ...dark, ...customTheme };
      }
    } else if (theme === "light") {
      return light;
    } else {
      return dark;
    }
  };

  render() {
    const { props } = this;
    const theme = this.handleTheme();
    return (
      <div>
        <ThemeProvider theme={theme}>
          <AppProvider
            contexts={[DateProvider, ScheduleProvider, CssProvider]}
            {...props}
          >
            <AppProvider contexts={[PropsProvider]} {...props}>
              <TemplateContainer head={<CalendarHead />}>
                <CalendarBody />
              </TemplateContainer>
            </AppProvider>
            {props.duplicate ? (
              <AppProvider contexts={[PropsProvider]} {...props} duplicated>
                <TemplateContainer head={<CalendarHead />} duplicated>
                  <CalendarBody />
                </TemplateContainer>
              </AppProvider>
            ) : null}
          </AppProvider>
        </ThemeProvider>
      </div>
    );
  }
}

Calendar.defaultProps = {
  callbackFunction: () => {},
  scheduleListener: () => {},
  objectSetText: [],
  sizeOption: "md",
  theme: "light",
  addText: false,
  canMouseWheel: false,
  customTheme: null,
  onlyThisMonth: false,
  duplicate: false,
  multiSelect: false,
  indicateToday: false,
  canUpdateDate: false,
  triggerState: "UNIFIED",
  customElements: React.createElement("div")
};

Calendar.propTypes = {
  theme: PropTypes.string,
  customTheme: PropTypes.object,
  startDate: PropTypes.string,
  callbackFunction: PropTypes.func,
  indicateToday: PropTypes.bool,
  multiSelect: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  addText: PropTypes.bool,
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
  CalendarHeadCssObject: PropTypes.object,
  canMouseWheel: PropTypes.bool,
  canUpdateDate: PropTypes.bool,
  scheduleListener: PropTypes.func,
  triggerState: PropTypes.string,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
      isHoliday: PropTypes.bool,
      scheduleID: PropTypes.string
    })
  ),
  indicateScheduleByStick: PropTypes.bool,
  customElements: PropTypes.element
};

export default Calendar;
