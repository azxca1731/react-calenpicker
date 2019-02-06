import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import CalendarBody from "./index";

describe("CalendarBody", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CalendarBody />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<CalendarBody />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
