import React from "react";
import { shallow } from "enzyme";
import { ScheduleProvider } from "./index";

describe("ScheduleProvider", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <ScheduleProvider />
    );
    expect(wrapper).toHaveLength(1);
  });
});
