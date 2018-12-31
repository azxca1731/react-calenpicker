import React from "react";
import PropTypes from "prop-types";
import { CssConnector, PropsConnector } from "../../Containers/Provider";
import dark from "./WeekDay.style.dark";
import light from "./WeekDay.style.light";

class WeekDay extends React.Component {
  constructor(props) {
    super(props);
    this.style = props.theme == "light" ? light : dark;
  }

  render() {
    const { cssObject } = this.props;
    return (
      <thead className={this.style.WeekDay} style={cssObject}>
        <tr className={this.style.WeekDay__tr}>
          <td className={this.style.WeekDay__day}>Sun</td>
          <td className={this.style.WeekDay__day}>Mon</td>
          <td className={this.style.WeekDay__day}>Tue</td>
          <td className={this.style.WeekDay__day}>Wed</td>
          <td className={this.style.WeekDay__day}>Thu</td>
          <td className={this.style.WeekDay__day}>Fri</td>
          <td className={this.style.WeekDay__day}>Sat</td>
        </tr>
      </thead>
    );
  }
}

WeekDay.propTypes = {
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.WeekDayCssObject
  }))(WeekDay)
);
