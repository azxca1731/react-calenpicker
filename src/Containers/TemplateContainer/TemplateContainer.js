import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { CssConnector, PropsConnector, DayConnector } from "Containers/Provider";
import Template from "Components/Template";
import { ScheduleConnector } from "../Provider/ScheduleProvider";

const TemplateContainerDiv = styled.div`
  display: inline;
  position: relative;
`;

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
      <TemplateContainerDiv ref={this.element}>
        <Template {...this.props} />
      </TemplateContainerDiv>
    );
  }
}

TemplateContainer.propTypes = {
  cssObject: PropTypes.object,
  decreaseMonth: PropTypes.func,
  increaseMonth: PropTypes.func,
  canMouseWheel: PropTypes.bool,
  duplicate: PropTypes.bool,
  duplicated: PropTypes.bool,
  handleModal: PropTypes.func,
  addText: PropTypes.bool
};

let wrapper = CssConnector(({ state }) => ({
  cssObject: state.TemplateCssObject
}))(TemplateContainer);

wrapper = DayConnector(({ actions }) => ({
  decreaseMonth: actions.decreaseMonth,
  increaseMonth: actions.increaseMonth
}))(wrapper);

wrapper = ScheduleConnector(({ actions }) => ({
  handleModal: actions.handleModal
}))(wrapper);

wrapper = PropsConnector(({ state }) => ({
  canMouseWheel: state.canMouseWheel,
  duplicate: state.duplicate,
  addText: state.addText
}))(wrapper);

export default wrapper;
