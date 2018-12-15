import React from "react";
import PropTypes from "prop-types";
import "./Date.style";
import { DayConnector } from "../../Containers/DateProvider";

class Date extends React.Component {
  constructor(props) {
    super(props);
    props.getDayToDate();
    this.state = {
      day: props.getDayToDate()
    };
  }

  componentDidMount() {}

  render() {
    return <li className="Date">{this.state.day.dayNumber}</li>;
  }
}

Date.defaultProps = {
  day: "1"
};

Date.propTypes = {
  weekNumber: PropTypes.number,
  day: PropTypes.oneOf(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
};

export default DayConnector(({ actions }) => ({
  getDayToDate: actions.getDayToDate
}))(Date);
