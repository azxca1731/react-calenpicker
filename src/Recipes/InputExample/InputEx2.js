import React, { Component } from "react";
import Calendar from "../../Calendar";
import styled from "styled-components";

const InputEx2Div1 = styled.div`
  border: 1px solid #ebebeb;
  font-size: var(--font-form-element-font-size, 16px) !important;
  line-height: var(--font-form-element-line-height, 24px) !important;
  letter-spacing: var(--font-form-element-letter-spacing, normal) !important;
  font-family: var(--font-form-element-font-family, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif) !important;
  text-transform: var(--font-form-element-text-transform, undefined) !important;
  color: var(--font-form-element-color, #484848) !important;
  border-color: var(--color-input-border, #ebebeb) !important;
  border-radius: var(--border-form-element-border-radius, 4px) !important;
  background-color: var(--color-input-background, #ffffff) !important;
  width: 30%;
  height: 26px;
  display: inline-block;
  margin-right: 10px;
`;

const InputEx2Date = styled.div`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  line-height: 1.3333333333333333em !important;
  letter-spacing: 0.08333333333333333em !important;
  color: #484848 !important;
  display: inline-block;
`;

const InputEx2BtnContent = styled.div`
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.44444em;
  color: rgb(72, 72, 72);
  margin: 0px;
  width: 100%;
  height: 26px;
`;

const InputEx2Btn = styled.button`
  background: none;
  border: none;
  padding: 0px;
  overflow: hidden;
  text-align: left;
  white-space: nowrap;
  width: 100%;
  height: 26px;
`;

class InputEx2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: false,
      periods: { periodStart: "", periodEnd: "" }
    };
  }
  location = 0;
  handleCalendarShow = which => {
    this.setState({ turn: !this.state.turn });
    this.location = which;
  };

  handlePeriods = periods => {
    this.setState({ periods });
    this.setState({ turn: !this.state.turn });
  };

  render() {
    return (
      <div style={{ width: "500px" }}>
        <InputEx2Date>Check In</InputEx2Date>
        <InputEx2Div1>
          <InputEx2Btn type="button" onClick={() => this.handleCalendarShow(1)}>
            <InputEx2BtnContent>{this.state.periods.periodStart}</InputEx2BtnContent>
          </InputEx2Btn>
        </InputEx2Div1>

        <InputEx2Date>Check Out</InputEx2Date>
        <InputEx2Div1>
          <InputEx2Btn type="button" onClick={() => this.handleCalendarShow(2)}>
            <InputEx2BtnContent>{this.state.periods.periodEnd}</InputEx2BtnContent>
          </InputEx2Btn>
        </InputEx2Div1>
        <div style={this.state.turn ? (this.location == 1 ? { position: "relative", right: "-57px" } : { position: "relative", right: "-135px" }) : { display: "none" }}>
          <Calendar
            callbackFunction={periods => this.handlePeriods(periods[0])}
            sizeOption="md"
            theme="light"
            objectSetText={[{ text: "final", date: "2019-2-27" }, { text: "test", date: "2019-2-11" }]}
            addText
            canUpdateDate
          />
        </div>
      </div>
    );
  }
}

export default InputEx2;
