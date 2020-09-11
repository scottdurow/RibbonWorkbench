module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom-fourteen",
  roots: ["<rootDir>/src/"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
};
