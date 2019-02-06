import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import Month from "Components/Month";

describe("Month", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Month />);
    expect(wrapper).toHaveLength(1);
  });

  it("render right props - month in right state", () => {
    const month = 2010 + Math.floor(Math.random() * 10 + 1) + "." + Math.floor(Math.random() * 10 + 1);
    const wrapper = mount(<Month month={month} />);
    expect(wrapper.text()).toContain(month);
  });

  it("render with snapshot", () => {
    const month = "2018.02";
    const wrapper = shallow(<Month month={month} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render custom css render well", () => {
    const customCssObject = { color: "red" };
    const wrapper = shallow(<Month cssObject={customCssObject} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper).props.style).toBe(customCssObject);
  });
});
