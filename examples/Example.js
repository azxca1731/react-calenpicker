import React from "react";

import Calendar from "../src/index";

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleCalendar = this.handleCalendar.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  handleCalendar() {
    this.setState({ show: !this.state.show });
  }

  callbackFunction(periodObject) {
    this.setState({ show: false, ...periodObject });
  }

  render() {
    const { show, periodStart, periodEnd } = this.state;
    return (
      <div>
        {periodStart && periodEnd ? (
          <span>
            시작날짜:{periodStart} 종료날짜
            {periodEnd}
          </span>
        ) : null}
        <br />
        <button onClick={this.handleCalendar}>캘린더 열기</button>
        {show ? <Calendar callbackFunction={this.callbackFunction} /> : null}
      </div>
    );
  }
}

export default Example;
