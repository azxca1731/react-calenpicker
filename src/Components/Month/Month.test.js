import React from "react";
import { shallow } from "enzyme";
import Month from "index";

describe("Month", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Month />);
    expect(wrapper).toHaveLength(1);
  });
});
