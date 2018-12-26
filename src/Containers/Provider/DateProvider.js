import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: DateConsumer } = Context;

class DateProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    startDate: this.props.startDate,
    year: this.props.startDate
      ? this.props.startDate.substr(0, 4)
      : new Date().getUTCFullYear(),
    month: this.props.startDate
      ? this.props.startDate.substr(5) - 1
      : new Date().getMonth(),
    dateObjectArray: [],
    indicateToday: this.props.indicateToday
  };

  actions = {
    setDateObjectArray: dateObjectArray => {
      this.setState({ dateObjectArray });
    },
    increaseMonth: () => {
      if (this.state.month === 11) {
        this.setState({
          month: 0,
          year: this.state.year * 1 + 1
        });
      } else {
        this.setState({ month: this.state.month + 1 });
      }
    },
    decreaseMonth: () => {
      if (this.state.month === 0) {
        this.setState({
          month: 11,
          year: this.state.year - 1
        });
      } else {
        this.setState({ month: this.state.month - 1 });
      }
    },
    handleDateClicked: dateObjectKey => {
      const { year, month, periodStart, dateObjectArray } = this.state;
      const { callbackFunction } = this.props;
      const insertDate = `${year}-${month + 1}-${
        dateObjectArray[dateObjectKey].dayNumber
      }`;
      if (!periodStart) {
        this.setState({ periodStart: insertDate });
      } else if (new Date(periodStart) <= new Date(insertDate)) {
        const periodEnd = `${year}-${month + 1}-${
          dateObjectArray[dateObjectKey].dayNumber
        }`;
        this.setState({
          periodEnd
        });
        callbackFunction({ periodStart, periodEnd });
      } else {
        this.setState({ periodStart: insertDate });
      }
    },
    isInPeriod: dateString => {
      const { periodStart, periodEnd } = this.state;
      if (periodStart && periodEnd) {
        if (
          new Date(periodStart) <= new Date(dateString) &&
          new Date(dateString) <= new Date(periodEnd)
        ) {
          return true;
        }
      }
      return false;
    },
    getTodayString: () => {
      const today = new Date();
      const todayString = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

      return todayString;
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

DateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  timezone: PropTypes.string,
  startDate: PropTypes.string,
  callbackFunction: PropTypes.func,
  indicateToday: PropTypes.bool
};

const DayConnector = createUseConsumer(DateConsumer);

export { DateProvider, DateConsumer, DayConnector };
