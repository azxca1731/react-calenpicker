import React, { Component, createContext } from "react";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: DateConsumer } = Context;

class DateProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dateObjectArray: []
  };

  actions = {
    setDateObjectArray: dateObjectArray => {
      console.log(dateObjectArray);
      this.setState({ dateObjectArray });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const DayConnector = createUseConsumer(DateConsumer);

export { DateProvider, DateConsumer, DayConnector };
