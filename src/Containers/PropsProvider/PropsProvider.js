import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: PropsConsumer } = Context;

class PropsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 300,
      height: 300,
      cssObject: {},
      themeColor: "Greeny",
      animation: false,
      duplicate: false,
      onlyThisMonth: false,
      couldSelectPrevDate: false
    };
  }

  actions = {};

  render() {
    const { state, actions } = this;
    const value = { state, actions }
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

PropsProvider.PropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  cssObject: PropTypes.shape({
    
  })
}
export default PropsProvider;
