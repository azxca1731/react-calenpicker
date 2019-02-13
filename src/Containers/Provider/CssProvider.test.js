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

  describe("사용자는 CssProvider를 통해 크기를 임의로 조절할 수 있다.", () => {
    it("크기 옵션을 객체로 설정하면 해당 객체의 세부 내용에 따라 크기가 반영되어있는 CssProvider를 생성한다.", () => {
      const sizeOption = {
        width: "500px",
        height: "950px",
        fontSize: "18px"
      };
      const provider = shallow(
        <CssProvider sizeOption={sizeOption}>
          <div />
        </CssProvider>
      );

      const expected = {
        DateCssObject: {},
        WeekCssObject: {},
        TemplateCssObject: {
          width: "500px",
          height: "950px",
          fontSize: "18px"
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

  describe("사용자는 Date에 지정할 스타일을 임의로 지정할 수 있다.", () => {
    it("DateCssObject에 사용자 지정 설정을 입력하면 Date에 전달 할 CssObject를 갖는 CssProvider를 생성한다.", () => {
      const DateStyle = {
        color: "skyblue"
      };
      const provider = shallow(
        <CssProvider DateCssObject={DateStyle}>
          <div />
        </CssProvider>
      );

      const expected = {
        DateCssObject: {
          color: "skyblue"
        },
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
