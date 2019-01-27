import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Template from "Components/Template";

storiesOf("Components", module)
  .addDecorator(withInfo)
  .add("Template", () => <Template />);
