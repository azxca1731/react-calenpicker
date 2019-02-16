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
    setDateObjectArray: (dateObjectArray, duplicated) => {
      !duplicated ? this.setState({ dateObjectArray }) : this.setState({ duplicatedDateObjectArray: dateObjectArray });
    },
    increaseMonth: () => {
      const { year, month, dateObjectArray, duplicatedDateObjectArray } = this.state;
      let calcedYear, calcedMonth;

      if (month === 11) {
        calcedYear = year * 1 + 1;
        calcedMonth = 0;
      } else {
        calcedYear = year;
        calcedMonth = month + 1;
      }
      const monthString = `${calcedYear}-${calcedMonth + 1}`;

      const nextState = {
        year: calcedYear,
        month: calcedMonth,
        dateObjectArray,
        duplicatedDateObjectArray
      };
      nextState.dateObjectArray = this.actions.calculateMonth(monthString, false);
      nextState.duplicatedDateObjectArray = this.actions.calculateMonth(monthString, true);
      this.setState(nextState);
    },
    decreaseMonth: () => {
      const { year, month, dateObjectArray, duplicatedDateObjectArray } = this.state;
      let calcedYear, calcedMonth;
      if (month === 0) {
        calcedYear = year - 1;
        calcedMonth = 11;
      } else {
        calcedYear = year;
        calcedMonth = month - 1;
      }
      const monthString = `${calcedYear}-${calcedMonth + 1}`;

      const nextState = {
        year: calcedYear,
        month: calcedMonth,
        dateObjectArray,
        duplicatedDateObjectArray
      };
      nextState.dateObjectArray = this.actions.calculateMonth(monthString, false);
      nextState.duplicatedDateObjectArray = this.actions.calculateMonth(monthString, true);
      this.setState(nextState);
    },
    handleDateClicked: dateState => {
      const { periodStart, multiSelect, periods } = this.state;
      const { callbackFunction } = this.props;
      const insertDate = `${dateState.dateString}`;
      let ps, newPeriods;
      if (!periodStart) {
        ps = insertDate;
        newPeriods = multiSelect ? [...periods, { periodStart: insertDate, periodEnd: "" }] : [{ periodStart: insertDate, periodEnd: "" }];
      } else if (new Date(periodStart) <= new Date(insertDate)) {
        ps = null;  
        const prevPeriod = periods.pop();
        const lastPeriod = {
          ...prevPeriod,
          periodEnd: insertDate
        };
        newPeriods = multiSelect ? [...periods, lastPeriod] : [lastPeriod];
      } else {
        ps = insertDate;
        newPeriods = [...periods];
      }

      this.setState({
        periodStart: ps,
        periods: newPeriods
      });
      callbackFunction(newPeriods);
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
