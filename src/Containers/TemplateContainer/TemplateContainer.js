import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector, DayConnector } from "Containers/Provider";
import Template from "Components/Template";

class TemplateContainer extends React.Component {
  render() {
    return <Template {...this.props} />;
  }
}

TemplateContainer.propTypes = {
  cssObject: PropTypes.object,
  decreaseMonth: PropTypes.func,
  increaseMonth: PropTypes.func,
  canMouseWheel: PropTypes.bool
};

export default PropsConnector(({ state }) => ({
  canMouseWheel: state.canMouseWheel
}))(
  DayConnector(({ actions }) => ({
    decreaseMonth: actions.decreaseMonth,
    increaseMonth: actions.increaseMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.TemplateCssObject
    }))(TemplateContainer)
  )
);
