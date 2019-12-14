/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
namespace SmartButtons.ClientHooks.SmartButtons {
  const flowWaitAlertName = "smartbutton.flowWait";
  async function getEnvrionmentVariable(schemaname: string): Promise<string> {
    const getFlowUrl = `<fetch top="50" >
            <entity name="environmentvariabledefinition" >
            <attribute name="defaultvalue" />
            <attribute name="displayname" />
            <filter>
                <condition attribute="schemaname" operator="eq" value="${schemaname}" />
            </filter>
            <link-entity name="environmentvariablevalue" from="environmentvariabledefinitionid" to="environmentvariabledefinitionid" link-type="outer" >
                <attribute name="value" alias="localvalue" />
            </link-entity>
            </entity>
            </fetch>`;
    const response = await Xrm.WebApi.retrieveMultipleRecords(
      "environmentvariabledefinition",
      "?fetchXml=" + getFlowUrl,
    );

    if (!response || response.entities.length == 0) {
      throw new Error(stringFormat(ResourceStrings.FlowEnvironmentVariableNotFound, schemaname));
    }

    let value = response.entities[0].defaultvalue;
    // If there is a value in this envrionment, use it
    if (response.entities[0].localvalue) {
      value = response.entities[0].localvalue;
    }
    return value;
  }

  export async function RunWebHook(url: string, recordId: string, context: Xrm.FormContext): Promise<void> {
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
    selectedControl: any,
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
          selectedControl.refresh();
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
}
