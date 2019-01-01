import React from "react";
import { shallow } from "enzyme";
import TemplateLight from "index";

describe("TemplateLight", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<TemplateLight />);
    expect(wrapper).toHaveLength(1);
  });
});
