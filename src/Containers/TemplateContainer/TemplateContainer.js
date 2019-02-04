import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector, DayConnector } from "Containers/Provider";
import Template from "Components/Template";

const TemplateContainer = props => <Template {...props} />;

TemplateContainer.propTypes = {
  cssObject: PropTypes.object
};

export default PropsConnector(({ state }) => ({
  canMouseWheel: state.canMouseWheel
}))(
  DayConnector(({ actions }) => ({
    showPreviousMonth: actions.decreaseMonth,
    showNextMonth: actions.increaseMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.TemplateCssObject
    }))(TemplateContainer)
  )
);
