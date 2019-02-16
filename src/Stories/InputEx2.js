import React, { Component } from "react";
import Calendar from "../Calendar";
import styled from "styled-components";

class InputEx2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: false,
      periods: { periodStart: "", periodEnd: "" }
    };
  }
  handleCalendarShow = () => {
    this.setState({ turn: !this.state.turn });
  };

  handlePeriods = periods => {
    this.setState({ periods });
    this.handleBtnShow(periods.periodStart, periods.periodEnd);
    this.setState({ turn: !this.state.turn });
  };

  render() {
    return (
      <div {{ width: "150px" }}>
        <InputEx1Div>
          <InputEx1In>
            <InputEx1Text>Check In</InputEx1Text>
            <div>
              <InputEx1Btn type="button" onClick={this.handleCalendarShow}>
                <InputEx1BtnContent>{this.state.periods.periodStart}</InputEx1BtnContent>
              </InputEx1Btn>
            </div>
          </InputEx1DivOut>
          <InputEx1Text>Check Out</InputEx1Text>
            <div>
              <InputEx1Btn type="button" onClick={this.handleCalendarShow}>
                <InputEx1BtnContent>{this.state.periods.periodEnd}</InputEx1BtnContent>
              </InputEx1Btn>
            </div>
          </InputEx1DivOut>
        </InputEx1Div>
        <div style={this.state.turn ? {} : { display: "none" }}>
          <Calendar callbackFunction={periods => this.handlePeriods(periods[0])} sizeOption="md" theme="light" />
        </div>
      </div>
    );
  }
}

export default InputEx2;
