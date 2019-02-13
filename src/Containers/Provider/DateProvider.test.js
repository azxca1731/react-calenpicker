import React from "react";
import { shallow } from "enzyme";
import { DateProvider } from "./DateProvider";

const defaultState = {
  startDate: undefined,
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  dateObjectArray: [],
  duplicatedDateObjectArray: [],
  indicateToday: undefined,
  multiSelect: undefined,
  periods: []
};

const doTest = props => {
  const dateProvider = shallow(
    <DateProvider {...props}>
      <div />
    </DateProvider>
  );
  const expected = {
    ...defaultState,
    ...props
  };
  expect(dateProvider.state()).toEqual(expected);
};

describe("DateProvider", () => {
  describe("DateProvider를 사용할 수 있다.", () => {
    it("DateProvider를 설정없이 사용하면 기본 값으로 생성된다.", () => {
      const props = {};
      doTest(props);
    });

    it("DateProvider를 다중 선택 옵션을 설정하고 사용하면 해당 옵션이 반영되어있는 DateProvider가 생성된다.", () => {
      const props = {
        multiSelect: true
      };
      doTest(props);
    });

    it("DateProvider를 오늘자 표시 옵션을 설정하고 사용하면 해당 옵션이 반영되어있는 DateProvider가 생성된다.", () => {
      const props = {
        indicateToday: true
      };
      doTest(props);
    });

    it("DateProvider를 모든 Date관련 옵션을 설정하고 사용하면 해당 옵션이 반영되어있는 DateProvider가 생성된다.", () => {
      const props = {
        multiSelect: true,
        indicateToday: true
      };
      doTest(props);
    });
  });
});
