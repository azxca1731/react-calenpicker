// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./CalendarHead.style";

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div classNameName="CalendarHead" />;
  }
}

CalendarHead.defaultProps = {};

CalendarHead.propTypes = {
  name: PropTypes.string
};

export default CalendarHead;
