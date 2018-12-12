// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./Calendar.style";

import Template from "../Components/Template";
import CalendarHead from "../Containers/CalendarHead";
import CalendarBody from "../Containers/CalendarBody";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Template head={<CalendarHead />}>
        <CalendarBody />
      </Template>
    );
  }
}

Calendar.defaultProps = {
  name: "Default"
};

Calendar.propTypes = {
  name: PropTypes.string
};

export default Calendar;
