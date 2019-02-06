import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import WeekDayContainer from "./index";

describe("WeekDayContainer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekDayContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<WeekDayContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
