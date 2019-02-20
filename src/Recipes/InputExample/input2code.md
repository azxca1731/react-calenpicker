```javascript
import React, { Component } from "react";
import Calendar from "react-calenpicker";
import styled from "styled-components";

const InputEx2Div1 = styled.div`
  line-height: var(--font-form-element-line-height, 24px);
  letter-spacing: var(--font-form-element-letter-spacing, normal);
  text-transform: var(--font-form-element-text-transform, undefined);
  width: 40%;
  display: inline-block;
  margin-top: 15px;
`;

const InputEx2Div2 = styled.div`
  border: 1px solid #ebebeb;
  line-height: var(--font-form-element-line-height, 24px);
  letter-spacing: var(--font-form-element-letter-spacing, normal);
  text-transform: var(--font-form-element-text-transform, undefined);
  color: var(--font-form-element-color, #484848);
  border-color: var(--color-input-border, #ebebeb);
  border-radius: var(--border-form-element-border-radius, 4px);
  background-color: var(--color-input-background, #ffffff);
  width: 40%;
  display: inline-block;
  margin-top: 15px;
`;

const InputEx2Str = styled.div`
  margin: 0px;
  word-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica
      Neue, sans-serif;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.3333333333333333em;
  letter-spacing: 0.08333333333333333em;
  color: #484848;
`;

const InputEx2BtnContent = styled.div`
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue",
    sans-serif;
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
  background-color: transparent;
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 17px;
  border-width: 0px;
  border-style: initial;
  border-color: #ebebeb;
  border-image: initial;
  margin: 0px;
  padding: 0px;
  height: 25px;
`;
const InputEx2Select = styled.select`
  border: 1px solid #ebebeb;
  border-color: var(--color-input-border, #ebebeb);
  border-radius: var(--border-form-element-border-radius, 4px);
  font-size: var(--font-form-element-font-size, 16px);
  line-height: var(--font-form-element-line-height, 24px);
  letter-spacing: var(--font-form-element-letter-spacing, normal);
  font-family: var(
    --font-form-element-font-family,
    Circular,
    -apple-system,
    BlinkMacSystemFont,
    Roboto,
    Helvetica Neue,
    sans-serif
  );
  text-transform: var(--font-form-element-text-transform, undefined);
  color: #484848;
  padding-top: var(--spacing-form-element-vertical, 11px);
  padding-bottom: var(--spacing-form-element-vertical, 11px);
  font-weight: var(--font-light-font-weight, normal);
  background-color: transparent;
  padding-left: var(--spacing-form-element-horizontal, 11px);
  padding-right: var(--spacing-select-arrow, 40px);
  display: block;
  width: 100%;
`;

const InputEx2SearchBtn = styled.button`
  width: 100%;
  height: 50px;
  color: #ffffff;
  background: #ff5a5f;
  border: 1px solid #ff5a5f;
  border-radius: 5px;
  text-align: center;
`;

const RecipeBorder = styled.div`
  border: 1px solid #ebebeb;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
      <RecipeBorder>
        <InputEx2Div2 style={{ width: "80%" }}>
          <InputEx2Str>목적지</InputEx2Str>
          <InputEx2Input placeholder="서울, 대한민국" />
        </InputEx2Div2>

        <InputEx2Div2>
          <InputEx2Str>체크 인</InputEx2Str>

          <InputEx2Btn
            type="button"
            onClick={() => this.handleCalendarShow("START")}
          >
            <InputEx2BtnContent>
              {this.state.periods.periodStart}
            </InputEx2BtnContent>
          </InputEx2Btn>
        </InputEx2Div2>
        <InputEx2Div2>
          <InputEx2Str>체크 아웃</InputEx2Str>

          <InputEx2Btn
            type="button"
            onClick={() => this.handleCalendarShow("END")}
          >
            <InputEx2BtnContent>
              {this.state.periods.periodEnd}
            </InputEx2BtnContent>
          </InputEx2Btn>
        </InputEx2Div2>

        <div
          style={
            this.state.turn
              ? this.state.trigger === "START"
                ? { position: "absolute", width: "80%" }
                : { position: "absolute", width: "80%", right: "-20%" }
              : { display: "none" }
          }
        >
          <Calendar
            callbackFunction={periods => this.handlePeriods(periods[0])}
            sizeOption="md"
            theme="light"
            schedules={[
              { text: "final", date: "2019-2-27" },
              {
                text: "휴가",
                date: "2019-2-11",
                isHoliday: true
              }
            ]}
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
      </RecipeBorder>
    );
  }
}

export default InputEx2;
```
