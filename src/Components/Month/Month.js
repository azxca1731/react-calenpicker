import React from "react";
import PropTypes from "prop-types";
import "./Month.style";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div classNameName="Month">2018.12</div>;
  }
}

Month.defaultProps = {};

Month.propTypes = {
  name: PropTypes.string
};

export default Month;
