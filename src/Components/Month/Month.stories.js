import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Month from "Components/Month";

storiesOf("Components", module)
  .addDecorator(withInfo)
  .add("Month", () => <Month />);
