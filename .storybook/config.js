import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withBackgrounds } from "@storybook/addon-backgrounds";

addDecorator(withBackgrounds([{ name: "white", value: "#ffffff", default: true }, { name: "grey", value: "#C0C0C0" }, { name: "black", value: "#000000" }]));
addDecorator(withKnobs);

const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
