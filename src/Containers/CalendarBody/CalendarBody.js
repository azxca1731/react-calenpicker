// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./CalendarBody.style";

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div classNameName="CalendarBody" />;
  }
}

CalendarBody.defaultProps = {};

CalendarBody.propTypes = {
  name: PropTypes.string
};

export default CalendarBody;
