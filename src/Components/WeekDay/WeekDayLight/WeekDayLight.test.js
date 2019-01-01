import React from "react";
import { shallow } from "enzyme";
import WeekDayLight from "index";

describe("WeekDayLight", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekDayLight />);
    expect(wrapper).toHaveLength(1);
  });
});
