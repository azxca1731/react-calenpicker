import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: CssConsumer } = Context;

class CssProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    DateCssObject: this.props.DateCssObject,
    WeekCssObject: this.props.WeekCssObject,
    TemplateCssObject: this.props.TemplateCssObject,
    MonthCssObject: this.props.MonthCssObject,
    MonthArrowCssObject: this.props.MonthArrowCssObject,
    WeekDayCssObject: this.props.WeekDayCssObject,
    CalendarBodyCssObject: this.props.CalendarBodyCssObject,
    CalendarHeadCssObject: this.props.CalendarHeadCssObject
  };

  actions = {};

  static getDerivedStateFromProps(props, state) {
    if (typeof props.sizeOption === "string") {
      const sizeCssObject = {};
      switch (props.sizeOption) {
        case "sm":
          sizeCssObject.width = "200px";
          sizeCssObject.height = "300px";
          sizeCssObject.fontSize = "10px";
          break;
        case "md":
          sizeCssObject.width = "300px";
          sizeCssObject.height = "450px";
          sizeCssObject.fontSize = "14px";
          break;
        case "lg":
          sizeCssObject.width = "400px";
          sizeCssObject.height = "600px";
          break;
      }
      return {
        TemplateCssObject: {
          ...state.TemplateCssObject,
          ...sizeCssObject
        }
      };
    } else if (typeof props.sizeOption === "object") {
      return {
        TemplateCssObject: {
          ...state.TemplateCssObject,
          ...props.sizeOption
        }
      };
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

CssProvider.defaultProps = {
  DateCssObject: {},
  WeekCssObject: {},
  TemplateCssObject: {
    width: "300px",
    height: "450px",
    fontSize: "14px"
  },
  MonthCssObject: {},
  MonthArrowCssObject: {},
  WeekDayCssObject: {},
  CalendarBodyCssObject: {},
  CalendarHeadCssObject: {},
  sizeOption: "md",
  children: null
};

CssProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  sizeOption: PropTypes.oneOfType([
    PropTypes.string,
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

const CssConnector = createUseConsumer(CssConsumer);
export { CssProvider, CssConsumer, CssConnector };
