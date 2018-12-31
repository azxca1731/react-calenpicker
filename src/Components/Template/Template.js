import React from "react";
import PropTypes from "prop-types";
import { CssConnector } from "../../Containers/Provider";
import style from "./Template.style.less";

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { head, children, cssObject } = this.props;
    return (
      <div className={style.Template} style={cssObject}>
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
  ]).isRequired,
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.TemplateCssObject
}))(Template);
