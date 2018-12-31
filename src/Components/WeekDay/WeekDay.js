import React from "react";
import PropTypes from "prop-types";
import { CssConnector } from "../../Containers/Provider";
import style from "./WeekDay.style.scss";

class WeekDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cssObject } = this.props;
    return (
      <thead className={style.WeekDay} style={cssObject}>
        <tr className={style.WeekDay__tr}>
          <td className={style.WeekDay__day}>Sun</td>
          <td className={style.WeekDay__day}>Mon</td>
          <td className={style.WeekDay__day}>Tue</td>
          <td className={style.WeekDay__day}>Wed</td>
          <td className={style.WeekDay__day}>Thu</td>
          <td className={style.WeekDay__day}>Fri</td>
          <td className={style.WeekDay__day}>Sat</td>
        </tr>
      </thead>
    );
  }
}

WeekDay.propTypes = {
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.WeekDayCssObject
}))(WeekDay);
