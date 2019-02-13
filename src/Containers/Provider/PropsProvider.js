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
    objectSetText: this.props.objectSetText,
    addText: this.props.addText,
    canMouseWheel: this.props.canMouseWheel,
    canUpdateDate: this.props.canUpdateDate,
    modalShow: false
  };

  actions = {
    addCalendarText: newDateObject => {
      this.setState({
        objectSetText: [...this.state.objectSetText, newDateObject]
      });
    },
    handleModal: result => {
      this.setState({
        modalShow: result
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
  duplicate: PropTypes.bool,
  duplicated: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  addText: PropTypes.bool,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      isHoliday: PropTypes.bool
    })
  ),
  canMouseWheel: PropTypes.bool,
  canUpdateDate: PropTypes.bool
};

const PropsConnector = createUseConsumer(PropsConsumer);
export { PropsProvider, PropsConsumer, PropsConnector };
