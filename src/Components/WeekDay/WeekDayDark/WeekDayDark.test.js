import React from "react";
import { shallow } from "enzyme";
import WeekDayDark from "index";

describe("WeekDayDark", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekDayDark />);
    expect(wrapper).toHaveLength(1);
  });
});
