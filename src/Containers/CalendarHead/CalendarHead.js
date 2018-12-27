import React from "react";
import PropTypes from "prop-types";
import style from "./CalendarHead.style";

import Month from "../../Components/Month/Month";
import MonthArrow from "../../Components/MonthArrow";
import { DayConnector, PropsConnector } from "../Provider";

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      month: propsMonth,
      duplicated,
      showNextMonth,
      showPreviousMonth
    } = this.props;

    let month;
    if (duplicated) {
      month = new Date(propsMonth);
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      month = `${month.getFullYear()}-${month.getMonth() + 1}`;
    } else {
      month = propsMonth;
    }
    return (
      <div className={style.CalendarHead}>
        <MonthArrow type="left" onClick={showPreviousMonth} />
        <Month month={month} />
        <MonthArrow type="right" onClick={showNextMonth} />
      </div>
    );
  }
}

CalendarHead.propTypes = {
  month: PropTypes.string.isRequired,
  showNextMonth: PropTypes.func.isRequired,
  showPreviousMonth: PropTypes.func.isRequired,
  duplicated: PropTypes.bool
};

export default PropsConnector(({ state }) => ({
  duplicated: state.duplicated
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}.${state.month + 1}`,
    showPreviousMonth: actions.decreaseMonth,
    showNextMonth: actions.increaseMonth
  }))(CalendarHead)
);
