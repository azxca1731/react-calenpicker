import React from "react";
import PropTypes from "prop-types";
import "./WeekDay.style";

class WeekDay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <thead className="WeekDay">
        <li className="WeekDay__day">Sun</li>
        <li className="WeekDay__day">Mon</li>
        <li className="WeekDay__day">Tue</li>
        <li className="WeekDay__day">Wed</li>
        <li className="WeekDay__day">Thu</li>
        <li className="WeekDay__day">Fri</li>
        <li className="WeekDay__day">Sat</li>
      </thead>
    );
  }
}

WeekDay.defaultProps = {};

WeekDay.propTypes = {
  name: PropTypes.string
};

export default WeekDay;
