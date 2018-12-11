// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./Calendar.style";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div classNameName="Calendar">
        <div className="month">
          <ul>
            <li className="prev">&#10094;</li>
            <li className="next">&#10095;</li>
            <li>
              August
              <br />
              <span>2017</span>
            </li>
          </ul>
        </div>
        <table>
          <thead className="weekdays">
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
          </thead>

          <tbody className="days">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>
              <span className="active">10</span>
            </li>
            <li>11</li>
          </tbody>
        </table>
      </div>
    );
  }
}

Calendar.defaultProps = {
  name: "Default"
};

Calendar.propTypes = {
  name: PropTypes.string
};

export default Calendar;
