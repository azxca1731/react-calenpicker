import React from "react";

import Calendar from "../Calendar";

class InputEx1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { turn: false, periods: { periodStart: "", periodEnd: "" } };
  }
  showCalendar = () => {
    console.log("hi");
    this.setState({ turn: !this.state.turn });
  };
  selectedPeriod = period => {
    console.log(period);
    // this.setState({ periods });
  };
  // selectedPeriod = periods => {
  //   console.log(periods);
  //   this.setState({ periods });
  // };
  render() {
    return (
      <div className="inputExDiv">
        <button type="button" onClick={this.showCalendar} value={this.state.periodStart}>
          {/* {this.selectedPeriod(this.state.periods.periods[0])} */}
          {this.state.periods.periodStart}
        </button>
        <div style={this.state.turn ? {} : { display: "none" }}>
          <Calendar callbackFuntion={periods => this.selectedPeriod(periods[0])} />
        </div>
        {/* <input  value={this.state.periods.periodStart} onChange={this.showCalendar} />
        <div style={this.state.turn ? {} : { display: "none" }}>
          <Calendar callbackFuntion={periods => this.selectedPeriod(periods[0])} />
        </div> */}
      </div>
    );
  }
}
export default InputEx1;
