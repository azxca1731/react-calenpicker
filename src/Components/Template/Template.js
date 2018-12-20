import React from "react";
import PropTypes from "prop-types";
import style from "./Template.style";

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { head, children } = this.props;
    return (
      <div className={style.Template}>
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
