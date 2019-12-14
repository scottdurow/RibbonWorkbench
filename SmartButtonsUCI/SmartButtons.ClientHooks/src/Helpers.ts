/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
namespace SmartButtons.ClientHooks.SmartButtons {
  export function normaliseGuid(guid: string): string {
    return guid.replace("{", "").replace("}", "");
  }

  export function sleepTimeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  export function getWebApiUrl(): string {
    const context = Xrm.Utility.getGlobalContext();
    const clientUrl = context.getClientUrl();
    const versionParts = context
      .getVersion()
      .toString()
      .split(".");

    const webApiUrl = `${clientUrl}/api/data/v${versionParts[0]}.${versionParts[1]}`;
    // Add the WebApi version
    return webApiUrl;
  }

  export function request(
    action: "POST" | "PATCH" | "PUT" | "GET" | "DELETE",
    uri: string,
    payload?: object,
    includeFormattedValues?: boolean,
    maxPageSize?: number,
  ): Promise<object> {
    // Construct a fully qualified URI if a relative URI is passed in.
    if (uri.charAt(0) === "/") {
      uri = getWebApiUrl() + uri;
    }

    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open(action, uri, true);
      request.setRequestHeader("OData-MaxVersion", "4.0");
      request.setRequestHeader("OData-Version", "4.0");
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      if (maxPageSize) {
        request.setRequestHeader("Prefer", "odata.maxpagesize=" + maxPageSize);
      }
      if (includeFormattedValues) {
        request.setRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request.onreadystatechange = function(this: XMLHttpRequest, ev: Event): any {
        if (this.readyState === 4) {
          request.onreadystatechange = null;
          switch (this.status) {
            case 200: // Success with content returned in response body.
            case 202: // Success accepted.
            case 204: // Success with no content returned in response body.
              resolve(this);
              break;
            default:
              // All other statuses are unexpected so are treated like errors.
              let error;
              try {
                error = JSON.parse(this.response).error;
              } catch (e) {
                error = new Error("Unexpected Error");
              }
              reject(error);
              break;
          }
        }
      };
      request.send(JSON.stringify(payload));
    });
  }
}
