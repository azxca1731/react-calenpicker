import React from "react";
import "./WeekDay.style";

class WeekDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <thead className="WeekDay">
        <tr className="WeekDay__tr">
          <td className="WeekDay__day">Sun</td>
          <td className="WeekDay__day">Mon</td>
          <td className="WeekDay__day">Tue</td>
          <td className="WeekDay__day">Wed</td>
          <td className="WeekDay__day">Thu</td>
          <td className="WeekDay__day">Fri</td>
          <td className="WeekDay__day">Sat</td>
        </tr>
      </thead>
    );
  }
}

export default WeekDay;
