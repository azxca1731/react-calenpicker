import React from "react";
import PropTypes from "prop-types";
import style from "./Date.style";
import { DayConnector, PropsConnector, CssConnector } from "../Provider";

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
    today: this.props.getTodayString(),
    dateString: "",
    dayNumber: 0,
    isInThisMonth: false
  };

  static getDerivedStateFromProps(props, state) {
    const {
      weekNumber,
      day,
      objectSetText,
      duplicated,
      duplicatedDateObjectArray,
      indicateToday
    } = props;
    const dateObjectArray = duplicated
      ? duplicatedDateObjectArray
      : props.dateObjectArray;
    if (dateObjectArray.length > 0) {
      const target = dateObjectArray[weekNumber * 7 + day - 1];
      const dateString = target.dateString;
      const isInThisMonth = target.isInThisMonth;
      let text, isHoliday;
      if (state.today === dateString && indicateToday) {
        text = "오늘";
      } else {
        const filtered = objectSetText.filter(item => {
          return item.date === dateString;
        });
        text = filtered.length > 0 ? filtered[0].text : "";
        isHoliday = filtered.length > 0 ? filtered[0].isHoliday : false;
      }
      const dayNumber = target.dayNumber;
      return { dateString, text, dayNumber, isInThisMonth, isHoliday };
    }
    return null;
  }

  componentDidMount() {}

  setClassName() {
    let className;
    const { day, indicateToday, onlyThisMonth } = this.props;
    const { today, dateString, isInThisMonth, isHoliday } = this.state;
    if (day % 6 !== 1) {
      className = isHoliday ? style["Date--sun"] : style["Date--day"];
    } else if (day == 1) {
      className = style["Date--sun"];
    } else {
      className = style["Date--sat"];
    }
    if (!isInThisMonth) {
      className += ` ${style["Date--past"]}`;
    }
    if (indicateToday && dateString == today) {
      className += ` ${style["Date--today"]}`;
    }
    if (onlyThisMonth && !isInThisMonth) {
      className = style["Date--notThisMonth"];
    }
    return className;
  }

  handleDateClick() {
    const { dateClicked } = this.props;
    const { isInThisMonth } = this.state;
    if (isInThisMonth) {
      dateClicked(this.state);
    }
  }

  handleInPeriod() {
    let className = style.Date;
    const { isInPeriod } = this.props;
    const { dateString } = this.state;
    if (isInPeriod(dateString)) {
      className += ` ${style["Date--periodSelect"]}`;
    }
    return className;
  }

  handleStart() {
    const { periodStart, periods } = this.props;

    const { dateString, dayNumber } = this.state;

    if (
      (periodStart && dateString === periodStart) ||
      (periods.length > 0 &&
        periods.filter(({ periodStart }) => periodStart === dateString).length >
          0)
    ) {
      return <div className={style.Date__periodStart}>{dayNumber}</div>;
    }
  }

  handleEnd() {
    const { periodEnd, periods } = this.props;
    const { dateString, dayNumber } = this.state;
    if (
      (periodEnd && dateString === periodEnd) ||
      (periods.length > 0 &&
        periods.filter(({ periodEnd }) => periodEnd === dateString).length > 0)
    ) {
      return <div className={style.Date__periodEnd}>{dayNumber}</div>;
    }
  }

  render() {
    const { cssObject } = this.props;
    const { text, dayNumber } = this.state;
    return (
      <td
        className={this.handleInPeriod()}
        onClick={this.handleDateClick}
        style={cssObject}
      >
        <div className={this.setClassName()}>
          {dayNumber}
          <div className={style["Date--text"]}>{text}</div>
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
  ),
  duplicated: PropTypes.bool,
  duplicatedDateObjectArray: PropTypes.array,
  cssObject: PropTypes.object
};

export default PropsConnector(({ state }) => ({
  onlyThisMonth: state.onlyThisMonth,
  objectSetText: state.objectSetText,
  duplicated: state.duplicated
}))(
  DayConnector(({ state, actions }) => ({
    dateObjectArray: state.dateObjectArray,
    duplicatedDateObjectArray: state.duplicatedDateObjectArray,
    dateClicked: actions.handleDateClicked,
    isInPeriod: actions.isInPeriod,
    periodStart: state.periodStart,
    periodEnd: state.periodEnd,
    getTodayString: actions.getTodayString,
    indicateToday: state.indicateToday,
    multiSelect: state.multiSelect,
    periods: state.periods
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.DateCssObject
    }))(Date)
  )
);
