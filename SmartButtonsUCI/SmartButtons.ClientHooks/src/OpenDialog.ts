import * as querystringify from "querystringify";
import { normaliseGuid } from "./Helpers";
import { tokeniseString } from "./EnvrionmentVariables";

interface DialogParameter {
  id: string;
  logicalName: string;
  appUrl: string;
  showHeader: boolean;
  dialogTitle: string;
  isFormContext: boolean;
  isGridContext: boolean;
}
function getParameters(
  entityIds: string | string[],
  selectedContext: Xrm.FormContext | Xrm.Controls.GridControl,
  primaryContext: Xrm.FormContext | Xrm.Controls.GridControl,
  appUrl: string,
  dialogTitle: string,
): DialogParameter {
  const entityId = Array.isArray(entityIds) ? entityIds[0] : (entityIds as string);
  const isGridContext = (selectedContext as Xrm.Controls.GridControl).getEntityName != undefined;
  const isFormContext = (primaryContext as Xrm.FormContext).data != undefined;
  const dataParameters = {
    id: normaliseGuid(entityId),
    logicalName: isGridContext
      ? (selectedContext as Xrm.Controls.GridControl).getEntityName()
      : (selectedContext as Xrm.FormContext).data.entity.getEntityName(),
    appUrl: appUrl,
    showHeader: dialogTitle != undefined && dialogTitle != "",
    dialogTitle: dialogTitle,
    isFormContext: isFormContext,
    isGridContext: isGridContext,
  };
  return dataParameters;
}

async function openCanvasAppByUrl(
  selectedContext: Xrm.FormContext | Xrm.Controls.GridControl,
  primaryContext: Xrm.FormContext | Xrm.Controls.GridControl,
  width: number,
  height: number,
  data: DialogParameter,
): Promise<void> {
  if (data.isFormContext) {
    // Save the form first
    await (primaryContext as Xrm.FormContext).data.save();
  }

  const dataEncoded = encodeURIComponent(JSON.stringify(data)) as string;

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
    title: data.showHeader ? data.dialogTitle : " ",
  } as Xrm.Navigation.NavigationOptions;

  // Open the dialog and wait for it to close
  await Xrm.Navigation.navigateTo(dialogParameters, navigationOptions);

  if (data.isFormContext) {
    await (primaryContext as Xrm.FormContext).data.refresh(false);
  }
  if (data.isGridContext) {
    await (selectedContext as Xrm.Controls.GridControl).refresh();
  }
}
const enum TargetType {
  FullPage = 1,
  Dialog = 2,
}
const enum PositionType {
  Centre = 1,
  SideBar = 2,
}

export async function openCustomPage(
  selectedContext: Xrm.FormContext | Xrm.Controls.GridControl,
  primaryContext: Xrm.FormContext | Xrm.Controls.GridControl,
  width: number,
  height: number,
  data: DialogParameter,
): Promise<void> {
  // Side Dialog
  const pageInput = {
    pageType: "custom",
    name: data.appUrl,
    entityName: data.logicalName,
    recordId: data.id,
  };
  const navigationOptions = {
    target: TargetType.Dialog,
    position: PositionType.Centre,
    width: { value: width, unit: "px" }, // This can also be %
    title: data.dialogTitle,
  } as Xrm.Navigation.NavigationOptions;
  if (height === 0) {
    // Open as side bar
    navigationOptions.position = PositionType.SideBar;
  } else {
    // Open as dialog
    navigationOptions.height = height;
  }
  try {
    await Xrm.Navigation.navigateTo(pageInput as any, navigationOptions).then(() => {
      if (data.isFormContext) {
        (primaryContext as Xrm.FormContext).data.refresh(false);
      }
      if (data.isGridContext) {
        (selectedContext as Xrm.Controls.GridControl).refresh();
      }
    });
  } catch (ex) {
    Xrm.Navigation.openErrorDialog({ message: ex });
  }
}
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
  const data = getParameters(entityIds, selectedContext, primaryContext, appUrl, dialogTitle);
  // If starts with http - then we use the old technique, otherwise use the custom page techinque
  if (appUrl && appUrl.startsWith("http")) {
    await openCanvasAppByUrl(selectedContext, primaryContext, width, height, data);
  } else {
    await openCustomPage(selectedContext, primaryContext, width, height, data);
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
