// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import "./Template.style";

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div classNameName="Template" />;
  }
}

Template.defaultProps = {};

Template.propTypes = {
  name: PropTypes.string
};

export default Template;
