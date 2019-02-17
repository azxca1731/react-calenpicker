import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: ScheduleConsumer } = Context;

class ScheduleProvider extends Component {
  state = {};
  actions = {};
  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

ScheduleProvider.defaultProps = {};

ScheduleProvider.propTypes = {
  children: PropTypes.node
};

const ScheduleConnector = createUseConsumer(ScheduleConsumer);
export { ScheduleProvider, ScheduleConsumer, ScheduleConnector };
