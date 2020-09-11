import { extractVariables, replaceVars, tokeniseString } from "../EnvrionmentVariables";
import { XrmMockGenerator } from "xrm-mock";
XrmMockGenerator.initialise();
test("Extract", () => {
  const variables = extractVariables("{%some_var%}{%some_other_var%}");
  expect(variables.length).toBe(2);
  expect(variables[0]).toBe("some_var");
  expect(variables[1]).toBe("some_other_var");
});

test("Replace", () => {
  const value = "{%some_var%}{%some_other_var%}";
  const variables: Record<string, string> = {
    // eslint-disable-next-line prettier/prettier
    "some_var": "ABC",
    // eslint-disable-next-line prettier/prettier
    "some_other_var": "123",
  };

  const result = replaceVars(value, variables);
  expect(result).toBe("ABC123");
});

test("Query", async () => {
  const value = "{%some_var%}{%some_other_var%}";

  const result = {
    entities: [
      {
        schemaname: "some_var",
        defaultvalue: "ABC",
      },
      {
        schemaname: "some_other_var",
        defaultvalue: "123",
      },
    ],
  };
  Xrm.WebApi.retrieveMultipleRecords = jest.fn().mockReturnValue(result);

  const tokenisedText = await tokeniseString(value);
  expect(tokenisedText).toBe("ABC123");
});

test("NoQuery", async () => {
  // When there are no envrionment variables to replace, don't query
  const value = "some_value";

  const retrieveImplementation = jest.fn().mockImplementation();
  Xrm.WebApi.retrieveMultipleRecords = retrieveImplementation;
  const tokenisedText = await tokeniseString(value);
  expect(tokenisedText).toBe("some_value");

  expect(retrieveImplementation).toHaveBeenCalledTimes(0);
});
