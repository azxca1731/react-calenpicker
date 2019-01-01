import React from "react";
import PropTypes from "prop-types";
import style from "./TemplateLight.style.scss";

const TemplateLight = props => {
  const { head, children, cssObject } = props;
  return (
    <div className={style.Template} style={cssObject}>
      {head}
      <div className={style.Template__devider} />
      {children}
    </div>
  );
};

TemplateLight.defaultProps = {
  cssObject: {}
};

TemplateLight.propTypes = {
  head: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  cssObject: PropTypes.object
};
export default TemplateLight;
