import React from "react";

import { storiesOf } from "@storybook/react";

import Calendar from "./Calendar";

storiesOf("Calendar", module)
  .add("캘린더 기본형", () => <Calendar />)
  .add("테마 검은색", () => <Calendar theme="dark" />)
  .add("오늘 표시 옵션", () => <Calendar indicateToday />)
  .add("이번달만 보여주기 옵션", () => <Calendar onlyThisMonth />)
  .add("텍스트 커스터마이징", () => <Calendar objectSetText={[{ text: "연말", date: "2018-12-31" }, { text: "휴가", date: "2018-12-26", isHoliday: true }]} />)
  .add("캘린더 중복선택가능", () => <Calendar multiSelect />)
  .add("연속캘린더 듀플리케이트", () => <Calendar duplicate />)
  .add("캘린더 날짜추가", () => <Calendar addText />)
  .add("캘린더 마우스 휠로 이동", () => <Calendar canMouseWheel />)
  .add("캘린더 커스텀 테마 적용", () => <Calendar customTheme={{ backgroundColor: "#efefef", secondaryColor: "#fe88a0", fontColor: "#74c9c6" }} />)
  .add("연속캘린더 듀플리케이트", () => <Calendar duplicate />)
  .add("연속캘린더 듀플리케이트 날짜추가", () => <Calendar addText duplicate />)
  .add("선택한 날짜의 텍스트 변경", () => <Calendar editSelectedDate />);
