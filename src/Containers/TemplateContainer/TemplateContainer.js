import React from "react";
import PropTypes from "prop-types";

import { CssConnector, PropsConnector, DayConnector } from "Containers/Provider";
import Template from "Components/Template";

class TemplateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    if (this.props.canMouseWheel) {
      this.element.current.addEventListener("wheel", this.handleMouseEvent);
    }
  }

  componentWillUnmount() {
    if (this.props.canMouseWheel) {
      this.element.current.removeEventListener("wheel", this.handleMouseEvent);
    }
  }

  handleMouseEvent = event => {
    if (event && event.deltaY > 0) {
      this.props.increaseMonth();
    } else if (event && event.deltaY < 0) {
      this.props.decreaseMonth();
    }
  };

  render() {
    return (
      <div ref={this.element}>
        <Template {...this.props} />
      </div>
    );
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
