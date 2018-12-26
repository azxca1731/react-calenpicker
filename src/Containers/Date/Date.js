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

  componentDidMount() {}

  setClassName() {
    let className;
    const { weekNumber, dateObjectArray, day } = this.props;
    if (dateObjectArray.length > 0) {
      const DatePropsDay = dateObjectArray[weekNumber * 7 + day - 1];
      if (day % 6 !== 1) {
        className = style.Date_day;
      } else if (day == 1) {
        className = style.Date__sun;
      } else {
        className = style.Date__sat;
      }
      if (!DatePropsDay.isInThisMonth) {
        className = className + " " + style.Date__past;
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
    const { dateObjectArray, periodStart, weekNumber, day } = this.props;
    if (
      dateObjectArray.length > 0 &&
      periodStart &&
      dateObjectArray[weekNumber * 7 + day - 1].dateString === periodStart
    ) {
      return (
        <div className={style.Date__periodStart}>
          {dateObjectArray[weekNumber * 7 + day - 1].dayNumber}
        </div>
      );
    }
  }

  handleEnd() {
    const { dateObjectArray, periodEnd, weekNumber, day } = this.props;
    if (
      dateObjectArray.length > 0 &&
      periodEnd &&
      dateObjectArray[weekNumber * 7 + day - 1].dateString === periodEnd
    ) {
      return (
        <div className={style.Date__periodEnd}>
          {dateObjectArray[weekNumber * 7 + day - 1].dayNumber}
        </div>
      );
    }
  }

  render() {
    const {
      weekNumber,
      dateObjectArray,
      day,
      onlyThisMonth,
      objectSetText
    } = this.props;

    if (dateObjectArray.length > 0) {
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
    return (
      <td className={this.handleInPeriod()} onClick={this.handleDateClick}>
        <div className={this.setClassName()}>
          {dateObjectArray.length > 0 &&
          (dateObjectArray[weekNumber * 7 + day - 1].isInThisMonth ||
            !onlyThisMonth)
            ? dateObjectArray[weekNumber * 7 + day - 1].dayNumber
            : ""}
          <div className={style.Date__text}>
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
  periodEnd: PropTypes.string
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
    periodEnd: state.periodEnd
  }))(Date)
);
