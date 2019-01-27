import React from "react";

import { storiesOf } from "@storybook/react";

import Date from "Components/Date";

import dark from "Styles/theme/dark";

storiesOf("Date", module)
  .add("Date 기본형", () => <Date />)
  .add("Date Dark", () => <Date theme={dark} />);
