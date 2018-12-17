import React from "react";
import PropTypes from "prop-types";
import "./CalendarBody.style";

import WeekDay from "../../Components/WeekDay/WeekDay";
import Week from "../../Components/Week/Week";
import { DayConnector } from "../DateProvider";

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  calculateMonth = () => {
    const today = new Date(this.props.month);
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
    const dateObjectArray = [];
    let count = 0;

    for (let i = 1; i <= currentMonthFirstDay.getDay(); i++) {
      dateObjectArray.push({
        dayNumber:
          previousMonthLastDay.getDate() - currentMonthFirstDay.getDay() + i
      });
      count++;
    }

    for (let i = 1; i <= currentMonthLastDay.getDate(); i++) {
      dateObjectArray.push({
        dayNumber: i
      });
      count++;
    }

    for (let i = 1; count < 42; i++) {
      dateObjectArray.push({
        dayNumber: i
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
    this.props.setDateObjectArray(this.calculateMonth());
    return (
      <div className="CalendarBody">
        <table className="CalendarBody__table">
          <WeekDay />
          <tbody>
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
  setDateObjectArray: PropTypes.func.isRequired
};

export default DayConnector(({ state, actions }) => ({
  month: `${state.year}-${state.month + 1}`,
  setDateObjectArray: actions.setDateObjectArray
}))(CalendarBody);
