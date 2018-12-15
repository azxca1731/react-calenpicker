import React from "react";
import PropTypes from "prop-types";
import "./CalendarBody.style";

import WeekDay from "../../Components/WeekDay/WeekDay";
import Week from "../../Components/Week/Week";
import { DayConnector } from "../DateProvider";

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
    props.setDateObjectArray(this.calculateMonth());
  }

  calculateMonth = () => {
    const today = new Date();
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

  componentDidMount() {}

  render() {
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

CalendarBody.defaultProps = {};

CalendarBody.propTypes = {
  name: PropTypes.string
};

export default DayConnector(({ actions }) => ({
  setDateObjectArray: actions.setDateObjectArray
}))(CalendarBody);
