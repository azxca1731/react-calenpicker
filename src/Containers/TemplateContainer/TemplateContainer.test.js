import React from "react";
import { shallow } from "enzyme";
import TemplateContainer from "index";

describe("TemplateContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<TemplateContainer />);
    expect(wrapper).toHaveLength(1);
  });
});
