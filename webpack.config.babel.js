import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
const packageJson = require("./package.json");

export default () => ({
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
        test: /\.less$/,
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
            loader: "less-loader"
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".less"]
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
});
