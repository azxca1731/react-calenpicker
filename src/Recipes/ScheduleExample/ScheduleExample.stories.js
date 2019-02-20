import React from "react";

import { storiesOf } from "@storybook/react";

import ScheduleRecipeWithChart from "./ScheduleRecipeWithChart";
import code from "./code.md";

storiesOf("Recipes", module).add(
  "캘린더 일정을 활용한 예제",
  () => <ScheduleRecipeWithChart />,
  {
    notes: { markdown: code }
  }
);
