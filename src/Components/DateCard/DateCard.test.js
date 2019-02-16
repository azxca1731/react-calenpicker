import React from "react";
import { shallow } from "enzyme";

import DateCard from "Components/DateCard";

describe("DateCard", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<DateCard />);
    expect(wrapper).toHaveLength(1);
  });
});
