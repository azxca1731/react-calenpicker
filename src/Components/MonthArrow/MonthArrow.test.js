import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import MonthArrow from "./index";

describe("MonthArrow", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MonthArrow />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with no props", () => {
    const wrapper = mount(<MonthArrow />);
    expect(wrapper.text()).toContain("❮");
  });

  it("renders props for type to right", () => {
    const wrapper = mount(<MonthArrow type="right" />);
    expect(wrapper.text()).toContain("❯");
  });

  it("renders props for type to none", () => {
    const wrapper = mount(<MonthArrow type="none" />);
    expect(wrapper.text()).toContain(" ");
  });

  it("renders with snapshot", () => {
    const wrapper = mount(<MonthArrow />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render custom css render well with snapshot", () => {
    const customCssObject = { color: "red" };
    const wrapper = shallow(<MonthArrow cssObject={customCssObject} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper).props.style).toBe(customCssObject);
  });
});
