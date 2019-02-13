import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import CalendarHead from "./index";

describe("CalendarHead", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CalendarHead />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<CalendarHead />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
