import React, { Component, createContext } from "react";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: DateConsumer } = Context;

class DateProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObjectArray: [{ dayNumber: 1 }]
    };
    this.actions = {
      setDateObjectArray: dateObjectArray => {
        this.setState({ dateObjectArray });
      },
      getDayToDate: (weekNumber, day) => {
        return this.state.dateObjectArray[0];
      }
    };
  }
  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const DayConnector = createUseConsumer(DateConsumer);

export { DateProvider, DateConsumer, DayConnector };
