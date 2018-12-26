import React from "react";
import PropTypes from "prop-types";
import style from "./Date.style";
import { DayConnector, PropsConnector } from "../Provider";

class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps) {
    if (nextProps.dateObjectArray === this.props.dateObjectArray) return false;
    return true;
  }

  setClassName() {
    const { weekNumber, dateObjectArray, day } = this.props;
    let className;
    if (day % 6 !== 1) {
      className = style.Date_day;
    } else if (day == 1) {
      className = style.Date__sun;
    } else {
      className = style.Date__sat;
    }
    if (
      dateObjectArray.length > 0 &&
      !dateObjectArray[weekNumber * 7 + day - 1].isInThisMonth
    ) {
      className = className + " " + style.Date__past;
    }

    return className;
  }

  render() {
    const {
      weekNumber,
      dateObjectArray,
      day,
      dateClicked,
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

        console.log(dateObjectArray[weekNumber * 7 + day - 1]);
      } else {
        dateObjectArray[weekNumber * 7 + day - 1].text = "";
      }
    }
    return (
      <td
        className={style.Date}
        onClick={() => dateClicked(weekNumber * 7 + day - 1)}
      >
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
    dateClicked: actions.handleDateClicked
  }))(Date)
);
