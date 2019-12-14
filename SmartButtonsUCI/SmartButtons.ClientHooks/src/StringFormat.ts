/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace SmartButtons.ClientHooks.SmartButtons {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function stringFormat(formatString: string, ...args: any[]): string {
    return formatString.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  }
}
