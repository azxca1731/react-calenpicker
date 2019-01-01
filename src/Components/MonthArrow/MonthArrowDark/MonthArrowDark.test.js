import React from "react";
import { shallow } from "enzyme";
import MonthArrowDark from "index";

describe("MonthArrowDark", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthArrowDark />);
    expect(wrapper).toHaveLength(1);
  });
});
