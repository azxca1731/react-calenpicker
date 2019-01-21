import React from "react";
import PropTypes from "prop-types";

import { CssConnector } from "Containers/Provider";
import Template from "Components/Template";

const TemplateContainer = props => <Template {...props} />;

TemplateContainer.propTypes = {
  theme: PropTypes.string
};

export default CssConnector(({ state }) => ({
  cssObject: state.TemplateCssObject
}))(TemplateContainer);
