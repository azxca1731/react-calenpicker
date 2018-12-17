import React from "react";
import PropTypes from "prop-types";
import "./Template.style";

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { head, children } = this.props;
    return (
      <div className="Template">
        {head}
        {children}
      </div>
    );
  }
}

Template.propTypes = {
  head: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Template;
