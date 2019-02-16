import React from "react";
import { ThemeProvider } from "styled-components";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import light from "Styles/theme/light";
import dark from "Styles/theme/dark";
import Month from "Components/Month";

storiesOf("Components/Month", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={light}>{story()}</ThemeProvider>)
  .add("Light", () => <Month />);

storiesOf("Components/Month", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={dark}>{story()}</ThemeProvider>)
  .add("Month Dark", () => <Month />);
