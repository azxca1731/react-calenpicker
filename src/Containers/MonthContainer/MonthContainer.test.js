import React from "react";
import { shallow } from "enzyme";
import MonthContainer from "./index";

describe("MonthContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthContainer />);
    expect(wrapper).toHaveLength(1);
  });
});
