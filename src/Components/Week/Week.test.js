import React from "react";
import { shallow } from "enzyme";
import Week from "index";

describe("WeekDay", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Week />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with valid props", () => {
    const wrapper = shallow(<Week weekNumber={0} />);
    expect(wrapper).toHaveLength(1);
  });
});
