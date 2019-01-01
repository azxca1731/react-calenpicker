import React from "react";
import { shallow } from "enzyme";
import TemplateDark from "index";

describe("TemplateDark", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<TemplateDark />);
    expect(wrapper).toHaveLength(1);
  });
});
