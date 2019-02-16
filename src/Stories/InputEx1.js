import React, { Component } from "react";
import Calendar from "../Calendar";
import styled from "styled-components";

const InputEx1Div1 = styled.div`
  padding-top: 16px;
  padding-bottom: 14px;
  background: #ffffff;
  display: table-cell;
  border: 1px solid #ebebeb;
  -webkit-transition: width 250ms;
  -moz-transition: width 250ms;
  transition: width 250ms;
  vertical-align: middle;
`;

const InputEx1Div2 = styled.div`
  display: table;
  table-layout: fixed;
  height: 100%;
  width: 100%;
`;

const InputEx1Date = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: rgb(72, 72, 72);
`;

const InputEx1BtnContent = styled.div`
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.44444em;
  color: rgb(72, 72, 72);
  margin: 0px;
`;

const InputEx1Btn = styled.button`
  background: none;
  border: none;
  padding: 0px;
  overflow: hidden;
  text-align: left;
  white-space: nowrap;
  width: 100%;
`;

class InputEx1 extends Component {
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
  btnShow = "yyyy-mm-dd";
  handleBtnShow = (periodStart, periodEnd) => {
    if (periodStart == "") {
      this.btnShow = "yyyy-mm-dd";
    } else if (periodStart == periodEnd) {
      this.btnShow = periodStart;
    } else {
      this.btnShow = periodStart + " - " + periodEnd;
    }
  };

  render() {
    return (
      <div style={this.state.turn ? { width: "240px" } : { width: "150px" }}>
        <InputEx1Div1>
          <InputEx1Div2>
            <InputEx1Date>Date</InputEx1Date>
            <div>
              <InputEx1Btn type="button" onClick={this.handleCalendarShow}>
                <InputEx1BtnContent>{this.btnShow}</InputEx1BtnContent>
              </InputEx1Btn>
            </div>
          </InputEx1Div2>
        </InputEx1Div1>
        <div style={this.state.turn ? {} : { display: "none" }}>
          <Calendar callbackFunction={periods => this.handlePeriods(periods[0])} sizeOption="md" theme="light" />
        </div>
      </div>
    );
  }
}

export default InputEx1;
