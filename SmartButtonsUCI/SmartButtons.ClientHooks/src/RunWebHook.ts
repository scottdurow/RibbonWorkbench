/* eslint-disable @typescript-eslint/no-unused-vars */

import { stringFormat } from "./StringFormat";
import * as ResourceStrings from "./ResourceStrings";
import { normaliseGuid, request } from "./Helpers";
import { tokeniseString } from "./EnvrionmentVariables";

const flowWaitAlertName = "smartbutton.flowWait";

export async function RunWebHook(url: string, recordId: string, _context: Xrm.FormContext): Promise<void> {
  // Replace any envrionment variables
  url = await tokeniseString(url);
  // Post the id to the url
  const flowRequest = {
    id: normaliseGuid(recordId),
  };
  await request("POST", url, flowRequest);
}

export async function RunWebHookSingle(
  url: string,
  entityIds: string[],
  confirmationMessage: string | undefined,
  completeCallback: string | undefined,
  errorCallback: string | undefined,
  context: Xrm.FormContext,
): Promise<void> {
  if (!context) {
    Xrm.Navigation.openAlertDialog({ text: ResourceStrings.RunWorkflowConfigMessage });
  }
  if (errorCallback == "") errorCallback = undefined;

  let confirmed = true;
  if (confirmationMessage) {
    const confirmMessage = stringFormat(confirmationMessage, entityIds.length);
    const result = await Xrm.Navigation.openConfirmDialog({
      title: "",
      text: confirmMessage,
    });

    confirmed = result && result.confirmed;
  }

  if (confirmed) {
    // Save and refresh form
    await context.data.entity.save();

    try {
      context.ui.setFormNotification(stringFormat(ResourceStrings.RunningFlow, name), "INFO", flowWaitAlertName);
      for (const entityId of entityIds) {
        await RunWebHook(url, entityId, context);
      }
      context.ui.clearFormNotification(flowWaitAlertName);
      if (completeCallback) {
        // Call the callbackfunction
        const calbackFunctionDefinition = Function(completeCallback);
        calbackFunctionDefinition();
      }
    } catch (ex) {
      if (errorCallback) {
        // Call the callbackfunction
        const errorCallbackFunction = Function("ex", errorCallback);
        errorCallbackFunction(ex.message);
      } else {
        if (context) {
          context.ui.setFormNotification(ex.message, "ERROR", "RibbonWorkflowError");
        } else {
          Xrm.Navigation.openAlertDialog({ text: ex.message });
        }
      }
    }
    context.ui.clearFormNotification(flowWaitAlertName);
    await context.data.refresh(false);
  }
}

export async function RunWebHookMultiple(
  url: string,
  entityIds: string[],
  confirmationMessage: string | undefined,
  completeCallback: string,
  errorCallback: string | undefined,
  formContext: Xrm.FormContext,
  selectedControl: unknown,
): Promise<void> {
  if (!formContext) {
    Xrm.Navigation.openAlertDialog({ text: ResourceStrings.RunWorkflowConfigMessage });
  }
  if (errorCallback == "") errorCallback = undefined;
  let confirmed = true;
  if (confirmationMessage) {
    const confirmMessage = stringFormat(confirmationMessage, entityIds.length);
    const result = await Xrm.Navigation.openConfirmDialog({
      title: "",
      text: confirmMessage,
    });

    confirmed = result && result.confirmed;
  }

  if (confirmed) {
    let counter = 1;
    const total = entityIds.length;

    try {
      // Start workflow on multiple records
      for (const entityId of entityIds) {
        Xrm.Utility.showProgressIndicator(
          stringFormat(ResourceStrings.RunningFlow, name) +
            stringFormat(ResourceStrings.RecordProgressCount, counter, total),
        );
        await RunWebHook(url, entityId, formContext);
        counter++;
      }
      Xrm.Utility.closeProgressIndicator();
      if (completeCallback) {
        const completeCallbackFunction = Function(completeCallback);
        completeCallbackFunction();
      }
      // Try and refresh the grid
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (selectedControl as any).refresh();
      } catch {}
    } catch (ex) {
      Xrm.Utility.closeProgressIndicator();
      if (errorCallback) {
        // Call the callbackfunction
        const errorCallbackFunction = Function("ex", errorCallback);
        errorCallbackFunction(ex.message);
      } else {
        Xrm.Navigation.openAlertDialog({ text: ex.message });
      }
    }
  }
}
