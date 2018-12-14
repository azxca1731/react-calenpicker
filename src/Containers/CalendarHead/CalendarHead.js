import React from "react";
import PropTypes from "prop-types";
import "./CalendarHead.style";

import Month from "../../Components/Month/Month";

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="CalendarHead">
        <Month />
      </div>
    );
  }
}

CalendarHead.defaultProps = {};

CalendarHead.propTypes = {
  name: PropTypes.string
};

export default CalendarHead;
