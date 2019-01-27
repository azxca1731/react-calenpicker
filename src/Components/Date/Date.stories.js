import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Date from "Components/Date";

storiesOf("Components", module)
  .addDecorator(withInfo)
  .add("Date", () => <Date />);
