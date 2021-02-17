import * as querystringify from "querystringify";
import { normaliseGuid } from "./Helpers";
import { tokeniseString } from "./EnvrionmentVariables";
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function OpenDialog(
  entityIds: string[] | string,
  appUrl: string,
  width: number,
  height: number,
  dialogTitle: string,
  primaryContext: Xrm.FormContext | Xrm.Controls.GridControl,
  selectedContext: Xrm.FormContext | Xrm.Controls.GridControl,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _commandProperties: any,
): Promise<void> {
  // Tokenise any environment variables
  appUrl = await tokeniseString(appUrl);

  // Get the entityId and logical name
  const entityId = Array.isArray(entityIds) ? entityIds[0] : (entityIds as string);
  const isGridContext = (selectedContext as Xrm.Controls.GridControl).getEntityName != undefined;
  const isFormContext = (primaryContext as Xrm.FormContext).data != undefined;
  const dataParameters = {
    id: entityId,
    logicalName: isGridContext
      ? (selectedContext as Xrm.Controls.GridControl).getEntityName()
      : (selectedContext as Xrm.FormContext).data.entity.getEntityName(),
    appUrl: appUrl,
    showHeader: dialogTitle != undefined && dialogTitle != "",
    dialogTitle: dialogTitle,
  };

  if (isFormContext) {
    // Save the form first
    await (primaryContext as Xrm.FormContext).data.save();
  }

  const dataEncoded = encodeURIComponent(JSON.stringify(dataParameters)) as string;

  // We use a container for the dialog that includes an iframe and listens for the window to close
  const dialogParameters = {
    pageType: "webresource",
    webresourceName: "dev1_/html/canvasapp_dialog.html",
    data: dataEncoded,
  } as Xrm.Navigation.PageInputHtmlWebResource;
  const navigationOptions = {
    target: 2,
    width: width ?? 420,
    height: height ?? 280,
    position: 1,
    title: dataParameters.showHeader ? dataParameters.dialogTitle : " ",
  } as Xrm.Navigation.NavigationOptions;

  // Open the dialog and wait for it to close
  await Xrm.Navigation.navigateTo(dialogParameters, navigationOptions);

  if (isFormContext) {
    await (primaryContext as Xrm.FormContext).data.refresh(false);
  }
  if (isGridContext) {
    await (selectedContext as Xrm.Controls.GridControl).refresh();
  }
}

export function AddCanvasAppIframe(): void {
  // Get the data parameters
  const parameters = querystringify.parse(window.location.search) as { data: string };
  const dataParmeters = JSON.parse(decodeURIComponent(parameters.data));

  const recordId = normaliseGuid(dataParmeters.id);
  const recordLogicalName = dataParmeters.logicalName;

  // Get the root div
  const root = document.getElementById("root");
  const iframe = document.createElement("iframe");
  root?.appendChild(iframe);
  iframe.setAttribute("style", "height:100%;width:100%;");
  iframe.setAttribute("frameBorder", "0");
  // Append the IFRAME

  let onloadCounter = 0;
  iframe.onload = (): void => {
    onloadCounter++;
    if (onloadCounter > 1) {
      // Close the dialog if this is the second time the frame is navigated
      // This is because the Exit() function in Canvas Apps navigates to an empty page
      window.close();
    }
  };

  const params = {
    screenColor: "FFFFFF",
    source: "iframe",
    hidenavbar: "true",
    recordId: recordId,
    recordLogicalName: recordLogicalName,
  };
  const queryStringParams = querystringify.stringify(params, dataParmeters.appUrl.indexOf("?") > -1 ? "&" : "?");
  iframe.src = `${dataParmeters.appUrl}${queryStringParams}`;
}
