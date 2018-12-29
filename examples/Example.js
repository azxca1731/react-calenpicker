import React from "react";

import Calendar from "../src/index";

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      periods: []
    };
    this.handleCalendar = this.handleCalendar.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  handleCalendar() {
    this.setState({ show: !this.state.show });
  }

  callbackFunction(periods) {
    this.setState({ show: true, periods });
  }

  render() {
    const { show, periods } = this.state;
    return (
      <div>
        {periods.map(({ periodStart, periodEnd }) => (
          <span key={`${periodStart}-${periodEnd}`}>
            시작: {periodStart} 끝: {periodEnd}
          </span>
        ))}
        <button onClick={this.handleCalendar}>캘린더 열기</button>
        {show ? (
          <Calendar
            callbackFunction={this.callbackFunction}
            // onlyThisMonth
            objectSetText={[
              { text: "hell", date: "2018-12-31" },
              { text: "휴가", date: "2018-12-26", isHoliday: true }
            ]}
            sizeOption="lg"
            MonthCssObject={}
            indicateToday
            multiSelect
            // duplicate
          />
        ) : null}
      </div>
    );
  }
}

export default Example;
