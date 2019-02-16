import React from "react";

import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import AddButton from "Components/AddButton";
import light from "Styles/theme/light";
import dark from "Styles/theme/dark";

storiesOf("Components/AddButton", module)
  .addDecorator(story => <ThemeProvider theme={light}>{story()}</ThemeProvider>)
  .add("Light", () => <AddButton theme={light} handleModal={() => {}} />);

storiesOf("Components/AddButton", module)
  .addDecorator(story => <ThemeProvider theme={dark}>{story()}</ThemeProvider>)
  .add("Dark", () => <AddButton theme={dark} handleModal={() => {}} />);
