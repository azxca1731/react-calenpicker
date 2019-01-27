import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import WeekDay from "Components/WeekDay";

storiesOf("Components", module)
  .addDecorator(withInfo)
  .add("WeekDay", () => <WeekDay />);
