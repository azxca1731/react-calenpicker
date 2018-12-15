import React from "react";
import PropTypes from "prop-types";
import "./Week.style";
import Date from "../Date/Date";

class Week extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  generateDay() {
    const day = ["1", "2", "3", "4", "5", "6", "7"];
    return day.map(item => <Date key={item} />);
  }

  render() {
    return (
      <tr className="Week">
        <Date weekNumber={this.props.weekNumber} day="Sun" />
        <Date weekNumber={this.props.weekNumber} day="Mon" />
        <Date weekNumber={this.props.weekNumber} day="Tue" />
        <Date weekNumber={this.props.weekNumber} day="Wed" />
        <Date weekNumber={this.props.weekNumber} day="Thu" />
        <Date weekNumber={this.props.weekNumber} day="Fri" />
        <Date weekNumber={this.props.weekNumber} day="Sat" />
      </tr>
    );
  }
}

Week.defaultProps = {};

Week.propTypes = {
  weekNumber: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

export default Week;
