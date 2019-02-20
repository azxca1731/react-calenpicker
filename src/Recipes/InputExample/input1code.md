```javascript
import React, { Component } from "react";
import Calendar from "../../Calendar";
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
  vertical-align: baseline;
  float: left;
`;

const InputEx1Div2 = styled.div`
  display: table;
  table-layout: fixed;
  height: 100%;
  width: 100%;
`;

const InputEx1Str = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgb(72, 72, 72);
`;

const InputEx1BtnContent = styled.div`
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue",
    sans-serif;
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

const InputEx1Input = styled.input`
  background-color: transparent;
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 17px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  padding: 0px;
  height: 25px;
`;

const InputEx1SearchBtn = styled.button`
  display: inline-block;
  width: 76px;
  height: 75px;
  padding: 23px;
  color: #ffffff;
  background: #ff5a5f;
  border: 1px solid #ff5a5f;
  border-radius: 5px;
  text-align: center;
  margin-left: 10px;
`;

const RecipeBorder = styled.div`
  border: 1px solid #ebebeb;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  };
  btnShow = "yyyy-mm-dd";
  handleBtnShow = (periodStart, periodEnd) => {
    let tempStart = periodStart.split("-");
    let tempEnd = periodEnd.split("-");
    if (periodStart == "") {
      this.btnShow = "yyyy-mm-dd";
    } else if (periodStart == periodEnd) {
      this.btnShow = tempStart[1] + "월 " + tempStart[2] + "일";
      this.setState({ turn: !this.state.turn });
    } else if (periodStart && periodEnd) {
      this.btnShow =
        tempStart[1] +
        "월 " +
        tempStart[2] +
        "일" +
        " - " +
        tempEnd[1] +
        "월 " +
        tempEnd[2] +
        "일";
      if (periodEnd != "") {
        this.setState({ turn: !this.state.turn });
      }
    }
  };

  render() {
    return (
      <RecipeBorder>
        <InputEx1Div1 style={{ width: "200px" }}>
          <InputEx1Str>목적지</InputEx1Str>
          <InputEx1Input placeholder="서울, 대한민국" />
        </InputEx1Div1>

        <InputEx1Div1
          style={this.state.turn ? { width: "240px" } : { width: "180px" }}
        >
          <InputEx1Div2>
            <InputEx1Str>날짜</InputEx1Str>
            <div>
              <InputEx1Btn type="button" onClick={this.handleCalendarShow}>
                <InputEx1BtnContent>{this.btnShow}</InputEx1BtnContent>
              </InputEx1Btn>
            </div>
          </InputEx1Div2>
        </InputEx1Div1>
        <InputEx1Div1 style={{ width: "100px" }}>
          <InputEx1Str>인원</InputEx1Str>
          <InputEx1Input placeholder="6명" />
        </InputEx1Div1>
        <InputEx1SearchBtn>
          <InputEx1Str style={{ color: "white" }}>검색</InputEx1Str>
        </InputEx1SearchBtn>

        <div
          style={
            this.state.turn
              ? { position: "relative", right: "-200px" }
              : { display: "none" }
          }
        >
          <Calendar
            callbackFunction={periods => this.handlePeriods(periods[0])}
            sizeOption="md"
            theme="light"
          />
        </div>
      </RecipeBorder>
    );
  }
}

export default InputEx1;
```
