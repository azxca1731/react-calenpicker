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
    const CurrentMonth = [
      { dayNumber: 25 },
      { dayNumber: 26 },
      { dayNumber: 27 },
      { dayNumber: 28 },
      { dayNumber: 29 },
      { dayNumber: 30 },
      { dayNumber: 1 },
      { dayNumber: 2 },
      { dayNumber: 3 },
      { dayNumber: 4 },
      { dayNumber: 5 },
      { dayNumber: 6 },
      { dayNumber: 7 },
      { dayNumber: 8 },
      { dayNumber: 9 },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17 },
      { dayNumber: 18 },
      { dayNumber: 19 },
      { dayNumber: 20 },
      { dayNumber: 21 },
      { dayNumber: 22 },
      { dayNumber: 23 },
      { dayNumber: 24 },
      { dayNumber: 25 },
      { dayNumber: 26 },
      { dayNumber: 27 },
      { dayNumber: 28 },
      { dayNumber: 29 },
      { dayNumber: 30 },
      { dayNumber: 31 },
      { dayNumber: 1 },
      { dayNumber: 2 },
      { dayNumber: 3 },
      { dayNumber: 4 },
      { dayNumber: 5 }
    ];
    return CurrentMonth;
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
