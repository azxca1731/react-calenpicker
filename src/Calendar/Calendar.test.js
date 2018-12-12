import React from "react";
import { shallow } from "enzyme";
import Calendar from "index";

describe("Calendar", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toHaveLength(1);
  });
});
