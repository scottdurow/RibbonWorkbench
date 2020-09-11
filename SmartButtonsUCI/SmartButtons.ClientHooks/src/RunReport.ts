/* eslint-disable @typescript-eslint/no-unused-vars */

import { normaliseGuid } from "./Helpers";

/* eslint-disable @typescript-eslint/no-namespace */

export async function RunReport(reportName: string, recordId: string, etc: string): Promise<void> {
  // Get the name of the workflow
  const fetch = `<fetch count='1'>
        <entity name='report'>
            <attribute name='reportid'/>
            <filter type='and'>
                <condition attribute='name' operator='eq' value='${reportName}'/>
            </filter>
        </entity>
        </fetch>`;

  const response = await Xrm.WebApi.retrieveMultipleRecords("report", "?fetchXml=" + fetch);
  if (response && response.entities.length > 0) {
    const id = encodeURIComponent(normaliseGuid(response.entities[0].reportid));
    const orgUrl = Xrm.Utility.getGlobalContext().getClientUrl();

    const reportUrl =
      orgUrl +
      "/crmreports/viewer/viewer.aspx?action=run&id=%7b" +
      id +
      "%7d&records=%7b" +
      normaliseGuid(recordId) +
      "%7d&context=records&recordstype=" +
      etc;
    Xrm.Navigation.openUrl(reportUrl);
  }
}
