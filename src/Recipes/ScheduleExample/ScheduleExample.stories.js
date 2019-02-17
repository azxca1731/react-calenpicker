import React from "react";

import { storiesOf } from "@storybook/react";

import ScheduleRecipeWithChart from "./ScheduleRecipeWithChart";
import code from "./code.md";

storiesOf("Recipes", module).add("캘린더 스케줄 예제 1", () => <ScheduleRecipeWithChart />, {
  notes: { markdown: code }
});
