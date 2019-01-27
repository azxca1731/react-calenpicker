import React from "react";

import { storiesOf } from "@storybook/react";

import Month from "Components/Month";

import dark from "Styles/theme/dark";

storiesOf("Month", module)
  .add("Month 기본형", () => <Month />)
  .add("Month dark", () => <Month theme={dark} />);
