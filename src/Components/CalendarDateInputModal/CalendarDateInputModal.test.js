import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import CalendarDateInputModal from "./index";

describe("CalendarDateInputModal", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CalendarDateInputModal />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<CalendarDateInputModal />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
