module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["prettier"],

  env: {
    browser: true,
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
