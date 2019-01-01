import React from "react";
import PropTypes from "prop-types";
import style from "./WeekDayLight.style";

const WeekDayLight = props => {
  const { cssObject } = props;
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
};

WeekDayLight.propTypes = {
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default WeekDayLight;
