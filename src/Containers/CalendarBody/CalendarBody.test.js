import React from "react";
import { shallow } from "enzyme";
import CalendarBody from "index";

describe("CalendarBody", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CalendarBody />);
    expect(wrapper).toHaveLength(1);
  });
});
