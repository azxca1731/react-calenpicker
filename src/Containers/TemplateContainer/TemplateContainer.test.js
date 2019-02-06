import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import TemplateContainer from "./index";

describe("TemplateContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<TemplateContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<TemplateContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
