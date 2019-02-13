import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import MonthArrowContainer from "./index";

describe("MonthArrowContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthArrowContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<MonthArrowContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
