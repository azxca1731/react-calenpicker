import React from "react";
import { shallow } from "enzyme";
import DateContainer from "index";

describe("Date", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<DateContainer />);
    expect(wrapper).toHaveLength(1);
  });
});
