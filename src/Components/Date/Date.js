import React from "react";
import PropTypes from "prop-types";
import "./Date.style";
import { DayConnector } from "../../Containers/DateProvider";

class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { weekNumber, dateObjectArray, day } = this.props;
    return (
      <td className="Date">
        {/* {dateObjectArray.length > 0
          ? dateObjectArray[weekNumber * day - 1]
          : null} */}
        {dateObjectArray.length > 0
          ? dateObjectArray[weekNumber * 7 + day - 1].dayNumber
          : ""}
      </td>
    );
  }
}

Date.defaultProps = {
  day: "1"
};

Date.propTypes = {
  weekNumber: PropTypes.number,
  day: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7])
};

export default DayConnector(({ state }) => ({
  dateObjectArray: state.dateObjectArray
}))(Date);
