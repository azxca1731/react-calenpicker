import React from "react";
import { ThemeProvider } from "styled-components";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import light from "Styles/theme/light";

import ArrowUp from "Styles/icons/ArrowUp";
import ArrowDoubleUp from "Styles/icons/ArrowDoubleUp";
import ArrowDown from "Styles/icons/ArrowDown";
import Modify from "Styles/icons/Modify";

storiesOf("Icons", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={light}>{story()}</ThemeProvider>)
  .add("ArrowUp light", () => <ArrowUp />)
  .add("ArrowDoubleUp light", () => <ArrowDoubleUp />)
  .add("ArrowDown light", () => <ArrowDown />)
  .add("Modify light", () => <Modify />);
