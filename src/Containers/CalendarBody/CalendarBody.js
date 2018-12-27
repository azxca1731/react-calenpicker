import React from "react";
import PropTypes from "prop-types";
import style from "./CalendarBody.style";

import WeekDay from "../../Components/WeekDay/WeekDay";
import Week from "../../Components/Week/Week";
import { DayConnector, PropsConnector } from "../Provider";

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  calculateMonth = () => {
    const { duplicated } = this.props;
    const propMonth = new Date(this.props.month);
    const month = duplicated
      ? new Date(propMonth.getFullYear(), propMonth.getMonth() + 1, 1)
      : new Date(propMonth.getFullYear(), propMonth.getMonth(), 1);
    const today = month;
    const currentMonthFirstDay = new Date(
      today.getFullYear(),
      today.getMonth()
    );
    const previousMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );
    const currentMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const dateObjectArray = [];
    let count = 0;

    for (let i = 1; i <= currentMonthFirstDay.getDay(); i++) {
      dateObjectArray.push({
        dayNumber:
          previousMonthLastDay.getDate() - currentMonthFirstDay.getDay() + i,
        dateString: `${previousMonthLastDay.getFullYear()}-${previousMonthLastDay.getMonth() +
          1}-${previousMonthLastDay.getDate() -
          currentMonthFirstDay.getDay() +
          i}`,
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
        dateString: `${nextMonth.getFullYear()}-${nextMonth.getMonth() +
          1}-${i}`,
        text: ""
      });
      count++;
    }

    return dateObjectArray;
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.month !== this.props.month) return true;
    else return false;
  }

  render() {
    const { setDateObjectArray, duplicated } = this.props;

    setDateObjectArray(this.calculateMonth(), duplicated);
    return (
      <div className={style.CalendarBody}>
        <table className={style.CalendarBody__table}>
          <WeekDay />
          <tbody className={style.CalendarBody__tbody}>
            <Week weekNumber={0} />
            <Week weekNumber={1} />
            <Week weekNumber={2} />
            <Week weekNumber={3} />
            <Week weekNumber={4} />
            <Week weekNumber={5} />
          </tbody>
        </table>
      </div>
    );
  }
}

CalendarBody.propTypes = {
  month: PropTypes.string.isRequired,
  setDateObjectArray: PropTypes.func.isRequired,
  duplicated: PropTypes.bool
};

export default PropsConnector(({ state }) => ({
  duplicated: state.duplicated
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}-${state.month + 1}`,
    setDateObjectArray: actions.setDateObjectArray
  }))(CalendarBody)
);
