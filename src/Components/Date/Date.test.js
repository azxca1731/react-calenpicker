import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Date from "./index";

describe("Month", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Date />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<Date />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render custom css render well with snapshot", () => {
    const customCssObject = { color: "red" };
    const wrapper = shallow(<Date cssObject={customCssObject} />);
    expect(wrapper).toMatchSnapshot();
  });
});
