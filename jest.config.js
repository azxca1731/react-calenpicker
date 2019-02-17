module.exports = {
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleFileExtensions: ["js", "jsx"],
  modulePaths: ["./src"],
  setupFiles: ["<rootDir>/config/jest/setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"]
};
