import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: PropsConsumer } = Context;

class PropsProvider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      width: props.width,
      height: props.height,
      themeColor: props.themeColor,
      animation: props.animation,
      duplicate: props.duplicate,
      onlyThisMonth: props.onlyThisMonth,
      couldSelectPrevDate: props.couldSelectPrevDate
    };
  }

  actions = {};

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

PropsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  themeColor: PropTypes.string,
  animation: PropTypes.bool,
  duplicate: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  couldSelectPrevDate: PropTypes.bool
};

const PropsConnector = createUseConsumer(PropsConsumer);
export { PropsProvider, PropsConsumer, PropsConnector };
