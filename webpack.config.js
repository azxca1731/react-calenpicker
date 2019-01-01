const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const packageJson = require("./package.json");

module.exports = {
  mode: "production",
  entry: {
    index: path.join(__dirname, "src/index.js")
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: packageJson.name,
    libraryTarget: "umd",
    globalObject: "this"
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    alias: {
      Components: path.join(__dirname, "src/Components"),
      Containers: path.join(__dirname, "src/Containers"),
      Styles: path.join(__dirname, "src/Styles")
    }
  },

  externals: {
    react: "react",
    reactDOM: "react-dom"
  },

  plugins: [new CleanWebpackPlugin(["dist/*.*"])],
  optimization: {
    splitChunks: {
      name: "vendor",
      minChunks: 2
    }
  }
};
