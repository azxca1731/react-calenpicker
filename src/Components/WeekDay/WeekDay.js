// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./WeekDay.style";

class WeekDay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div classNameName="WeekDay" />;
  }
}

WeekDay.defaultProps = {};

WeekDay.propTypes = {
  name: PropTypes.string
};

export default WeekDay;
