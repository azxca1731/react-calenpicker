import React from "react";
import { shallow } from "enzyme";
import MonthLight from "index";

describe("MonthLight", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthLight />);
    expect(wrapper).toHaveLength(1);
  });
});
