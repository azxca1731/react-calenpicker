import React from "react";
import { shallow } from "enzyme";
import MonthArrowLight from "index";

describe("MonthArrowLight", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthArrowLight />);
    expect(wrapper).toHaveLength(1);
  });
});
