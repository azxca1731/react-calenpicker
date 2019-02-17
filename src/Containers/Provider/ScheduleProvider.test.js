import React from "react";
import { shallow } from "enzyme";
import { ScheduleProvider, ScheduleConnector } from "./index";


class Deco extends React.Component {
  state = {
    schedules: []
  }

  static getDerivedStateFromProps = (nextProps) => {
    const {objectSetText, convertToSchedule} = nextProps;
    const schedules = convertToSchedule(objectSetText);
    return {schedules};
  }

  render() {
    return (
      <div>
        <pre>{this.state.schedules}</pre>
      </div>
    )
  }
}

ScheduleConnector(({state, actions}) => ({
  schedules: state.schedules,
  convertToSchedule: actions.convertToSchedule
}))(Deco);

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

  it("스케줄 정보가 포함되어야", () => {
    const wrapper = shallow(
      <ScheduleProvider scheduleObjects={[
        {date: "2019-2-1", text: "test1", isHoliday: false, scheduleID: "test1"},
        {date: "2019-2-2", text: "test1", isHoliday: false, scheduleID: "test1"},
        {date: "2019-2-3", text: "test1", isHoliday: false, scheduleID: "test1"},
        {date: "2019-2-4", text: "test1", isHoliday: false, scheduleID: "test1"},
      ]}>
        <Deco />
      </ScheduleProvider>
    )

    expect(wrapper.state()).toEqual({
      schedules: [
        {date: "2019-2-1", text: "test1", isHoliday: false, scheduleID: "test1"},
        {date: "2019-2-2", text: "test1", isHoliday: false, scheduleID: "test1"},
        {date: "2019-2-3", text: "test1", isHoliday: false, scheduleID: "test1"},
        {date: "2019-2-4", text: "test1", isHoliday: false, scheduleID: "test1"},
      ],
      scheduleIDs: [
        "test1"
      ]
    })
  });
});
