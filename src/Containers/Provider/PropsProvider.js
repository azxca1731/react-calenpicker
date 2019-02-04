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
    theme: this.props.theme,
    animation: this.props.animation,
    duplicate: this.props.duplicate,
    duplicated: this.props.duplicated,
    onlyThisMonth: this.props.onlyThisMonth,
    couldSelectPrevDate: this.props.couldSelectPrevDate,
    objectSetText: this.props.objectSetText,
    addText: this.props.addText
  };

  actions = {
    addCalendarText: newDateObject => {
      this.setState({
        objectSetText: [...this.state.objectSetText, newDateObject]
      });
    }
  };

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
  themeColor: PropTypes.string,
  animation: PropTypes.bool,
  duplicate: PropTypes.bool,
  duplicated: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  couldSelectPrevDate: PropTypes.bool,
  addText: PropTypes.bool,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      isHoliday: PropTypes.bool
    })
  ),
  theme: PropTypes.string
};

const PropsConnector = createUseConsumer(PropsConsumer);
export { PropsProvider, PropsConsumer, PropsConnector };
