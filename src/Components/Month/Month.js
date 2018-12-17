import React from "react";
import PropTypes from "prop-types";
import "./Month.style";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { month } = this.props;
    return <div className="Month">{month}</div>;
  }
}

Month.defaultProps = {};

Month.propTypes = {
  month: PropTypes.string.isRequired
};

export default Month;
