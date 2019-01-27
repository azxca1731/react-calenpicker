const path = require("path");
const setting = require("../webpack.config");
module.exports = {
  mode: "development",
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [setting.module.rules[1]]
  },
  resolve: setting.resolve
};
