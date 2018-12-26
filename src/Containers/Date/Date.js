import React from "react";
import PropTypes from "prop-types";
import style from "./Date.style";
import { DayConnector, PropsConnector } from "../Provider";

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.handleInPeriod = this.handleInPeriod.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  state = {
    today: this.props.getTodayString()
  };

  componentDidMount() {}

  setClassName() {
    let className;
    const { weekNumber, dateObjectArray, day, indicateToday } = this.props;
    const { today } = this.state;
    if (dateObjectArray.length > 0) {
      const DatePropsDay = dateObjectArray[weekNumber * 7 + day - 1];
      if (day % 6 !== 1) {
        className = style["Date--day"];
      } else if (day == 1) {
        className = style["Date--sun"];
      } else {
        className = style["Date--sat"];
      }
      if (!DatePropsDay.isInThisMonth) {
        className += ` ${style["Date--past"]}`;
      }
      if (indicateToday && DatePropsDay.dateString == today) {
        className += ` ${style["Date--today"]}`;
      }
    }

    return className;
  }

  handleDateClick() {
    const { weekNumber, day, dateClicked, dateObjectArray } = this.props;
    if (
      dateObjectArray.length > 0 &&
      dateObjectArray[weekNumber * 7 + day - 1].isInThisMonth
    ) {
      dateClicked(weekNumber * 7 + day - 1);
    }
  }

  handleInPeriod() {
    let className = style.Date;
    const { dateObjectArray, weekNumber, day, isInPeriod } = this.props;
    if (dateObjectArray.length > 0) {
      const dateObject = dateObjectArray[weekNumber * 7 + day - 1];
      if (isInPeriod(dateObject.dateString))
        className += ` ${style["Date--periodSelect"]}`;
    }
    return className;
  }

  handleStart() {
    const {
      dateObjectArray,
      periodStart,
      weekNumber,
      day,
      periods
    } = this.props;

    if (dateObjectArray.length > 0) {
      if (
        (periodStart &&
          dateObjectArray[weekNumber * 7 + day - 1].dateString ===
            periodStart) ||
        (periods.length > 0 &&
          periods.filter(
            ({ periodStart }) =>
              periodStart ===
              dateObjectArray[weekNumber * 7 + day - 1].dateString
          ).length > 0)
      ) {
        return (
          <div className={style.Date__periodStart}>
            {dateObjectArray[weekNumber * 7 + day - 1].dayNumber}
          </div>
        );
      }
    }
  }

  handleEnd() {
    const { dateObjectArray, periodEnd, weekNumber, day, periods } = this.props;

    if (dateObjectArray.length > 0) {
      if (
        (periodEnd &&
          dateObjectArray[weekNumber * 7 + day - 1].dateString === periodEnd) ||
        (periods.length > 0 &&
          periods.filter(
            ({ periodEnd }) =>
              periodEnd === dateObjectArray[weekNumber * 7 + day - 1].dateString
          ).length > 0)
      ) {
        return (
          <div className={style.Date__periodEnd}>
            {dateObjectArray[weekNumber * 7 + day - 1].dayNumber}
          </div>
        );
      }
    }
  }

  render() {
    const {
      weekNumber,
      dateObjectArray,
      day,
      onlyThisMonth,
      objectSetText,
      indicateToday
    } = this.props;
    const { today } = this.state;
    if (dateObjectArray.length > 0) {
      if (indicateToday) {
        if (today == dateObjectArray[weekNumber * 7 + day - 1].dateString)
          dateObjectArray[weekNumber * 7 + day - 1].text = "오늘";
      } else {
        const pos = objectSetText
          .map(item => item.date)
          .indexOf(dateObjectArray[weekNumber * 7 + day - 1].dateString);
        if (pos !== -1) {
          dateObjectArray[weekNumber * 7 + day - 1].text =
            objectSetText[pos].text;
        } else {
          dateObjectArray[weekNumber * 7 + day - 1].text = "";
        }
      }
    }
    return (
      <td className={this.handleInPeriod()} onClick={this.handleDateClick}>
        <div className={this.setClassName()}>
          {dateObjectArray.length > 0 &&
          (dateObjectArray[weekNumber * 7 + day - 1].isInThisMonth ||
            !onlyThisMonth)
            ? dateObjectArray[weekNumber * 7 + day - 1].dayNumber
            : ""}
          <div className={style["Date--text"]}>
            {dateObjectArray.length > 0
              ? dateObjectArray[weekNumber * 7 + day - 1].text
              : ""}
          </div>
          {this.handleStart()}
          {this.handleEnd()}
        </div>
      </td>
    );
  }
}

Date.defaultProps = {
  day: "1"
};

Date.propTypes = {
  weekNumber: PropTypes.number.isRequired,
  day: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]).isRequired,
  dateObjectArray: PropTypes.array.isRequired,
  dateClicked: PropTypes.func,
  onlyThisMonth: PropTypes.bool,
  isInPeriod: PropTypes.func,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.date
    })
  ),
  periodStart: PropTypes.string,
  periodEnd: PropTypes.string,
  getTodayString: PropTypes.func,
  indicateToday: PropTypes.bool,
  multiSelect: PropTypes.bool,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      periodStart: PropTypes.string,
      periodEnd: PropTypes.string
    })
  )
};

export default PropsConnector(({ state }) => ({
  onlyThisMonth: state.onlyThisMonth,
  objectSetText: state.objectSetText
}))(
  DayConnector(({ state, actions }) => ({
    dateObjectArray: state.dateObjectArray,
    dateClicked: actions.handleDateClicked,
    isInPeriod: actions.isInPeriod,
    periodStart: state.periodStart,
    periodEnd: state.periodEnd,
    getTodayString: actions.getTodayString,
    indicateToday: state.indicateToday,
    multiSelect: state.multiSelect,
    periods: state.periods
  }))(Date)
);
