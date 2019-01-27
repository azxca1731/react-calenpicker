import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import MonthArrow from "Components/MonthArrow";

storiesOf("Components", module)
  .addDecorator(withInfo)
  .add("MonthArrow", () => <MonthArrow />);
