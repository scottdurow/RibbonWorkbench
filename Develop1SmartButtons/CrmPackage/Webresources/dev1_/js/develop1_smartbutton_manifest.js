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
                    "ModernImage": null
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
                    "ModernImage": null
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
                            }
                        ],
                        "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunWorkflowSingle",
                        "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                    }
                    ],
                    "DisplayRuleIds": [
                    "Mscrm.HideOnModern",
                    "Mscrm.HideForTabletExperience"
                    ],
                    "EnableRuleIds": [
                    "Mscrm.FormStateNotNew",
                    "Mscrm.RunWorkflowPrimary"
                    ]
                },
                "DisplayRules": [
                {
                    "Id": "Mscrm.HideOnModern",
                    "Labels": [],
                    "IsCore": true,
                    "Steps": [],
                    "__type": "DisplayRule"
                },
                {
                    "Id": "Mscrm.HideForTabletExperience",
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
                },
                {
                    "Id": "Mscrm.RunWorkflowPrimary",
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
                    "ModernImage": null
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
                            }
                            ],
                            "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunWorkflowMultiple",
                            "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                        }
                    ],
                    "DisplayRuleIds": [
                        "Mscrm.HideOnModern",
                        "Mscrm.HideForTabletExperience"
                    ],
                    "EnableRuleIds": [
                        "Mscrm.RunWorkflowSelected",
                        "Mscrm.SelectionCountAtLeastOne"
                    ]
                },
                "DisplayRules": [
                    {
                        "Id": "Mscrm.HideOnModern",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "DisplayRule"
                    },
                    {
                        "Id": "Mscrm.HideForTabletExperience",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "DisplayRule"
                    }
                ],
                "EnableRules": [
                    {
                        "Id": "Mscrm.RunWorkflowSelected",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "EnableRule"
                    },
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
            "Label": "Callback Javascript",
            "Value": null,
            "ColSpan": 2,
            "FieldName": "callback",
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
            "Label": "Confirmation Message",
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
        }
    ]
    },

    {
        "ControlType": 0,
        "__type": "ButtonControl",
        "Id": "smartbutton.rundialog",
        "Image16by16": "$webresource:dev1_/images/rundialog16.png",
        "LabelTextText": "Run Dialog",
        "Labels": [],
        "smartButtonId": "rundialog",
        "definitions": [
        {
            "validOnForm": true,
            "validOnHomePageGrid": false,
            "validOnSubGrid": false,
            "template": {
                "Control": {
                    "__type": "ButtonControl",
                    "Id": "dev1.EntityDisplayName.RunDialogForm.Button",
                    "Labels": [
                        {
                            "Id": "Alt",
                            "LCID": 1033,
                            "Text": null
                        },
                        {
                            "Id": "LabelText",
                            "LCID": -1,
                            "Text": "$LocLabels:dev1.EntityDisplayName.RunDialogForm.Button.LabelText"
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
                            "Text": "Run Dialog"
                        }
                    ],
                    "CommandCore": "dev1.EntityDisplayName.RunDialogForm.Command",
                    "ControlType": 0,
                    "Image16by16": "$webresource:dev1_/images/rundialog16.png",
                    "Image32by32": "$webresource:dev1_/images/rundialog16.png",
                    "LabelTextText": "Run Dialog",
                    "TemplateAlias": "o1",
                    "ToolTipDescriptionText": null,
                    "ToolTipTitleText": null,
                    "AltText": null,
                    "ModernImage": null
                },
                "CommandDefinition": {
                    "Id": "dev1.EntityDisplayName.RunDialogForm.Command",
                    "Labels": [],
                    "Actions": [
                        {
                            "__type": "JavascriptFunctionCommandAction",
                            "Parameters": [
                            {
                                "__type": "StringParameter",
                                "Name": null,
                                "Value": "Test Dialog"
                            },
                            {
                                "__type": "CrmParameter",
                                "Name": null,
                                "Value": 2
                            },
                            {
                                "__type": "CrmParameter",
                                "Name": null,
                                "Value": 1
                            }
                            ],
                            "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunDialog",
                            "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                        }
                    ],
                    "DisplayRuleIds": [
                        "Mscrm.HideOnModern",
                        "Mscrm.HideForTabletExperience"
                    ],
                    "EnableRuleIds": [
                        "Mscrm.FormStateNotNew",
                        "Mscrm.RunWorkflowPrimary"
                    ]
                },
                "DisplayRules": [
                    {
                        "Id": "Mscrm.HideOnModern",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "DisplayRule"
                    },
                    {
                        "Id": "Mscrm.HideForTabletExperience",
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
                    },
                    {
                        "Id": "Mscrm.RunWorkflowPrimary",
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
                    "value": "$data.dialogname"
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
                        "Id": "dev1.EntityDisplayName.RunDialogGrid.Button",
                        "Labels": [
                        {
                            "Id": "Alt",
                            "LCID": 1033,
                            "Text": null
                        },
                        {
                            "Id": "LabelText",
                            "LCID": -1,
                            "Text": "$LocLabels:dev1.EntityDisplayName.RunDialogGrid.Button.LabelText"
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
                            "Text": "Run Dialog"
                        }
                        ],
                        "CommandCore": "dev1.EntityDisplayName.RunDialogGrid.Command",
                        "ControlType": 0,
                        "Image16by16": "$webresource:dev1_/images/rundialog16.png",
                        "Image32by32": "$webresource:dev1_/images/rundialog16.png",
                        "LabelTextText": "Run Dialog",
                        "TemplateAlias": "o1",
                        "ToolTipDescriptionText": null,
                        "ToolTipTitleText": null,
                        "AltText": null,
                        "ModernImage": null
                    },
                    "CommandDefinition": {
                        "Id": "dev1.EntityDisplayName.RunDialogGrid.Command",
                        "Labels": [],
                        "Actions": [
                        {
                            "__type": "JavascriptFunctionCommandAction",
                            "Parameters": [
                                {
                                    "__type": "StringParameter",
                                    "Name": null,
                                    "Value": "Test Dialog"
                                },
                                {
                                    "__type": "CrmParameter",
                                    "Name": null,
                                    "Value": 11
                                },
                                {
                                    "__type": "CrmParameter",
                                    "Name": null,
                                    "Value": 7
                                }
                            ],
                            "FunctionName": "SmartButtons.ClientHooks.SmartButtons.RunDialog",
                            "Library": "$webresource:dev1_/js/SmartButtons.ClientHooks.js"
                        }
                        ],
                        "DisplayRuleIds": [
                        "Mscrm.HideOnModern",
                        "Mscrm.HideForTabletExperience"
                        ],
                        "EnableRuleIds": [
                        "Mscrm.RunWorkflowSelected",
                        "Mscrm.SelectionCountExactlyOne"
                        ]
                    },
                    "DisplayRules": [
                    {
                        "Id": "Mscrm.HideOnModern",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "DisplayRule"
                    },
                    {
                        "Id": "Mscrm.HideForTabletExperience",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "DisplayRule"
                    }
                    ],
                    "EnableRules": [
                    {
                        "Id": "Mscrm.RunWorkflowSelected",
                        "Labels": [],
                        "IsCore": true,
                        "Steps": [],
                        "__type": "EnableRule"
                    },
                    {
                        "Id": "Mscrm.SelectionCountExactlyOne",
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
                    "value": "$data.dialogname"
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
            "Label": "Dialog Name",
            "Value": null,
            "ColSpan": 2,
            "FieldName": "dialogname",
            "PropertyType": "text",
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
                            "ModernImage": null,
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

