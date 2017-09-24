
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Html;
using System.Runtime.CompilerServices;
using System.Serialization;
using Xrm;
using Xrm.Sdk;
using Xrm.Sdk.Messages;

namespace SmartButtons.ClientHooks
{

    public static class SmartButtons
    {
     
        [PreserveCase]
        public static void RunReport(string reportName, string recordId, string etc)
        {
           
            // Get the name of the workflow
            string fetch = String.Format(@"<fetch count='1'>
                       <entity name='report'>
                           <attribute name='reportid'/>
                           <filter type='and'>
                               <condition attribute='name' operator='eq' value='{0}'/>
                           </filter>
                       </entity>
                   </fetch>", reportName);


            OrganizationServiceProxy.BeginRetrieveMultiple(fetch, delegate (object state)
            {
                EntityCollection results = OrganizationServiceProxy.EndRetrieveMultiple(state, typeof(Entity));

                foreach (Entity row in results.Entities)
                {
                    string id = row.Id;
                    string orgUrl = Page.Context.GetClientUrl();
                    string reportUrl = orgUrl +
                     "/crmreports/viewer/viewer.aspx?action=run&id=%7b" +
                     id.EncodeUriComponent() +
                     "%7d&records=%7b" + recordId + "%7d&recordstype=" + etc; ;
                    Window.Open(reportUrl);

                    break;

                }
            }
            ); 
        }

        [PreserveCase]
        public static void RunDialog(string name, string entityId, string entityLogicalName)
        {
            // Get the name of the workflow
            string fetch = String.Format(@"<fetch count='1'>
                       <entity name='workflow'>
                           <attribute name='workflowid'/>
                           <filter type='and'>
                               <condition attribute='name' operator='eq' value='{0}'/>
                               <condition attribute='ondemand' operator='eq' value='true'/>
                               <condition attribute='statuscode' operator='eq' value='2'/> 
                               <condition attribute='type' operator='eq' value='1'/>     
                           </filter>
                       </entity>
                   </fetch>", name, entityLogicalName);


            OrganizationServiceProxy.BeginRetrieveMultiple(fetch, delegate (object state)
            {
                EntityCollection results = OrganizationServiceProxy.EndRetrieveMultiple(state, typeof(Entity));

                foreach (Entity row in results.Entities)
                {
                    string url = Page.Context.GetClientUrl() +
                         "/cs/dialog/rundialog.aspx?DialogId=" +
                         row.GetAttributeValueGuid("workflowid").ToString() + "&EntityName=" +
                         entityLogicalName + "&ObjectId=" +
                         entityId;
                    Window.Open(url);
                    return;
                }
            });
               
        }

        [PreserveCase]
        public static void QuickJavascript(string[] entityIds, string javascript)
        {
            try
            {
                string entityIdStrings = Json.Stringify(entityIds);
                Script.Eval(javascript.Replace("%ids%", entityIdStrings));
            }
            catch (Exception ex)
            {
                Utility.AlertDialog(String.Format(ResourceStrings.JSException, ex.Message),null);
            }
        }

        [PreserveCase]
        public static void RunWorkflowMultiple(string name, string[] entityIds, string confirmationMessage, string completeCallback, string errorCalback)
        {
            if (!String.IsNullOrEmpty(confirmationMessage))
            {
                Utility.ConfirmDialog(String.Format(confirmationMessage, entityIds.Length), delegate ()
                {
                    RunWorkflowMultiple(name, entityIds, null, completeCallback, errorCalback);

                }, null);
                return;
            }

            // Start workflow on multiple records
            foreach (string entityId in entityIds)
            {
                RunWorkflowSingle(name, new string[] { entityId }, null, completeCallback, errorCalback);
            }
        }
        [PreserveCase]
        public static void RunWorkflowSingle(string name, string[] entityIds, string confirmationMessage, string completeCallback, string errorCallback)
        {
            if (!String.IsNullOrEmpty(confirmationMessage))
            {
                Utility.ConfirmDialog(confirmationMessage, delegate ()
                {
                    RunWorkflowSingle(name, entityIds, null, completeCallback, errorCallback);

                }, null);
                return;
            }
            else
            {
                foreach (string entityId in entityIds)
                {
                    RunWorkflow(name, entityId, completeCallback, errorCallback);
                }
            }



        }
        [PreserveCase]
        public static void RunWorkflow(string name, string entityId, string completeCallback, string errorCallback)
        {


            // Get the name of the workflow
            string fetch = String.Format(@"<fetch count='1'>
                       <entity name='workflow'>
                           <attribute name='workflowid'/>
                           <filter type='and'>
                               <condition attribute='name' operator='eq' value='{0}'/>
                               <condition attribute='ondemand' operator='eq' value='true'/>
                               <condition attribute='statuscode' operator='eq' value='2'/> 
                               <condition attribute='type' operator='eq' value='1'/>     
                           </filter>
                       </entity>
                   </fetch>", name);


            OrganizationServiceProxy.BeginRetrieveMultiple(fetch, delegate (object state)
             {
                 EntityCollection results = OrganizationServiceProxy.EndRetrieveMultiple(state, typeof(Entity));
                 if (results.Entities.Count == 0)
                 {
                     string message = String.Format(ResourceStrings.WorkflowNotPublished,name);
                     if (Page.Ui != null)
                     {
                         Page.Ui.SetFormNotification(message, FormNotificationLevel.Error, "RibbonWorkflowError");
                     }
                     else
                     {
                         Utility.AlertDialog(message, null);
                     }
                 }
                
                 foreach (Entity row in results.Entities)
                 {
                     // Run Workflow
                     ExecuteWorkflowRequest request = new ExecuteWorkflowRequest();
                     request.EntityId = entityId.Replace("{", "").Replace("}", "");
                     request.WorkflowId = row.GetAttributeValueString("workflowid");
                     OrganizationServiceProxy.BeginExecute(request, delegate(object executeState)
                     {
                         try
                         {
                             ExecuteWorkflowResponse response =
                                 (ExecuteWorkflowResponse)OrganizationServiceProxy.EndExecute(executeState);
                             if (completeCallback != null)
                             {
                                 if (response.Id == Guid.Empty.Value)
                                 {
                                     Script.Eval(completeCallback);
                                 }
                                 else
                                 {
                                     // Query until completed
                                     WaitForWorkflowToComplete(response.Id, completeCallback, errorCallback, null);
                                 }
                             }
                         }
                         catch (Exception e)
                         {
                             string stackTrace = e.StackTrace;
                             Debug.WriteLine(stackTrace);
                             Script.Eval(errorCallback);
                         }

                     });
                     break;
                 }
             });
        }
        [PreserveCase]
        public static void WaitForWorkflowToComplete(string asyncoperationid, string callbackFunction, string errorCallback, DateTime startTime)
        {
            if (startTime == null)
            {
                startTime = DateTime.Now;
            }

            OrganizationServiceProxy.BeginRetrieve("asyncoperation", asyncoperationid, new string[] { "statecode", "statuscode" }, delegate (object state)
                 {

                     Entity response = OrganizationServiceProxy.EndRetrieve(state, typeof(Entity));
                     OptionSetValue statuscode = response.GetAttributeValueOptionSet("statuscode");
                     // Check if completed/failed/cancelled (30/31/32)
                     if (statuscode != null && statuscode.Value == 30)
                     {
                         // Call the callbackfunction
                         Script.Eval(callbackFunction);
                     }
                     else if ((statuscode !=null && statuscode.Value >= 31) || ((DateTime.Now - startTime) > 180000))
                     {
                         // Timeout after 1 minute
                         // Call the error callbackfunction
                         Script.Eval(errorCallback);
                     }
                     else
                     {
                         // Poll again in another second
                         Window.SetTimeout(delegate ()
                                   {
                                       WaitForWorkflowToComplete(asyncoperationid, callbackFunction, errorCallback, startTime);
                                   }, 1000);
                     }

                 });
        }


    }
}
