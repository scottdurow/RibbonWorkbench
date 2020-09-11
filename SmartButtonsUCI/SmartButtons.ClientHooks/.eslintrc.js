  module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "prettier",
      "prettier/@typescript-eslint",
      "prettier/react",
    ],
    plugins: ["react", "@typescript-eslint", "prettier"],
    parserOptions: {
      project: "./tsconfig.json",
    },
    settings: {
      react: {
        pragma: "React",
        version: "detect",
      },
    },
    env: {
      browser: true,
      jasmine: true,
      jest: true,
    },
    overrides: [
      {
        files: ["*.ts"],
        rules: {
          camelcase: [2, { properties: "never" }],
        },
      },
    ],
  };
