import React from "react";

import { storiesOf } from "@storybook/react";

import InputEx1 from "./InputEx1";
import InputEx2 from "./InputEx2";
// import InputEx3 from "./InputEx3";

storiesOf("Calendar", module)
  .add("캘린더 인풋 예제 1", () => <InputEx1 />)
  .add("캘린더 인풋 예제 2", () => <InputEx2 />); /*,
storiesOf("Calendar", module).add("캘린더 인풋 예제 3", () => <InputEx3 />);*/
