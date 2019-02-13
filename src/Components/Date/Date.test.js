import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Date from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(
    <table>
      <tbody>
        <tr>
          <Date {...props} />
        </tr>
      </tbody>
    </table>
  );
  return wrapper;
};

describe("Month", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - date", () => {
    const props = {
      indicatorType: "date"
    };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - start", () => {
    const props = { indicatorType: "start" };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - end", () => {
    const props = { indicatorType: "end" };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop for indicator type - select", () => {
    const props = { indicatorType: "select" };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop isSaturday", () => {
    const props = { isSaturday: true };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop isHoliday", () => {
    const props = { isHoliday: true };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop dayNumber", () => {
    const dayNumber = 20;
    const props = { dayNumber };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find({ dayNumber })).toHaveLength(1);
  });

  it("renders with snapshot prop isToday", () => {
    const props = { isToday: true };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop text", () => {
    const text = "random";
    const props = { text };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find({ text })).toHaveLength(1);
  });

  it("renders with snapshot prop isInPeriod", () => {
    const props = { isInPeriod: true };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders with snapshot prop isInThisMonth", () => {
    const props = { isInThisMonth: true };
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render custom css render well with snapshot", () => {
    const customCssObject = { color: "red" };
    const props = { cssObject: { ...customCssObject } };
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});
