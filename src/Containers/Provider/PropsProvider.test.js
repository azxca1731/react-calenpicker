import React from "react";
import { shallow } from "enzyme";
import { PropsProvider } from "./index";

describe("PropsProvider", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PropsProvider />);
    expect(wrapper).toHaveLength(1);
  });
});
