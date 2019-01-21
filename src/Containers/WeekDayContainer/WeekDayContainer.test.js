import React from "react";
import { shallow } from "enzyme";
import WeekDayContainer from "index";

describe("WeekDayContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekDayContainer />);
    expect(wrapper).toHaveLength(1);
  });
});
