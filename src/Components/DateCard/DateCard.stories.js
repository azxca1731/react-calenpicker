import React from "react";
import { ThemeProvider } from "styled-components";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import light from "Styles/theme/light";
import dark from "Styles/theme/dark";
import DateCard from "Components/DateCard";

storiesOf("Components", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={light}>{story()}</ThemeProvider>)
  .add("DateCard light", () => (
    <div style={{ width: "200px" }}>
      <DateCard height={50} text="Example" />
    </div>
  ));

storiesOf("Components", module)
  .addDecorator(withInfo)
  .addDecorator(story => <ThemeProvider theme={dark}>{story()}</ThemeProvider>)
  .add("DateCard Dark", () => (
    <div style={{ width: "200px" }}>
      <DateCard height={50} text="Example" />
    </div>
  ));
