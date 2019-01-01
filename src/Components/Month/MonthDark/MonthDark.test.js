import React from "react";
import { shallow } from "enzyme";
import MonthDark from "index";

describe("MonthDark", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthDark />);
    expect(wrapper).toHaveLength(1);
  });
});
