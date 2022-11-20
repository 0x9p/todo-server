const package = require("./package");

module.exports = {
  name: package.name,
  displayName: package.name,
  testEnvironment: "node",
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "src/index.ts",
    "src/app.ts",
    "src/db.ts",
    "src/config",
    "src/scripts",
  ],
  testMatch: ["**/test/**/*.test.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  }
};
