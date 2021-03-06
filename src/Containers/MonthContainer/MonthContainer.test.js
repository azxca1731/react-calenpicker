import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import MonthContainer from "./index";

describe("MonthContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<MonthContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
