import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import WeekContainer from "./index";

describe("WeekDay", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<WeekContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
