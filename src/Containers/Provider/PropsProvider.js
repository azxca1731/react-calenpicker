import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: PropsConsumer } = Context;

class PropsProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    sizeOption: this.props.sizeOption,
    duplicate: this.props.duplicate,
    duplicated: this.props.duplicated,
    onlyThisMonth: this.props.onlyThisMonth,
    canMouseWheel: this.props.canMouseWheel,
    canUpdateDate: this.props.canUpdateDate,
    addText: this.props.addText,
    triggerState: "UNIFIED",
    customElements: this.props.customElements
  };

  actions = {
    /**
     * @function setTriggerState - 캘린터 트리거 세팅
     * @param trigger - 트리거 종류 one of ["UNIFIED", "START", "END"]
     * @returns {void}
     */
    setTriggerState: trigger => {
      this.setState({
        triggerState: trigger
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.objectSetText != this.state.objectSetText) {
      this.props.scheduleListener(this.state.objectSetText);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { triggerState } = nextProps;
    return { triggerState };
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

PropsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  sizeOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  ]),
  duplicate: PropTypes.bool,
  duplicated: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  addText: PropTypes.bool,
  canMouseWheel: PropTypes.bool,
  canUpdateDate: PropTypes.bool,
  scheduleListener: PropTypes.func,
  triggerState: PropTypes.string,
  customElements: PropTypes.element
};

const PropsConnector = createUseConsumer(PropsConsumer);
export { PropsProvider, PropsConsumer, PropsConnector };
