import React from "react";
import PropTypes from "prop-types";
import style from "./CalendarHead.style";

import Month from "../../Components/Month/Month";
import MonthArrow from "../../Components/MonthArrow";
import { DayConnector, PropsConnector, CssConnector } from "../Provider";

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      month: propsMonth,
      duplicated,
      duplicate,
      showNextMonth,
      showPreviousMonth
    } = this.props;

    let month;
    if (duplicated) {
      month = new Date(propsMonth);
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      month = `${month.getFullYear()}.${month.getMonth() + 1}`;
    } else {
      month = propsMonth;
    }
    return (
      <div>
        {!duplicate ? (
          <div className={style.CalendarHead}>
            <MonthArrow type="left" onClick={showPreviousMonth} />
            <Month month={month} />
            <MonthArrow type="right" onClick={showNextMonth} />
          </div>
        ) : !duplicated ? (
          <div className={style.CalendarHead}>
            <MonthArrow type="left" onClick={showPreviousMonth} />
            <Month month={month} />
            <div />
          </div>
        ) : (
          <div className={style.CalendarHead}>
            <div />
            <Month month={month} />
            <MonthArrow type="right" onClick={showNextMonth} />
          </div>
        )}
      </div>
    );
  }
}

CalendarHead.propTypes = {
  month: PropTypes.string.isRequired,
  showNextMonth: PropTypes.func.isRequired,
  showPreviousMonth: PropTypes.func.isRequired,
  duplicated: PropTypes.bool,
  duplicate: PropTypes.bool,
  cssObject: PropTypes.object
};

export default PropsConnector(({ state }) => ({
  duplicated: state.duplicated,
  duplicate: state.duplicate
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}.${state.month + 1}`,
    showPreviousMonth: actions.decreaseMonth,
    showNextMonth: actions.increaseMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.CalendarHeadCssObject
    }))(CalendarHead)
  )
);
