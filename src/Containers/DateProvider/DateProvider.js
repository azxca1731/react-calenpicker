import React, { Component, createContext } from "react";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: DateConsumer } = Context;

class DateProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth(),
    dateObjectArray: []
  };

  actions = {
    setDateObjectArray: dateObjectArray => {
      console.log(dateObjectArray);
      this.setState({ dateObjectArray });
    },
    increaseMonth: () => {
      if (this.state.month === 11) {
        this.setState({
          month: 0,
          year: year + 1
        });
      } else {
        this.setState({ month: month + 1 });
      }
    },
    decreaseMonth: () => {
      if (this.state.month === 0) {
        this.setState({
          month: 11,
          year: year - 1
        });
      } else {
        this.setState({ month: month - 1 });
      }
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
