import React from "react";
import { shallow } from "enzyme";
import Template from "index";

describe("Template", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Template />);
    expect(wrapper).toHaveLength(1);
  });
});
