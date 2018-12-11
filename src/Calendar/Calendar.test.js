import React from "react";
import { shallow } from "enzyme";
import Calendar from "index";

describe("Calendar", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toHaveLength(1);
  });

  it("should render name from prop", () => {
    const wrapper = shallow(<Calendar name="Jack" />);
    expect(wrapper.find(".name-holder").text()).toContain("My name is - Jack");
  });
});
