import React from "react";
import PropTypes from "prop-types";
import light from "./Date.style.light";
import dark from "./Date.style.dark";
import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.handleInPeriod = this.handleInPeriod.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.style = props.theme == "light" ? light : dark;
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
    const dateObjectArray = duplicated ? duplicatedDateObjectArray : props.dateObjectArray;
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
      className = isHoliday ? this.style["Date--sun"] : this.style["Date--day"];
    } else if (day == 1) {
      className = this.style["Date--sun"];
    } else {
      className = this.style["Date--sat"];
    }
    if (!isInThisMonth) {
      className += ` ${this.style["Date--past"]}`;
    }
    if (indicateToday && dateString == today) {
      className += ` ${this.style["Date--today"]}`;
    }
    if (onlyThisMonth && !isInThisMonth) {
      className = this.style["Date--notThisMonth"];
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
    const { isInPeriod } = this.props;
    const { dateString } = this.state;
    let className = this.style.Date;
    if (isInPeriod(dateString)) {
      className += ` ${this.style["Date__periodSelect"]}`;
    }
    return className;
  }

  handleStart() {
    const { periodStart, periods } = this.props;
    const { dateString, dayNumber } = this.state;

    for (let i = 0; i < periods.length; i++) {
      const { periodStart: ps, periodEnd: pe } = periods[i];
      if (ps == pe) {
        if (ps == dateString) return;
      } else if (ps == dateString)
        return (
          <div className={this.style.Date__periodStart}>
            <div>{dayNumber}</div>
            <div>시작</div>
          </div>
        );
    }

    if (periods.length >= 0 && periodStart == dateString) {
      return (
        <div className={this.style.Date__periodStart}>
          <div>{dayNumber}</div>
          <div>시작</div>
        </div>
      );
    }
  }

  handleEnd() {
    const { periodEnd, periods } = this.props;
    const { dateString, dayNumber } = this.state;

    for (let i = 0; i < periods.length; i++) {
      const { periodStart: ps, periodEnd: pe } = periods[i];
      if (ps === pe) {
        if (pe == dateString) return <div className={this.style["Date--text"]}>선택</div>;
      } else if (pe == dateString)
        return (
          <div className={this.style.Date__periodEnd}>
            <div>{dayNumber}</div>
            <div>끝</div>
          </div>
        );
    }

    if (periods.length == 0 && periodEnd == dateString) {
      return (
        <div className={this.style.Date__periodEnd}>
          <div>{dayNumber}</div>
          <div>끝</div>
        </div>
      );
    }
  }

  render() {
    const { cssObject } = this.props;
    const { text, dayNumber } = this.state;
    return (
      <td onClick={this.handleDateClick} style={cssObject} className={this.handleInPeriod()}>
        <div className={this.setClassName()}>
          {dayNumber}
          <div className={this.style["Date--text"]}>{text}</div>
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
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  onlyThisMonth: state.onlyThisMonth,
  objectSetText: state.objectSetText,
  duplicated: state.duplicated,
  theme: state.theme
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
