import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import WeekDay from "./index";

describe("WeekDay", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WeekDay />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<WeekDay />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render custom css render well with snapshot", () => {
    const customCssObject = { color: "red" };
    const wrapper = shallow(<WeekDay cssObject={customCssObject} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper).props.style).toBe(customCssObject);
  });
});
