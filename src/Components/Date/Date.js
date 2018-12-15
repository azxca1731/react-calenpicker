import React from "react";
import PropTypes from "prop-types";
import "./Date.style";
import { DayConnector } from "../../Containers/DateProvider";

class Date extends React.Component {
  constructor(props) {
    super(props);
    props.getDayToDate(props.weekNumber * props.day - 1);
    this.state = {
      // day: props.getDayToDate(props.weekNumber, props.day)
      day: { dayNumber: 1 }
    };
  }

  componentDidMount() {}

  render() {
    return <td className="Date">{this.state.day.dayNumber}</td>;
  }
}

Date.defaultProps = {
  day: "1"
};

Date.propTypes = {
  weekNumber: PropTypes.number,
  day: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7])
};

export default DayConnector(({ actions }) => ({
  getDayToDate: actions.getDayToDate
}))(Date);
