import React from "react";
import { shallow } from "enzyme";
import MonthArrowContainer from "index";

describe("MonthArrowContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthArrowContainer />);
    expect(wrapper).toHaveLength(1);
  });
});
