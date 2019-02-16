import React from "react";
import { ThemeProvider } from "styled-components";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import light from "Styles/theme/light";
import dark from "Styles/theme/dark";
import WeekDay from "Components/WeekDay";

storiesOf("Components/WeekDay", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={light}>{story()}</ThemeProvider>)
  .add("Light", () => <WeekDay />);

storiesOf("Components/WeekDay", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={dark}>{story()}</ThemeProvider>)
  .add("Dark", () => <WeekDay />);
