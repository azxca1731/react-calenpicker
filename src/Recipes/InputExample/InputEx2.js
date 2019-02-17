import React, { Component } from "react";
import Calendar from "../../Calendar";
import styled from "styled-components";

const InputEx2Div1 = styled.div`
  font-size: var(--font-form-element-font-size, 16px) !important;
  line-height: var(--font-form-element-line-height, 24px) !important;
  letter-spacing: var(--font-form-element-letter-spacing, normal) !important;
  font-family: var(--font-form-element-font-family, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif) !important;
  text-transform: var(--font-form-element-text-transform, undefined) !important;
  width: 40%;
  display: inline-block;
  margin-bottom: 15px;
`;

const InputEx2Div2 = styled.div`
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
  width: 40%;
  display: inline-block;
  margin-bottom: 15px;
`;

const InputEx2Str = styled.div`
  margin: 0px;
  word-wrap: break-word !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  line-height: 1.3333333333333333em !important;
  letter-spacing: 0.08333333333333333em !important;
  color: #484848;
`;

const InputEx2BtnContent = styled.div`
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 22px;
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
  border-color: #ebebeb;
`;
const InputEx2Input = styled.input`
  background-color: transparent !important;
  width: 100% !important;
  text-overflow: ellipsis !important;
  font-weight: 600 !important;
  font-size: 17px !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: #ebebeb !important;
  border-image: initial !important;
  margin: 0px !important;
  padding: 0px !important;
  height: 25px;
`;
const InputEx2Select = styled.select`
  border: 1px solid #ebebeb;
  border-color: var(--color-input-border, #ebebeb) !important;
  border-radius: var(--border-form-element-border-radius, 4px) !important;
  font-size: var(--font-form-element-font-size, 16px) !important;
  line-height: var(--font-form-element-line-height, 24px) !important;
  letter-spacing: var(--font-form-element-letter-spacing, normal) !important;
  font-family: var(--font-form-element-font-family, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif) !important;
  text-transform: var(--font-form-element-text-transform, undefined) !important;
  color: #484848 !important;
  padding-top: var(--spacing-form-element-vertical, 11px) !important;
  padding-bottom: var(--spacing-form-element-vertical, 11px) !important;
  font-weight: var(--font-light-font-weight, normal) !important;
  background-color: transparent !important;
  padding-left: var(--spacing-form-element-horizontal, 11px) !important;
  padding-right: var(--spacing-select-arrow, 40px) !important;
  diplay: block;
  width: 100%;
`;

const InputEx2SearchBtn = styled.button`
  width: 100%;
  height: 50px !important;

  color: #ffffff !important;
  background: #ff5a5f !important;
  border: 1px solid #ff5a5f !important;
  border-radius: 5px !important;
  text-align: center !important;
`;

class InputEx2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: false,
      periods: { periodStart: "", periodEnd: "" },
      trigger: "UNIFIED"
    };
  }

  handleCalendarShow = trigger => {
    this.setState({ turn: !this.state.turn, trigger });
  };

  handlePeriods = periods => {
    const { trigger } = this.state;
    let turn = false;
    let newTrigger;
    if (trigger === "START" && !periods.periodEnd) {
      turn = true;
      newTrigger = "END";
    }
    if (trigger === "END" && !periods.periodEnd) {
      turn = true;
      newTrigger = "START";
    }
    this.setState({ periods, turn, trigger: newTrigger });
  };

  render() {
    return (
      <div>
        <InputEx2Div2 style={{ width: "80%" }}>
          <InputEx2Str>목적지</InputEx2Str>
          <InputEx2Input />{" "}
        </InputEx2Div2>

        <InputEx2Div2>
          <InputEx2Str>체크 인</InputEx2Str>

          <InputEx2Btn type="button" onClick={() => this.handleCalendarShow("START")}>
            <InputEx2BtnContent>{this.state.periods.periodStart}</InputEx2BtnContent>
          </InputEx2Btn>
        </InputEx2Div2>
        <InputEx2Div2>
          <InputEx2Str>체크 아웃</InputEx2Str>

          <InputEx2Btn type="button" onClick={() => this.handleCalendarShow("END")}>
            <InputEx2BtnContent>{this.state.periods.periodEnd}</InputEx2BtnContent>
          </InputEx2Btn>
        </InputEx2Div2>

        <div style={this.state.turn ? (this.state.trigger === "START" ? { position: "absolute", width: "80%" } : { position: "absolute", width: "80%", right: "-20%" }) : { display: "none" }}>
          <Calendar
            callbackFunction={periods => this.handlePeriods(periods[0])}
            sizeOption="md"
            theme="light"
            objectSetText={[{ text: "final", date: "2019-2-27" }, { text: "test", date: "2019-2-11" }]}
            addText
            canUpdateDate
            triggerState={this.state.trigger}
          />
        </div>

        <InputEx2Div1>
          <InputEx2Str>어른</InputEx2Str>

          <InputEx2Select>
            <option>성인 1명</option>
            <option>성인 2명</option>
            <option>성인 3명</option>
            <option>성인 4명</option>
          </InputEx2Select>
        </InputEx2Div1>

        <InputEx2Div1>
          <InputEx2Str>어린이</InputEx2Str>
          <InputEx2Select>
            <option>어린이 1명</option>
            <option>어린이 2명</option>
            <option>어린이 3명</option>
            <option>어린이 4명</option>
          </InputEx2Select>
        </InputEx2Div1>
        <InputEx2Div1 style={{ width: "80%" }}>
          <InputEx2SearchBtn>
            <InputEx2Str style={{ color: "white" }}>검색</InputEx2Str>
          </InputEx2SearchBtn>
        </InputEx2Div1>
      </div>
    );
  }
}

export default InputEx2;
