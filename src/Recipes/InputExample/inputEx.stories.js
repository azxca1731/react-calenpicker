import React from "react";

import { storiesOf } from "@storybook/react";

import InputEx1 from "./InputEx1";
import InputEx2 from "./InputEx2";
import input1code from "./input1code.md";
import input2code from "./input2code.md";

storiesOf("Recipes", module)
  .add("캘린더 하나의 인풋을 활용한 예제", () => <InputEx1 />, {
    notes: { markdown: input1code }
  })
  .add("캘린더 두개의 인풋으로 나누어 보는 예제", () => <InputEx2 />, {
    notes: { markdown: input2code }
  });
