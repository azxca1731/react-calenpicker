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
        <Date weekNumber={this.props.weekNumber} day={1} />
        <Date weekNumber={this.props.weekNumber} day={2} />
        <Date weekNumber={this.props.weekNumber} day={3} />
        <Date weekNumber={this.props.weekNumber} day={4} />
        <Date weekNumber={this.props.weekNumber} day={5} />
        <Date weekNumber={this.props.weekNumber} day={6} />
        <Date weekNumber={this.props.weekNumber} day={7} />
      </tr>
    );
  }
}

Week.defaultProps = {};

Week.propTypes = {
  weekNumber: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

export default Week;
