import React from "react";
import { shallow } from "enzyme";
import WeekDay from "index";

describe("WeekDay", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekDay />);
    expect(wrapper).toHaveLength(1);
  });
});
