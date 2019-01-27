import React from "react";

import { storiesOf } from "@storybook/react";

import Template from "Components/Template";

import dark from "Styles/theme/dark";

storiesOf("Template", module)
  .add("Template 기본형", () => <Template />)
  .add("Template Dark", () => <Template theme={dark} />);
