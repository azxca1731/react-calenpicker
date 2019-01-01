import React from "react";
import PropTypes from "prop-types";

import { PropsConnector, CssConnector } from "Containers/Provider";
import TemplateDark from "Components/Template/TemplateDark";
import TemplateLight from "Components/Template/TemplateLight";

const TemplateContainer = props => {
  const { theme, ...sendprops } = props;
  if (theme == "light") {
    return <TemplateLight {...sendprops} />;
  } else {
    return <TemplateDark {...sendprops} />;
  }
};

TemplateContainer.propTypes = {
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.TemplateCssObject
  }))(TemplateContainer)
);
