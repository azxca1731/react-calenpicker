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
    year: this.props.startDate ? this.props.startDate.substr(0, 4) : new Date().getFullYear(),
    month: this.props.startDate ? this.props.startDate.substr(5) - 1 : new Date().getMonth(),
    dateObjectArray: [],
    duplicatedDateObjectArray: [],
    indicateToday: this.props.indicateToday,
    multiSelect: this.props.multiSelect,
    periods: []
  };

  actions = {
    setDateObjectArray: (dateObjectArray, duplicated) => {
      !duplicated ? this.setState({ dateObjectArray }) : this.setState({ duplicatedDateObjectArray: dateObjectArray });
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
      const { periodStart, multiSelect, periods } = this.state;
      const { callbackFunction } = this.props;
      const insertDate = `${dateState.dateString}`;

      if (!periodStart) {
        this.setState({
          periodStart: insertDate,
          periods: multiSelect ? [...periods] : []
        });
      } else if (new Date(periodStart) <= new Date(insertDate)) {
        const returnvalue = multiSelect ? [...this.state.periods, { periodStart, periodEnd: insertDate }] : [{ periodStart, periodEnd: insertDate }];
        this.setState({ periodStart: null, periods: returnvalue });
        callbackFunction(returnvalue);
      } else if (new Date(periodStart) > new Date(insertDate)) {
        this.setState({
          periodStart: insertDate
        });
      }
    },
    isInPeriod: dateString => {
      const { periods } = this.state;
      const result = periods
        .map(({ periodStart, periodEnd }) => {
          if (periodStart && periodEnd) {
            if (new Date(periodStart) <= new Date(dateString) && new Date(dateString) <= new Date(periodEnd)) {
              return true;
            }
          }
          return false;
        })
        .filter(item => item == true);
      return result[0];
    },
    getTodayString: () => {
      const today = new Date();
      const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
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
