import React from "react";
import PropTypes from "prop-types";
import "./CalendarBody.style";

import WeekDay from "../../Components/WeekDay/WeekDay";
import Week from "../../Components/Week/Week";
import { DayConnector } from "../DateProvider";

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);

    props.setDateObjectArray([{ dayNumber: 1 }]);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="CalendarBody">
        <table className="CalendarBody__table">
          <WeekDay />
          <tbody>
            <Week weekNumber={1} />
            <Week weekNumber={2} />
            <Week weekNumber={3} />
            <Week weekNumber={4} />
            <Week weekNumber={5} />
            <Week weekNumber={6} />
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
