import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: CssConsumer } = Context;

class CssProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  actions = {};

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

CssProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const CssConnector = createUseConsumer(CssConsumer);
export { CssProvider, CssConsumer, CssConnector };
