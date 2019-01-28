import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withBackgrounds } from "@storybook/addon-backgrounds";

import React from "react";

addDecorator(withBackgrounds([{ name: "white", value: "#ffffff", default: true }, { name: "grey", value: "#C0C0C0" }, { name: "black", value: "#000000" }]));
addDecorator(withKnobs);
addDecorator(story => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      overflow: "auto"
    }}
  >
    <div
      style={{
        margin: "auto",
        maxHeight: "100%"
      }}
    >
      {story()}
    </div>
  </div>
));

const req = require.context("../src", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
