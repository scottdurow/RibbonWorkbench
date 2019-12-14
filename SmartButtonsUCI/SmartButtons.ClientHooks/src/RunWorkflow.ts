/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
namespace SmartButtons.ClientHooks.SmartButtons {
  const workflowWaitAlertName = "smartbutton.workflowWait";

  export async function WaitForWorkflowToComplete(
    workflowName: string,
    asyncoperationid: string,
    context: Xrm.FormContext,
    startTime?: Date,
  ): Promise<void> {
    if (!startTime) {
      startTime = new Date();
    }

    let completed = false;
    while (!completed) {
      const workflowInstance = await Xrm.WebApi.retrieveRecord(
        "asyncoperation",
        asyncoperationid,
        "?$select=statecode,statuscode",
      );
      const statuscode = workflowInstance.statuscode;
      if (statuscode && statuscode == 30) {
        completed = true;
      } else if ((statuscode && statuscode >= 31) || (new Date().getTime() - startTime.getTime()) / 1000 > 180000) {
        throw "Exception during running workflow";
      } else {
        await sleepTimeout(1000);
      }
    }
    return;
  }

  export async function RunWorkflow(name: string, entityId: string, context: Xrm.FormContext): Promise<void> {
    // Get the name of the workflow
    const fetch = `<fetch count='1'>
                    <entity name='workflow'>
                        <attribute name='workflowid'/>
                        <filter type='and'>
                            <condition attribute='name' operator='eq' value='${name}'/>
                            <condition attribute='ondemand' operator='eq' value='true'/>
                            <condition attribute='statuscode' operator='eq' value='2'/>
                            <condition attribute='type' operator='eq' value='1'/>
                        </filter>
                    </entity>
                    </fetch>`;

    const results = await Xrm.WebApi.retrieveMultipleRecords("workflow", "?fetchXml=" + fetch);

    if (results.entities.length == 0) {
      const message = stringFormat(ResourceStrings.WorkflowNotPublished, name);
      throw new Error(message);
    }

    for (const row of results.entities) {
      const workflowid = row.workflowid;
      const runWorkflowRequest = new (class {
        EntityId = { guid: normaliseGuid(entityId) };
        entity = { id: workflowid, entityType: "workflow" };
        getMetadata(): unknown {
          return {
            boundParameter: "entity",
            parameterTypes: {
              entity: {
                typeName: "Microsoft.Dynamics.CRM.workflow",
                structuralProperty: 5,
              },
              EntityId: {
                typeName: "Edm.Guid",
                structuralProperty: 1,
              },
            },
            operationType: 0,
            operationName: "ExecuteWorkflow",
          };
        }
      })();
      const runWorkflowResponse = await Xrm.WebApi.online.execute(runWorkflowRequest);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (runWorkflowResponse as any).text();
      if (response == "") {
        return;
      } else {
        // Wait for the workflow to complete
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseObject = JSON.parse(response) as any;
        const asyncoperationid = responseObject.asyncoperationid;
        await WaitForWorkflowToComplete(name, asyncoperationid, context);
      }
    }
    return;
  }

  export async function RunWorkflowSingle(
    name: string,
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
        context.ui.setFormNotification(
          stringFormat(ResourceStrings.RunningWorkflow, name),
          "INFO",
          workflowWaitAlertName,
        );
        for (const entityId of entityIds) {
          await RunWorkflow(name, entityId, context);
        }
        context.ui.clearFormNotification(workflowWaitAlertName);
        if (completeCallback) {
          // Call the callbackfunction
          const calbackFunctionDefinition = Function(completeCallback);
          calbackFunctionDefinition();
        }
      } catch (ex) {
        if (errorCallback) {
          // Call the callbackfunction
          const errorCallbackFunction = Function("ex", errorCallback);
          errorCallbackFunction(ex);
        } else {
          if (context) {
            context.ui.setFormNotification(ex, "ERROR", "RibbonWorkflowError");
          } else {
            Xrm.Navigation.openAlertDialog({ text: ex.toString() });
          }
        }
      }
      context.ui.clearFormNotification(workflowWaitAlertName);
      await context.data.refresh(false);
    }
  }

  export async function RunWorkflowMultiple(
    name: string,
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
            stringFormat(ResourceStrings.RunningWorkflow, name) +
              stringFormat(ResourceStrings.RecordProgressCount, counter, total),
          );
          await RunWorkflow(name, entityId, formContext);
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
          errorCallbackFunction(ex);
        } else {
          Xrm.Navigation.openAlertDialog({ text: ex.toString() });
        }
      }
    }
  }
}
