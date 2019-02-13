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
  .add("연속캘린더 듀플리케이트", () => <Calendar duplicate />);
// .add("인풋 예제", () => (
//   <div>
//     <Calendar callbackFunction={value => console.log(value)} />
//   </div>
// ));
// .add("인풋 예제", () => (
//   <div>
//     <InputEX1 />
//   </div>
// ));
