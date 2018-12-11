import React from "react";
import { shallow } from "enzyme";
import CalendarHead from "index";

describe("CalendarHead", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CalendarHead />);
    expect(wrapper).toHaveLength(1);
  });
});
