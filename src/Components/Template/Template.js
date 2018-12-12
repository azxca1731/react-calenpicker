import React from "react";
import PropTypes from "prop-types";
import "./Template.style";

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

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

Template.defaultProps = {};

Template.propTypes = {
  head: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.object)
};

export default Template;
