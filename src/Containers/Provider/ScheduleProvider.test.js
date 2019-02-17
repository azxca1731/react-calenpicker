import React from "react";
import { shallow } from "enzyme";
import { ScheduleProvider, ScheduleConnector } from "./index";


class Deco extends React.Component {
  state = {
    schedules: []
  }

  render() {
    return ScheduleConnector(({state, actions}) => ({
      schedules: state.schedules,
      convertToSchedule: actions.convertToSchedule
    }))(
      <div>
        <pre>{this.state.schedules}</pre>
      </div>
    )
  }
}

describe("ScheduleProvider", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <ScheduleProvider />
    );
    expect(wrapper).toHaveLength(1);
  });

  it ("render with child and schdules", () => {
    const wrapper = shallow(
      <ScheduleProvider>
        <Deco />
      </ScheduleProvider>
    )

    expect(wrapper).toHaveLength(1);
  })
});
