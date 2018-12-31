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
      : new Date().getFullYear(),
    month: this.props.startDate
      ? this.props.startDate.substr(5) - 1
      : new Date().getMonth(),
    dateObjectArray: [],
    duplicatedDateObjectArray: [],
    indicateToday: this.props.indicateToday,
    multiSelect: this.props.multiSelect,
    periods: []
  };

  actions = {
    setDateObjectArray: (dateObjectArray, duplicated) => {
      !duplicated
        ? this.setState({ dateObjectArray })
        : this.setState({ duplicatedDateObjectArray: dateObjectArray });
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
    handleDateClicked: dateState => {
      const { periodStart, periodEnd, multiSelect } = this.state;
      const { callbackFunction } = this.props;
      const insertDate = `${dateState.dateString}`;

      if (!periodStart) {
        this.setState({ periodStart: insertDate });
      } else if (periodStart && periodEnd) {
        if (multiSelect) {
          this.setState({ periodStart: insertDate, periodEnd: null });
        } else {
          this.setState({
            periodStart: insertDate,
            periodEnd: null,
            periods: []
          });
        }
      } else if (new Date(periodStart) <= new Date(insertDate)) {
        const periodEnd = insertDate;
        let periods;
        if (multiSelect) {
          periods = [
            ...this.state.periods.filter(
              period =>
                period.periodStart !== periodStart ||
                period.periodEnd !== periodEnd
            ),
            { periodStart, periodEnd }
          ];
        } else {
          periods = [{ periodStart, periodEnd }];
        }

        this.setState({
          periodEnd,
          periods
        });
        callbackFunction(periods);
      } else {
        this.setState({
          periodStart: insertDate,
          periodEnd: null,
          periods: []
        });
      }
    },
    isInPeriod: dateString => {
      const { periods } = this.state;
      return periods
        .map(({ periodStart, periodEnd }) => {
          if (periodStart && periodEnd) {
            if (
              new Date(periodStart) <= new Date(dateString) &&
              new Date(dateString) <= new Date(periodEnd)
            ) {
              return true;
            }
          }
          return false;
        })
        .filter(item => item).length;
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
  indicateToday: PropTypes.bool,
  multiSelect: PropTypes.bool,
  periodStart: PropTypes.string,
  periodEnd: PropTypes.string,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      periodStart: PropTypes.string,
      periodEnd: PropTypes.string
    })
  )
};

const DayConnector = createUseConsumer(DateConsumer);

export { DateProvider, DateConsumer, DayConnector };
