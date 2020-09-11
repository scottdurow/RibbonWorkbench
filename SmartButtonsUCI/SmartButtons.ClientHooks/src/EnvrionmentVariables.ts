import { stringFormat } from "./StringFormat";
import * as ResourceStrings from "./ResourceStrings";

export function extractVariables(text: string): string[] {
  // Extract the Environment Variables
  const regex = /\{%([\w\W^%]+?)%\}/gm;
  let match;
  const variables = [];
  while ((match = regex.exec(text)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    variables.push(match[1]);
  }
  return variables;
}

export function replaceVars(text: string, values: Record<string, string>): string {
  for (const name in values) {
    text = text.replace("{%" + name + "%}", values[name]);
  }
  return text;
}

export async function getEnvrionmentVariable(schemanames: string[]): Promise<Record<string, string>> {
  let schemanameList = "";
  for (const schemaname of schemanames) {
    schemanameList += "<value>" + schemaname + "</value>";
  }

  const getFlowUrl = `<fetch top="50" >
              <entity name="environmentvariabledefinition" >
              <attribute name="defaultvalue" />
              <attribute name="schemaname" />
              <filter>
                  <condition attribute="schemaname" operator="in">${schemanameList}</condition>
              </filter>
              <link-entity name="environmentvariablevalue" from="environmentvariabledefinitionid" to="environmentvariabledefinitionid" link-type="outer" >
                  <attribute name="value" alias="localvalue" />
              </link-entity>
              </entity>
              </fetch>`;
  const response = await Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", "?fetchXml=" + getFlowUrl);

  if (!response || response.entities.length != schemanames.length) {
    throw new Error(stringFormat(ResourceStrings.FlowEnvironmentVariableNotFound, schemanames.join(",")));
  }

  const values: Record<string, string> = {};
  for (const row of response.entities) {
    let value = row.defaultvalue;
    // If there is a value in this envrionment, use it
    if (row.localvalue) {
      value = row.localvalue;
    }
    values[row.schemaname] = value;
  }

  return values;
}

export async function tokeniseString(text: string): Promise<string> {
  debugger;
  const envVarNames = extractVariables(text);

  // Query the variables
  if (envVarNames.length > 0) {
    const envVarValues = await getEnvrionmentVariable(envVarNames);

    // Replace
    return replaceVars(text, envVarValues);
  } else return text;
}
