import React from "react";
import { shallow } from "enzyme";
import { PropsProvider } from "./index";
const defaultState = {
  sizeOption: undefined,
  theme: undefined,
  animation: undefined,
  duplicate: undefined,
  duplicated: undefined,
  onlyThisMonth: undefined,
  couldSelectPrevDate: undefined,
  objectSetText: undefined,
  addText: undefined
};

const doTest = props => {
  const propsProvider = shallow(
    <PropsProvider {...props}>
      <div />
    </PropsProvider>
  );

  const expected = {
    ...defaultState,
    ...props
  };
  expect(propsProvider.state()).toEqual(expected);
};

describe("PropsProvider", () => {
  describe("PropsProvider를 사용할 수 있다", () => {
    it("PropsProvider를 설정없이 사용하면 기본 설정의 PropsProvider를 생성할 수 있다.", () => {
      const props = {};
      doTest(props);
    });
  });
});
