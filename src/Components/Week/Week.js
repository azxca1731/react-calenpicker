import React from "react";
import PropTypes from "prop-types";
import { CssConnector } from "../../Containers/Provider";
import Date from "../../Containers/Date";
import style from "./Week.style.less";

class Week extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cssObject } = this.props;
    return (
      <tr className={style.Week} style={cssObject}>
        <Date weekNumber={this.props.weekNumber} day={1} />
        <Date weekNumber={this.props.weekNumber} day={2} />
        <Date weekNumber={this.props.weekNumber} day={3} />
        <Date weekNumber={this.props.weekNumber} day={4} />
        <Date weekNumber={this.props.weekNumber} day={5} />
        <Date weekNumber={this.props.weekNumber} day={6} />
        <Date weekNumber={this.props.weekNumber} day={7} />
      </tr>
    );
  }
}

Week.propTypes = {
  weekNumber: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.WeekCssObject
}))(Week);
