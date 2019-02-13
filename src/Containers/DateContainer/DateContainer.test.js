import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import DateContainer from "./index";

describe("Date", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<DateContainer />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders with snapshot", () => {
    const wrapper = shallow(<DateContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
