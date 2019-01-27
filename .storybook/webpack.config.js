const setting = require("../webpack.config");
module.exports = {
  mode: "development",
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      setting.module.rules[1],
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre"
      }
    ]
  },
  resolve: setting.resolve
};
