import React from "react";
import PropTypes from "prop-types";
import "./CalendarHead.style";

import Month from "../../Components/Month/Month";
import MonthArrow from "../../Components/MonthArrow";
import { DayConnector } from "../DateProvider";

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { month, showNextMonth, showPreviousMonth } = this.props;
    return (
      <div className="CalendarHead">
        <MonthArrow type="left" onClick={showPreviousMonth} />
        <Month month={month} />
        <MonthArrow type="right" onClick={showNextMonth} />
      </div>
    );
  }
}

CalendarHead.defaultProps = {};

CalendarHead.propTypes = {
  name: PropTypes.string
};

export default DayConnector(({ state, actions }) => ({
  month: `${state.year}.${state.month + 1}`,
  showPreviousMonth: actions.decreaseMonth,
  showNextMonth: actions.increaseMonth
}))(CalendarHead);
