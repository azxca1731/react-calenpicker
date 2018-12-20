import React from "react";
import style from "./WeekDay.style";

class WeekDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <thead className={style.WeekDay}>
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

export default WeekDay;
