import React from "react";
import { shallow } from "enzyme";
import { CssProvider } from "./CssProvider";

describe("CssProvider", () => {
  describe("사용자는 CssProvider를 사용할 수 있다.", () => {
    it("설정 없이 CssProvider를 사용하면 기본 속성을 가진 CssProvider를 생성한다", () => {
      const provider = shallow(<CssProvider />);
      const expected = {
        DateCssObject: {},
        WeekCssObject: {},
        TemplateCssObject: {
          width: "300px",
          height: "450px",
          fontSize: "14px"
        },
        MonthCssObject: {},
        MonthArrowCssObject: {},
        WeekDayCssObject: {},
        CalendarBodyCssObject: {},
        CalendarHeadCssObject: {}
      };

      expect(provider.state()).toEqual(expected);
    });
  });
});
