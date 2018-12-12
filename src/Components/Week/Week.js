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
    return <tr className="Week">{this.generateDay()}</tr>;
  }
}

Week.defaultProps = {};

Week.propTypes = {
  name: PropTypes.string
};

export default Week;
