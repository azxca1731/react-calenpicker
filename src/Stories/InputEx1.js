import React, { Component } from "react";
import Calendar from "../Calendar";
// import styled from "styled-components";

// const MonthDiv = styled.div`
//   color: ${props => props.theme.fontColor};
//   font-size: 150%;
//   background-color:0 ${props => props.theme.backgroundColor};
// `;

// const Month = props => {
//   const { cssObject, month } = props;
//   return <MonthDiv style={cssObject}>{month}</MonthDiv>;

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
  };
  btnShow = "yyyy-mm-dd";
  handleBtnShow = (periodStart, periodEnd) => {
    if (periodStart == "") {
      this.btnShow = "yyyy-mm-dd";
    } else if (periodStart == periodEnd) {
      this.btnShow = periodStart;
    } else {
      this.btnShow = periodStart + " ~ " + periodEnd;
    }
  };

  render() {
    return (
      <div>
        <input type="button" onClick={this.handleCalendarShow} value={this.btnShow} style={cssObject} />
        {/* <input onClick={this.handleCalendarShow} value={this.state.periods.periodStart} /> */}
        <div style={this.state.turn ? {} : { display: "none" }}>
          <Calendar callbackFunction={periods => this.handlePeriods(periods[0])} sizeOption="md" theme="light" />
        </div>
      </div>
    );
  }
}

export default InputEx1;
