import React from "react";

import { storiesOf } from "@storybook/react";

import Calendar from "./Calendar";

storiesOf("Calendar/Theme", module)
  .add("캘린더 기본형", () => <Calendar />)
  .add("테마 검은색", () => <Calendar theme="dark" />);

storiesOf("Calendar/Duplicate", module)
  .add("연속캘린더 듀플리케이트", () => <Calendar duplicate />)
  .add("연속캘린더 듀플리케이트 날짜추가", () => <Calendar addText duplicate />);

storiesOf("Calendar/Sizing/By Modifier String", module)
  .add("Modifier - sm", () => <Calendar sizeOption="sm" />, { notes: "sm, md, lg로 미리 약속된 크기로 설정할 수 있다." })
  .add("Modifier - md", () => <Calendar sizeOption="md" />, { notes: "sm, md, lg로 미리 약속된 크기로 설정할 수 있다." })
  .add("Modifier - lg", () => <Calendar sizeOption="lg" />, { notes: "sm, md, lg로 미리 약속된 크기로 설정할 수 있다." });
storiesOf("Calendar/Sizing/By Object", module).add("By Object Specification", () => <Calendar sizeOption={{ width: "300px", height: "400px" }} />, {
  notes: "JSON객체 형태로 정의할 수 있다.\n 현재 상태 : {\n&nbsp;&nbsp;width: '300px',\n&nbsp;&nbsp;height: '400px'\n}"
});

storiesOf("Calendar/Other Options", module)
  .add("오늘 표시 옵션", () => <Calendar indicateToday />)
  .add("이번달만 보여주기 옵션", () => <Calendar onlyThisMonth />)
  .add("텍스트 커스터마이징", () => <Calendar objectSetText={[{ text: "연말", date: "2018-12-31" }, { text: "휴가", date: "2018-12-26", isHoliday: true }]} />)
  .add("캘린더 중복선택가능", () => <Calendar multiSelect />)
  .add("캘린더 날짜추가", () => <Calendar addText />)
  .add("캘린더 마우스 휠로 이동", () => <Calendar canMouseWheel />)
  .add("캘린더 커스텀 테마 적용", () => <Calendar customTheme={{ backgroundColor: "#efefef", secondaryColor: "#fe88a0", fontColor: "#74c9c6" }} />)
  .add("선택한 날짜의 텍스트 변경", () => <Calendar editSelectedDate />);
