import React from "react";
import PropTypes from "prop-types";
import style from "./Month.style";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { month } = this.props;
    return <div className={style.Month}>{month}</div>;
  }
}

Month.defaultProps = {};

Month.propTypes = {
  month: PropTypes.string.isRequired
};

export default Month;
