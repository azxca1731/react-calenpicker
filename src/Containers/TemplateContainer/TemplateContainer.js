import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector } from "Containers/Provider";
import Template from "Components/Template";

const TemplateContainer = props => <Template {...props} />;

TemplateContainer.propTypes = {
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.TemplateCssObject
}))(TemplateContainer);
