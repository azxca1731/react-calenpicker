import React from "react";
import { shallow } from "enzyme";
import WeekContainer from "index";

describe("WeekDay", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with valid props", () => {
    const wrapper = shallow(<WeekContainer weekNumber={0} />);
    expect(wrapper).toHaveLength(1);
  });
});
