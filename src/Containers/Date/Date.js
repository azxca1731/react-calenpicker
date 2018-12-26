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
  }

  componentDidMount() {}

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.dateObjectArray === this.props.dateObjectArray) return false;
  //   return true;
  // }

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

  render() {
    const { weekNumber, dateObjectArray, day, onlyThisMonth } = this.props;
    return (
      <td className={this.handleInPeriod()} onClick={this.handleDateClick}>
        <span className={this.setClassName()}>
          {dateObjectArray.length > 0 &&
          (dateObjectArray[weekNumber * 7 + day - 1].isInThisMonth ||
            !onlyThisMonth)
            ? dateObjectArray[weekNumber * 7 + day - 1].dayNumber
            : ""}
        </span>
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
  )
};

export default PropsConnector(({ state }) => ({
  onlyThisMonth: state.onlyThisMonth,
  objectSetText: state.objectSetText
}))(
  DayConnector(({ state, actions }) => ({
    dateObjectArray: state.dateObjectArray,
    dateClicked: actions.handleDateClicked,
    isInPeriod: actions.isInPeriod
  }))(Date)
);
