import React from "react";
import PropTypes from "prop-types";
import "./CalendarBody.style";
import WeekDay from "../../Components/WeekDay/WeekDay";
import Week from "../../Components/Week/Week";

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="CalendarBody">
        <table className="CalendarBody__table">
          <WeekDay />
          <tbody>
            <Week />
            <Week />
            <Week />
            <Week />
            <Week />
            <Week />
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

export default CalendarBody;
