[

    {
        "ControlType": 0,
        "__type": "ButtonControl",
        "Id": "smartbutton.runreport",
        "Image16by16": "$webresource:dev1_/images/runreport16.png",
        "LabelTextText": "Run Report",
        "Customised": true,
        "HiddenBySolution": false,
        "Labels": [],
        "FlyoutOpen": false,
        "PopulateOnlyOnce": false,
        "smartButtonId": "runreport",
        "definitions": [
            {
                "validOnForm": true,
                "validOnHomePageGrid": false,
                "validOnSubGrid": false,
                "template": {
                    "Control": {
                        "__type": "ButtonControl",
                        "DisplayTypeName": "PROPERTIES: ButtonControl",
                        "Id": "dev1.EntityDisplayName.RunReport.Button",
                        "Labels": [
                            {
                                "Id": "LabelText",
                                "LCID": -1,
                                "Text": "$LocLabels:dev1.EntityDisplayName.RunReport.Button.LabelText"
                            },
                            {
                                "Id": "LabelText",
                                "LCID": 1033,
                                "Text": "Run Report"
                            }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.RunReportForm.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/runreport16.png",
                        "Image32by32": "$webresource:dev1_/images/runreport16.png",
                        "LabelTextText": "Run Report",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": "$webresource:dev1_/images/runreport.svg"
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.RunReportForm.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Account Overview"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 3
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 0
                                    }
                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunReport",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [
                            "Mscrm.ReadReport"
                        ],
                        "EnableRuleIds": [
                            "Mscrm.FormStateNotNew"
                        ]
                    },
                    "DisplayRules": [
                        {
                            "Id": "Mscrm.ReadReport",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "DisplayRule"
                        }
                    ],
                    "EnableRules": [
                        {
                            "Id": "Mscrm.FormStateNotNew",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "EnableRule"
                        }
                    ]
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[0].Value",
                        "value": "$data.ReportId"
                    }
                ]
            }

        ],
        "editableProperties": [
            {
                "Label": "Title",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "Title",
                "onlyOnCreate": true,
                "Options": null,
                "PropertyType": "text",
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Report",
                "Value": null,
                "ColSpan": 2,
                "PropertyType": "textlookup",
                "IdAttribute": "name",
                "NameAttribute": "name,id",
                "FieldName": "ReportId",
                "Options": null,
                "Disable": false,
                "Precision": 0,
                "OnlyOnCreate": false,
                "LookupFetch": "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' nolock='true'><entity name='report'> <attribute name='name'/><attribute name='reportid'/><order attribute='name' descending='false' /><filter><condition attribute='name' operator='like' value='%{0}%'/></filter></entity></fetch>"
            }
        ],
        "ParentControlID": null,
        "ParentSectionID": null,
        "TabId": null,
        "_positionBeforeDrag": null,
        "_parentLayoutSection": null,
        "_parent": null,
        "_root": null,
        "_smartButtonData": null,
        "onFlyout": false,
        "isResolved": false,
        "_customisedInCurrentSession": false,
        "VisibilityRules": null,
        "Controls": null
    },

    {
        "ControlType": 0,
        "__type": "ButtonControl",
        "Id": "smartbutton.runworkflow",
        "Image16by16": "$webresource:dev1_/images/runworkflow16.png",
        "LabelTextText": "Run Workflow",
        "Labels": [],
        "smartButtonId": "runworkflow",
        "definitions": [
            {
                "validOnForm": true,
                "validOnHomePageGrid": false,
                "validOnSubGrid": false,
                "template": {
                    "Control": {
                        "__type": "ButtonControl",
                        "Id": "dev1.EntityDisplayName.RunWorkflowForm.Button",
                        "Labels": [
                            {
                                "Id": "Alt",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": -1,
                                "Text": "$LocLabels:dev1.EntityDisplayName.RunWorkflowForm.Button.LabelText"
                            },
                            {
                                "Id": "ToolTipTitle",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "ToolTipDescription",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": 1033,
                                "Text": "Run Workflow"
                            }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.RunWorkflowForm.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/runworkflow16.png",
                        "Image32by32": "$webresource:dev1_/images/runworkflow16.png",
                        "LabelTextText": "Run Workflow",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": "$webresource:dev1_/images/runworkflow.svg"
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.RunWorkflowForm.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Test Async"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 2
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Are you sure?"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "alert('Complete')"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Value": "alert(\"error\")"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 4
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 9
                                    }

                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunWorkflowSingle",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [

                        ],
                        "EnableRuleIds": [
                            "Mscrm.FormStateNotNew"
                        ]
                    },
                    "DisplayRules": [

                    ],
                    "EnableRules": [
                        {
                            "Id": "Mscrm.FormStateNotNew",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "EnableRule"
                        }
                    ]
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[0].Value",
                        "value": "$data.workflowname"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[2].Value",
                        "value": "$data.confirm"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[3].Value",
                        "value": "$data.callback"
                    }
                    ,
                    {
                        "name": "$command.Actions()[0].Parameters()[4].Value",
                        "value": "$data.errorCallback"
                    }

                ]
            },
            {
                "validOnForm": false,
                "validOnHomePageGrid": true,
                "validOnSubGrid": true,
                "template": {
                    "Control": {
                        "__type": "ButtonControl",
                        "Id": "dev1.EntityDisplayName.RunWorkflowGrid.Button",
                        "Labels": [
                            {
                                "Id": "Alt",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": -1,
                                "Text": "$LocLabels:dev1.EntityDisplayName.RunWorkflowGrid.Button.LabelText"
                            },
                            {
                                "Id": "ToolTipTitle",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "ToolTipDescription",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": 1033,
                                "Text": "Run Workflow"
                            }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.RunWorkflowGrid.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/runworkflow16.png",
                        "Image32by32": "$webresource:dev1_/images/runworkflow16.png",
                        "LabelTextText": "Run Workflow",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": "$webresource:dev1_/images/runworkflow.svg"
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.RunWorkflowGrid.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Test Async"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 11
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Are you sure?"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "alert('Complete')"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Value": "alert(\"error\")"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 4
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 9
                                    }

                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunWorkflowMultiple",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [

                        ],
                        "EnableRuleIds": [

                            "Mscrm.SelectionCountAtLeastOne"
                        ]
                    },
                    "DisplayRules": [

                    ],
                    "EnableRules": [

                        {
                            "Id": "Mscrm.SelectionCountAtLeastOne",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "EnableRule"
                        }
                    ]
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[0].Value",
                        "value": "$data.workflowname"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[2].Value",
                        "value": "$data.confirm"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[3].Value",
                        "value": "$data.callback"
                    }
                    ,
                    {
                        "name": "$command.Actions()[0].Parameters()[4].Value",
                        "value": "$data.errorCallback"
                    }

                ]
            }
        ],
        "editableProperties": [
            {
                "Label": "Title",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "Title",
                "PropertyType": "text",
                "onlyOnCreate": true,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Workflow Name",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "workflowname",
                "PropertyType": "text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Start Workflow Confirmation Text",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "confirm",
                "PropertyType": "text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Success Callback Javascript",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "callback",
                "PropertyType": "multiline-text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Error Callback Javascript",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "errorCallback",
                "PropertyType": "multiline-text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            }
        ]
    },

    {
        "ControlType": 0,
        "__type": "ButtonControl",
        "Id": "smartbutton.runwebhook",
        "Image16by16": "$webresource:dev1_/images/webhook.png",
        "LabelTextText": "Run WebHook",
        "Labels": [],
        "smartButtonId": "runwebhook",
        "definitions": [
            {
                "validOnForm": true,
                "validOnHomePageGrid": false,
                "validOnSubGrid": false,
                "template": {
                    "Control": {
                        "__type": "ButtonControl",
                        "Id": "dev1.EntityDisplayName.RunWebHookForm.Button",
                        "Labels": [
                            {
                                "Id": "Alt",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": -1,
                                "Text": "$LocLabels:dev1.EntityDisplayName.RunWebHookForm.Button.LabelText"
                            },
                            {
                                "Id": "ToolTipTitle",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "ToolTipDescription",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": 1033,
                                "Text": "Run WebHook"
                            }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.RunWebHookForm.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/webhook.png",
                        "Image32by32": "$webresource:dev1_/images/webhook.png",
                        "LabelTextText": "Run WebHook",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": "$webresource:dev1_/images/webhook.svg"
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.RunWebHookForm.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "webhookurl"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 2
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Are you sure?"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "alert('Complete')"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Value": "alert(\"error:\" + ex.toString())"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 4
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 9
                                    }

                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunWebHookSingle",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [

                        ],
                        "EnableRuleIds": [
                            "Mscrm.FormStateNotNew"
                        ]
                    },
                    "DisplayRules": [

                    ],
                    "EnableRules": [
                        {
                            "Id": "Mscrm.FormStateNotNew",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "EnableRule"
                        }
                    ]
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[0].Value",
                        "value": "$data.webhookurl"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[2].Value",
                        "value": "$data.confirm"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[3].Value",
                        "value": "$data.callback"
                    }
                    ,
                    {
                        "name": "$command.Actions()[0].Parameters()[4].Value",
                        "value": "$data.errorCallback"
                    }

                ]
            },
            {
                "validOnForm": false,
                "validOnHomePageGrid": true,
                "validOnSubGrid": true,
                "template": {
                    "Control": {
                        "__type": "ButtonControl",
                        "Id": "dev1.EntityDisplayName.RunWebHookGrid.Button",
                        "Labels": [
                            {
                                "Id": "Alt",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": -1,
                                "Text": "$LocLabels:dev1.EntityDisplayName.RunWebHookGrid.Button.LabelText"
                            },
                            {
                                "Id": "ToolTipTitle",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "ToolTipDescription",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": 1033,
                                "Text": "Run WebHook"
                            }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.RunWebHookGrid.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/webhook.png",
                        "Image32by32": "$webresource:dev1_/images/webhook.png",
                        "LabelTextText": "Run WebHook",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": "$webresource:dev1_/images/webhook.svg"
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.RuWebHookGrid.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "webhookurl"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 11
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "Are you sure?"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "alert('Complete')"
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Value": "alert(\"error\" + ex.toString())"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 4
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 9
                                    }

                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunWebHookMultiple",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [
                        ],
                        "EnableRuleIds": [
                            "Mscrm.SelectionCountAtLeastOne"
                        ]
                    },
                    "DisplayRules": [

                    ],
                    "EnableRules": [
                        {
                            "Id": "Mscrm.SelectionCountAtLeastOne",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "EnableRule"
                        }
                    ]
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[0].Value",
                        "value": "$data.webhookurl"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[2].Value",
                        "value": "$data.confirm"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[3].Value",
                        "value": "$data.callback"
                    }
                    ,
                    {
                        "name": "$command.Actions()[0].Parameters()[4].Value",
                        "value": "$data.errorCallback"
                    }

                ]
            }
        ],
        "editableProperties": [
            {
                "Label": "Title",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "Title",
                "PropertyType": "text",
                "onlyOnCreate": true,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Web Hook Url",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "webhookurl",
                "PropertyType": "text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Start Confirmation Text",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "confirm",
                "PropertyType": "text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Success Callback Javascript",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "callback",
                "PropertyType": "multiline-text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Error Callback Javascript",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "errorCallback",
                "PropertyType": "multiline-text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            }
        ]
    },

    {
        "ControlType": 0,
        "__type": "ButtonControl",
        "Id": "smartbutton.quickjs",
        "Image16by16": "$webresource:dev1_/images/quickjs16.png",
        "LabelTextText": "Quick JS",
        "Labels": [],
        "smartButtonId": "quickjs",
        "definitions": [

            {
                "validOnForm": true,
                "validOnHomePageGrid": false,
                "validOnSubGrid": false,
                "template": {
                    "Control": {
                        "ControlType": 0,
                        "__type": "ButtonControl",
                        "Id": "dev1.EntityDisplayName.QuickJavascriptForm.Button",
                        "Image16by16": "$webresource:dev1_/images/quickjs16.png",
                        "ModernImage": "$webresource:dev1_/images/quickjs.svg",
                        "LabelTextText": "Quick JS",
                        "Labels": [],
                        "TemplateAlias": "o1",
                        "PopulateOnlyOnce": false
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.QuickJavascriptForm.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 2
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "var ids = %ids%; alert(ids[0]);"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 4
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 22
                                    }

                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.QuickJavascript",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [],
                        "EnableRuleIds": []
                    },
                    "DisplayRules": [],
                    "EnableRules": []
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[1].Value",
                        "value": "$data.jscode"
                    }

                ]
            },
            {
                "validOnForm": false,
                "validOnHomePageGrid": true,
                "validOnSubGrid": true,
                "template": {
                    "Control": {
                        "__type": "ButtonControl",
                        "Id": "dev1.EntityDisplayName.QuickJavascriptGrid.Button",
                        "Labels": [
                            {
                                "Id": "Alt",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": -1,
                                "Text": "$LocLabels:dev1.EntityDisplayName.QuickJavascriptForm.Button.LabelText"
                            },
                            {
                                "Id": "ToolTipTitle",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "ToolTipDescription",
                                "LCID": 1033,
                                "Text": null
                            },
                            {
                                "Id": "LabelText",
                                "LCID": 1033,
                                "Text": "Quick JS"
                            }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.QuickJavascriptGrid.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/quickjs16.png",
                        "Image32by32": null,
                        "LabelTextText": "Quick JS",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": "$webresource:dev1_/images/quickjs.svg",
                        "Description": null
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.QuickJavascriptGrid.Command",
                        "Labels": [],
                        "Actions": [
                            {
                                "__type": "JavascriptFunctionCommandAction",
                                "Parameters": [
                                    {
                                        "__type": "CrmParameter",
                                        "Name": null,
                                        "Value": 11
                                    },
                                    {
                                        "__type": "StringParameter",
                                        "Name": null,
                                        "Value": "var ids = %ids%; alert(ids[0]);"
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 4
                                    },
                                    {
                                        "__type": "CrmParameter",
                                        "Value": 22
                                    }

                                ],
                                "FunctionName": "SmartButtons.ClientHooks.SmartButtons.QuickJavascript",
                                "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                            }
                        ],
                        "DisplayRuleIds": [],
                        "EnableRuleIds": [
                            "Mscrm.SelectionCountAtLeastOne"
                        ]
                    },
                    "DisplayRules": [],
                    "EnableRules": [
                        {
                            "Id": "Mscrm.SelectionCountAtLeastOne",
                            "Labels": [],
                            "IsCore": true,
                            "Steps": [],
                            "__type": "EnableRule"
                        }
                    ]
                },
                "propertyExpressions": [
                    {
                        "name": "$button.LabelTextText",
                        "value": "$data.Title"
                    },
                    {
                        "name": "$command.Actions()[0].Parameters()[1].Value",
                        "value": "$data.jscode"
                    }

                ]
            }
        ],
        "editableProperties": [
            {
                "Label": "Title",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "Title",
                "PropertyType": "text",
                "onlyOnCreate": true,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            },
            {
                "Label": "Javascript Code",
                "Value": null,
                "ColSpan": 2,
                "FieldName": "jscode",
                "PropertyType": "multiline-text",
                "onlyOnCreate": false,
                "Options": null,
                "QueryCommand": null,
                "IdAttribute": null,
                "NameAttribute": null,
                "Disable": false,
                "Precision": 0
            }
        ]
    }

]