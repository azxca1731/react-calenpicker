import React from "react";
import { shallow } from "enzyme";
import MonthArrow from "index";

describe("MonthArrow", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthArrow />);
    expect(wrapper).toHaveLength(1);
  });
});
