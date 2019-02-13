import React from "react";
import { shallow, mount } from "enzyme";
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

  it("renders with snapshot prop for indicator type - date", () => {
    const wrapper = shallow(<Date indicatorType="date" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - start", () => {
    const wrapper = shallow(<Date indicatorType="start" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - end", () => {
    const wrapper = shallow(<Date indicatorType="end" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - select", () => {
    const wrapper = shallow(<Date indicatorType="select" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop isSaturday", () => {
    const wrapper = shallow(<Date isSaturday />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop isHoliday", () => {
    const wrapper = shallow(<Date isHoliday />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop dayNumber", () => {
    const dayNumber = 20;
    const wrapper = shallow(<Date dayNumber={dayNumber} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toContain(dayNumber);
  });

  it("renders with snapshot prop isToday", () => {
    const wrapper = mount(<Date isToday />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop text", () => {
    const text = "random";
    const wrapper = mount(<Date text={text} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toContain(text);
  });

  it("renders with snapshot prop isInPeriod", () => {
    const wrapper = shallow(<Date isInPeriod />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop isInThisMonth", () => {
    const wrapper = shallow(<Date isInThisMonth />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render custom css render well with snapshot", () => {
    const customCssObject = { color: "red" };
    const wrapper = shallow(<Date cssObject={customCssObject} />);
    expect(wrapper).toMatchSnapshot();
  });
});
