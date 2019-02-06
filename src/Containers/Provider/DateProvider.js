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
<<<<<<< Updated upstream
=======
    calculateMonth: (propMonthString, duplicated) => {
      const propMonth = new Date(propMonthString);
      const month = duplicated ? new Date(propMonth.getFullYear(), propMonth.getMonth() + 1, 1) : new Date(propMonth.getFullYear(), propMonth.getMonth(), 1);
      const today = month;
      const currentMonthFirstDay = new Date(today.getFullYear(), today.getMonth());
      const previousMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0);
      const currentMonthLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
      const dateObjectArray = [];
      let count = 0;

      for (let i = 1; i <= currentMonthFirstDay.getDay(); i++) {
        dateObjectArray.push({
          dayNumber: previousMonthLastDay.getDate() - currentMonthFirstDay.getDay() + i,
          dateString: `${previousMonthLastDay.getFullYear()}-${previousMonthLastDay.getMonth() + 1}-${previousMonthLastDay.getDate() - currentMonthFirstDay.getDay() + i}`,
          text: ""
        });
        count++;
      }

      for (let i = 1; i <= currentMonthLastDay.getDate(); i++) {
        dateObjectArray.push({
          dayNumber: i,
          dateString: `${month.getFullYear()}-${month.getMonth() + 1}-${i}`,
          text: "",
          isInThisMonth: true
        });
        count++;
      }

      for (let i = 1; count < 42; i++) {
        dateObjectArray.push({
          dayNumber: i,
          dateString: `${nextMonth.getFullYear()}-${nextMonth.getMonth() + 1}-${i}`,
          text: ""
        });
        count++;
      }

      return dateObjectArray;
    },
>>>>>>> Stashed changes
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
