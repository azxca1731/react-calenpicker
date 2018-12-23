import React from "react";
import PropTypes from "prop-types";
import style from "./Date.style";
import { DayConnector } from "../../Containers/DateProvider";

class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  shouldComponentUpdate(nextProps) {
    if (nextProps.dateObjectArray === this.props.dateObjectArray) return false;
    return true;
  }

  render() {
    const { weekNumber, dateObjectArray, day, dateClicked } = this.props;
    return (
      <td className={style.Date} onClick={()=>dateClicked(weekNumber * 7 + day - 1)}>
        <span
          className={
            day % 6 !== 1
              ? style.Date_day
              : day === 1
                ? style.Date__sun
                : style.Date__sat
          }
        >
          {dateObjectArray.length > 0
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
  dateClicked: PropTypes.func
};

export default DayConnector(({ state, actions }) => ({
  dateObjectArray: state.dateObjectArray,
  dateClicked: actions.handleDateClicked
}))(Date);
