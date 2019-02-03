import React from "react";
import { shallow } from "enzyme";
import { CssProvider } from "./CssProvider";

describe("CssProvider", () => {
  describe("사용자는 CssProvider를 사용할 수 있다.", () => {
    it("설정 없이 CssProvider를 사용하면 기본 속성을 가진 CssProvider를 생성한다", () => {
      const provider = shallow(
        <CssProvider>
          <div />
        </CssProvider>
      );
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

    it("크기 설정을 sm으로 지정하면 해당 속성을 가진 CssProvider를 생성한다.", () => {
      const provider = shallow(
        <CssProvider sizeOption="sm">
          <div />
        </CssProvider>
      );
      const expected = {
        DateCssObject: {},
        WeekCssObject: {},
        TemplateCssObject: {
          width: "200px",
          height: "300px",
          fontSize: "10px"
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
