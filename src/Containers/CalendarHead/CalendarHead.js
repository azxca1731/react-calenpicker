import React from "react";
import PropTypes from "prop-types";
import dark from "./CalendarHead.style.dark.scss";
import light from "./CalendarHead.style.light.scss";

import Month from "Components/Month/Month";
import MonthArrow from "Components/MonthArrow";
import {
  DayConnector,
  PropsConnector,
  CssConnector
} from "Containers/Provider";

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
    this.style = props.theme == "light" ? light : dark;
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
          <div className={this.style.CalendarHead}>
            <MonthArrow type="left" onClick={showPreviousMonth} />
            <Month month={month} />
            <MonthArrow type="right" onClick={showNextMonth} />
          </div>
        ) : !duplicated ? (
          <div className={this.style.CalendarHead}>
            <MonthArrow type="left" onClick={showPreviousMonth} />
            <Month month={month} />
            <div />
          </div>
        ) : (
          <div className={this.style.CalendarHead}>
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
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  duplicated: state.duplicated,
  duplicate: state.duplicate,
  theme: state.theme
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
