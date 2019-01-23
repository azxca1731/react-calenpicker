import React from "react";
import { shallow } from "enzyme";
import Date from "index";

describe("Month", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Date />);
    expect(wrapper).toHaveLength(1);
  });
});
