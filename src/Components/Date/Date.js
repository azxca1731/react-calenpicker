// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./Date.style";

class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div classNameName="Date" />;
  }
}

Date.defaultProps = {};

Date.propTypes = {
  name: PropTypes.string
};

export default Date;
