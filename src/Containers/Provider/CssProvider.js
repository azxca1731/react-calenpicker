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

  static getDerivedStateFromProps(props) {
    if (typeof props.sizeOption === "string") {
      const templateCssObject = {};
      switch (props.sizeOption) {
        case "sm":
          templateCssObject.width = "200px";
          templateCssObject.height = "35vh";
          templateCssObject.fontSize = "10px";
          break;
        case "md":
          templateCssObject.width = "300px";
          templateCssObject.height = "50vh";
          templateCssObject.fontSize = "16px";
          break;
        case "lg":
          templateCssObject.width = "400px";
          templateCssObject.height = "65vh";
          break;
      }
      return { templateCssObject };
    } else if (typeof props.sizeOption === "object") {
      return { templateCssObject: props.sizeOption };
    }
  }

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
  ]).isRequired,
  sizeOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string
    })
  ])
};

const CssConnector = createUseConsumer(CssConsumer);
export { CssProvider, CssConsumer, CssConnector };
