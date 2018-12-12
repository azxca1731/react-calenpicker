import React from "react";
import PropTypes from "prop-types";
import "./Date.style";

class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <li className="Date">{this.props.day}</li>;
  }
}

Date.defaultProps = {
  day: "1"
};

Date.propTypes = {
  day: PropTypes.string
};

export default Date;
