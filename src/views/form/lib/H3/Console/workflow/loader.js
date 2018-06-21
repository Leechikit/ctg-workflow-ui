import { DomCollection, ActionCollection, WorkflowMode, WorkflowSettings,
     WorkflowStyleClassName, WorkflowEventStack, WorkflowMultiActionType } from './setting';
import { PostAction } from './common';
import {Workflow} from './workflow';
import {WorkflowDocument} from './workflowDocument';
import {TraceManager} from './workflowTrace';
import {ActivityResizeStack, ActivityDragStack} from './activity/activityDrag';
import { WorkflowProperty } from './property';
import {ActivityModelInit} from './activity/activityModal';
import HTTP from "../../../../../../api/form.js"
import {Message} from "iview";

export const init = function (workflowCode,workflowMode,vm) {
    //var that = this;
    var time = new Date().getTime();
    GlobalWorkflowProperties.WorkflowMode= workflowMode;
    GlobalWorkflowProperties.WorkflowDocument=WorkflowDocument;;
    console.log(workflowCode);
    HTTP.initFlowDesigner(workflowCode)
        .then(tmp => {
     		let data = tmp.ReturnData;
		    GlobalWorkflowProperties.ActivityTemplateConfigs = data.ActivityTemplateConfigs;
		    GlobalWorkflowProperties.ClauseName = data.ClauseName;
		    GlobalWorkflowProperties.DataDisposalType = data.DataDisposalType;
		    GlobalWorkflowProperties.DataItems = data.DataItems;
		    vm.subDataMapItems=data.DataItems;
		    GlobalWorkflowProperties.PrintConfigItems = data.PrintConfigItems;
		    GlobalWorkflowProperties.SystemDataItems = data.SystemDataItems;
		    GlobalWorkflowProperties.Package = data.Package;
		    GlobalWorkflowProperties.SchemaCode = data.SchemaCode;
		    GlobalWorkflowProperties.WorkflowCode = data.WorkflowCode;
            GlobalWorkflowProperties.WorkflowVersion = data.WorkflowVersion;
            if(data.WorkflowTemplate=={}||data.WorkflowTemplate===null||data.WorkflowTemplate.Activities===null){
                GlobalWorkflowProperties.WorkflowTemplate ={
                    "StartWithForm":false,
                    "StartActivityCode":null,
                    "EndActivityCode":null,
                    "StartActivity":null,
                    "EndActivity":null,
                    "WorkflowVersion":0,
                    "WorkflowFullName":".0",
                    "Description":"",
                    "PlanUsedTime":"",
                    "Height":0,
                    "Width":0,
                    "SchemaCode":workflowCode,
                    "Activities":[
                        {
                            "ActivityType":0,
                            "DisplayName":"开始",
                            "ToolTipText":"Start",
                            "ActivityCode":"Activity1",
                            "SortKey":0,
                            "Height":42,
                            "Width":122,
                            "X":261,
                            "Y":91,
                            "IsActivity":true,
                            "IsRule":false,
                            "IsEnd":false,
                            "IsApproveActivity":false,
                            "IsClient":false,
                            "EntryCondition":1,
                            "FullName":"开始[Activity1]",
                            "FontSize":12,
                            "FontColor":"",
                            "Id":1
                        },
                        {
                            "ActivityType":1,
                            "PropertyPermissions":[
    
                            ],
                            "DisplayName":"结束",
                            "ToolTipText":"End",
                            "ActivityCode":"Activity4",
                            "SortKey":0,
                            "Height":42,
                            "Width":122,
                            "X":261,
                            "Y":391,
                            "IsActivity":true,
                            "IsRule":false,
                            "IsEnd":true,
                            "IsApproveActivity":false,
                            "IsClient":false,
                            "EntryCondition":1,
                            "FullName":"结束[Activity4]",
                            "FontSize":13,
                            "FontColor":"",
                            "Id":4
                        }
                    ],
                    "Rules":[
                        
                    ],
                    "InstanceName":"",
                    "WorkflowName":""
                }
            }
		    else{
                GlobalWorkflowProperties.WorkflowTemplate = data.WorkflowTemplate;
            }
		    GlobalWorkflowProperties.MapTypes = data.MapTypes;
		    GlobalWorkflowProperties.FirstActivityCode = data.FirstActivityCode;
		    GlobalWorkflowProperties.PresetFields = data.PresetFields;
		    GlobalWorkflowProperties.FormulaFields = data.FormulaFields;
		    GlobalWorkflowProperties.MappingProperties = data.MappingProperties;
		    GlobalWorkflowProperties.TraceManager=TraceManager;
		    GlobalWorkflowProperties.VM=vm;

		    loadFinished();
		    loadWorkflowSchemaCodes();
		    $(window).keydown(function (event) {
		        if (!(event.which == 83 && event.ctrlKey)) return true;
		        GlobalWorkflowProperties.WorkflowDocument.PublishWorkflow();
		        event.preventDefault();
		        return false;
		    });
		    window.Model_Save=function(){
		        WorkflowDocument.SaveWorkflow();
		    };
		})
		.catch(err => {
		        Message.error(err)
		}).finally(()=>{
		        
		})




        // let tmp ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Data":{"WorkflowVersion":4,"WorkflowCode":"aai4uwamf8k4sxp0fwbveabw5","SchemaCode":"aai4uwamf8k4sxp0fwbveabw5","ClauseName":"测试1","Package":{"SchemaCode":"aai4uwamf8k4sxp0fwbveabw5"},"IsSaasApp":false,"FirstActivityCode":"Activity2","AppCode":"Aa51490f21c504e81b1ca0e3d76a5ebac","PresetFields":[],"FormulaFields":[],"WorkflowTemplate":{"StartWithForm":false,"StartActivityCode":null,"EndActivityCode":null,"StartActivity":null,"EndActivity":null,"WorkflowVersion":0,"WorkflowFullName":"aai4uwamf8k4sxp0fwbveabw5.0","Description":"","PlanUsedTime":"","Height":0,"Width":0,"SchemaCode":"aai4uwamf8k4sxp0fwbveabw5","Activities":[{"ActivityType":0,"DisplayName":"开始","ToolTipText":"Start","ActivityCode":"Activity1","SortKey":0,"Height":42,"Width":122,"X":261,"Y":91,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":false,"EntryCondition":1,"FullName":"开始[Activity1]","FontSize":12,"FontColor":"","Id":1},{"ActivityType":1,"PropertyPermissions":[{"PropertyName":"ObjectId","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"Name","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"CreatedBy","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"OwnerId","Visible":true,"Editable":false,"TrackVisible":false,"Required":true,"Printable":true},{"PropertyName":"OwnerDeptId","Visible":true,"Editable":false,"TrackVisible":false,"Required":true,"Printable":true},{"PropertyName":"CreatedTime","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"ModifiedBy","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"ModifiedTime","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"WorkflowInstanceId","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"Status","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000004","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintCompanyName","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintComment","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"Printer","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintTime","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintQrCode","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000005","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000006","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true}],"DisplayName":"结束","ToolTipText":"End","ActivityCode":"Activity4","SortKey":0,"Height":42,"Width":122,"X":261,"Y":391,"IsActivity":true,"IsRule":false,"IsEnd":true,"IsApproveActivity":false,"IsClient":false,"EntryCondition":0,"FullName":"结束[Activity4]","FontSize":13,"FontColor":"","Id":4},{"ActivityType":3,"ApproveExit":"","FinishExit":"1","PermittedActions":{"Flag":2305,"Forward":true,"Consult":false,"Backward":false,"Choose":false,"Jump":false,"RejectToStart":false,"Reject":false,"RejectToAny":false,"RejectToFixed":false,"SubmitToRejectedActivity":false,"RejectToActivityCodes":[],"CancelIfUnfinished":false,"CancelIfFinished":false,"Retrieve":true,"Cancel":false,"Suspend":false,"ViewInstanceState":true,"AdjustParticipant":false,"Circulate":false,"Recirculate":false,"ViewData":false,"Assist":false,"FinishInstance":false,"PreviewParticipant":false},"ParticipateMethod":0,"WorkItemDisplayName":"","PropertyPermissions":[{"PropertyName":"CreatedBy","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"OwnerId","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"OwnerDeptId","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"CreatedTime","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"ModifiedTime","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000004","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000005","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000006","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintCompanyName","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintComment","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"Printer","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintTime","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintQrCode","Visible":true,"Editable":true,"TrackVisible":false,"Required":false,"Printable":true}],"DuplicatedParticipantPolicy":0,"NoParticipantPolicy":3,"AllowedTime":"","Participants":"{Originator}","ParticipateType":2,"DisplayName":"手工","ToolTipText":"FillSheet","ActivityCode":"Activity2","SortKey":0,"Height":42,"Width":122,"X":261,"Y":191,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":true,"EntryCondition":0,"FullName":"手工[Activity2]","FontSize":13,"FontColor":"","Id":2},{"ActivityType":4,"ApproveExit":"100%","DisapproveExit":"1","DisapproveExitType":1,"DisapproveExitActivityCode":"","FinishExit":"1","PermittedActions":{"Flag":67841,"Forward":true,"Consult":false,"Backward":false,"Choose":false,"Jump":false,"RejectToStart":false,"Reject":true,"RejectToAny":false,"RejectToFixed":false,"SubmitToRejectedActivity":false,"RejectToActivityCodes":[],"CancelIfUnfinished":false,"CancelIfFinished":false,"Retrieve":true,"Cancel":false,"Suspend":false,"ViewInstanceState":true,"AdjustParticipant":false,"Circulate":false,"Recirculate":false,"ViewData":false,"Assist":false,"FinishInstance":false,"PreviewParticipant":false},"ParticipateMethod":0,"WorkItemDisplayName":"","PropertyPermissions":[{"PropertyName":"CreatedBy","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"OwnerId","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"OwnerDeptId","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"CreatedTime","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"ModifiedTime","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000004","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000005","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"F0000006","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintCompanyName","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintComment","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"Printer","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintTime","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true},{"PropertyName":"PrintQrCode","Visible":true,"Editable":false,"TrackVisible":false,"Required":false,"Printable":true}],"DuplicatedParticipantPolicy":0,"NoParticipantPolicy":0,"AllowedTime":"","Participants":"","ParticipateType":2,"DisplayName":"审批","ToolTipText":"Approve","ActivityCode":"Activity3","SortKey":0,"Height":42,"Width":122,"X":261,"Y":291,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":true,"IsClient":true,"EntryCondition":1,"FullName":"审批[Activity3]","FontSize":13,"FontColor":"","Id":3}],"Rules":[{"DisplayName":"21","IsActivity":false,"IsRule":true,"PreActivityCode":"Activity1","PostActivityCode":"Activity2","Exclusive":false,"FixedPoint":false,"TextX":0,"TextY":0,"Points":["261,112","261,170"],"FormulaText":"","Formula":"u(c6885ff8-1cab-46d5-8364-b40a678683e5)\u003e100","FontSize":11,"FontColor":"","Id":5},{"DisplayName":"","IsActivity":false,"IsRule":true,"PreActivityCode":"Activity2","PostActivityCode":"Activity3","Exclusive":false,"FixedPoint":false,"TextX":0,"TextY":0,"Points":["261,212","261,270"],"FormulaText":"","Formula":"","FontSize":11,"FontColor":"","Id":6},{"DisplayName":"","IsActivity":false,"IsRule":true,"PreActivityCode":"Activity3","PostActivityCode":"Activity4","Exclusive":false,"FixedPoint":false,"TextX":0,"TextY":0,"Points":["261,312","261,370"],"FormulaText":"","Formula":"","FontSize":11,"FontColor":"","Id":7}],"InstanceName":"","WorkflowName":"测试1"},"ActivityTemplateConfigs":[{"ActivityType":0,"DisplayName":"开始","ToolTipText":"Start","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":false,"EntryCondition":1,"FullName":"开始[]","FontSize":0,"FontColor":null,"Id":0},{"ActivityType":1,"PropertyPermissions":null,"DisplayName":"结束","ToolTipText":"End","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":true,"IsApproveActivity":false,"IsClient":false,"EntryCondition":1,"FullName":"结束[]","FontSize":0,"FontColor":null,"Id":0},{"ActivityType":3,"ApproveExit":"100%","FinishExit":"1","PermittedActions":{"Flag":2305,"Forward":true,"Consult":false,"Backward":false,"Choose":false,"Jump":false,"RejectToStart":false,"Reject":false,"RejectToAny":false,"RejectToFixed":false,"SubmitToRejectedActivity":false,"RejectToActivityCodes":null,"CancelIfUnfinished":false,"CancelIfFinished":false,"Retrieve":true,"Cancel":false,"Suspend":false,"ViewInstanceState":true,"AdjustParticipant":false,"Circulate":false,"Recirculate":false,"ViewData":false,"Assist":false,"FinishInstance":false,"PreviewParticipant":false},"ParticipateMethod":0,"WorkItemDisplayName":null,"PropertyPermissions":null,"DuplicatedParticipantPolicy":0,"NoParticipantPolicy":0,"AllowedTime":null,"Participants":null,"ParticipateType":2,"DisplayName":"手工","ToolTipText":"FillSheet","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":true,"EntryCondition":1,"FullName":"手工[]","FontSize":0,"FontColor":null,"Id":0},{"ActivityType":4,"ApproveExit":"100%","DisapproveExit":"1","DisapproveExitType":1,"DisapproveExitActivityCode":null,"FinishExit":"1","PermittedActions":{"Flag":67841,"Forward":true,"Consult":false,"Backward":false,"Choose":false,"Jump":false,"RejectToStart":false,"Reject":true,"RejectToAny":false,"RejectToFixed":false,"SubmitToRejectedActivity":false,"RejectToActivityCodes":null,"CancelIfUnfinished":false,"CancelIfFinished":false,"Retrieve":true,"Cancel":false,"Suspend":false,"ViewInstanceState":true,"AdjustParticipant":false,"Circulate":false,"Recirculate":false,"ViewData":false,"Assist":false,"FinishInstance":false,"PreviewParticipant":false},"ParticipateMethod":0,"WorkItemDisplayName":null,"PropertyPermissions":null,"DuplicatedParticipantPolicy":0,"NoParticipantPolicy":0,"AllowedTime":null,"Participants":null,"ParticipateType":2,"DisplayName":"审批","ToolTipText":"Approve","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":true,"IsClient":true,"EntryCondition":1,"FullName":"审批[]","FontSize":0,"FontColor":null,"Id":0},{"ActivityType":2,"DisplayName":"连接点","ToolTipText":"Connection","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":false,"EntryCondition":1,"FullName":"连接点[]","FontSize":0,"FontColor":null,"Id":0},{"ActivityType":9,"SchemaCode":null,"WorkflowVersion":0,"Sync":false,"FinishStartActivity":false,"ParticipateMethod":0,"DataMaps":null,"ApproveExit":"100%","DisapproveExit":"1","FinishExit":"1","Participants":null,"ParticipateType":2,"DisplayName":"子流程","ToolTipText":"SubInstance","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":false,"EntryCondition":1,"FullName":"子流程[]","FontSize":0,"FontColor":null,"Id":0},{"ActivityType":25,"ParticipateType":3,"WorkItemDisplayName":null,"PropertyPermissions":null,"DuplicatedParticipantPolicy":0,"NoParticipantPolicy":0,"AllowedTime":null,"Participants":null,"DisplayName":"传阅","ToolTipText":"Circulate","ActivityCode":null,"SortKey":0,"Height":0,"Width":0,"X":0,"Y":0,"IsActivity":true,"IsRule":false,"IsEnd":false,"IsApproveActivity":false,"IsClient":false,"EntryCondition":1,"FullName":"传阅[]","FontSize":0,"FontColor":null,"Id":0}],"MapTypes":[{"Text":"In","Value":"0"},{"Text":"Out","Value":"1"},{"Text":"InOut","Value":"2"},{"Text":"OutAppend","Value":"3"}],"DataItems":[{"Text":"创建人","Value":"CreatedBy","ItemType":""},{"Text":"拥有者","Value":"OwnerId","ItemType":""},{"Text":"所属部门","Value":"OwnerDeptId","ItemType":""},{"Text":"创建时间","Value":"CreatedTime","ItemType":""},{"Text":"修改时间","Value":"ModifiedTime","ItemType":""},{"Text":"单行文本1","Value":"F0000004","ItemType":""},{"Text":" 日期","Value":"F0000005","ItemType":""},{"Text":" 单选框","Value":"F0000006","ItemType":""}],"SystemDataItems":{"Text":"系统数据","ChildNodes":[{"Text":"AllParticipants","ChildNodes":[]},{"Text":"InstanceId","ChildNodes":[]},{"Text":"InstanceName","ChildNodes":[]},{"Text":"OriginateTime","ChildNodes":[]},{"Text":"OriginateDate","ChildNodes":[]},{"Text":"OriginateFullTime","ChildNodes":[]},{"Text":"CurrentTime","ChildNodes":[]},{"Text":"SchemaCode","ChildNodes":[]},{"Text":"WorkflowVersion","ChildNodes":[]},{"Text":"ActivityCode","ChildNodes":[]},{"Text":"LastParticipant","ChildNodes":[{"Text":"LastParticipant","ChildNodes":[]},{"Text":"LastParticipant.Email","ChildNodes":[]},{"Text":"LastParticipant.UserCode","ChildNodes":[]},{"Text":"LastParticipant.OU","ChildNodes":[]},{"Text":"LastParticipant.UserID","ChildNodes":[]},{"Text":"LastParticipant.FullName","ChildNodes":[]},{"Text":"LastParticipant.UserName","ChildNodes":[]},{"Text":"LastParticipant.Manager","ChildNodes":[]},{"Text":"LastParticipants","ChildNodes":[]}]},{"Text":"Originator","ChildNodes":[{"Text":"Originator","ChildNodes":[]},{"Text":"Originator.Birthday","ChildNodes":[]},{"Text":"Originator.DepartureDate","ChildNodes":[]},{"Text":"Originator.EntryDate","ChildNodes":[]},{"Text":"Originator.UserID","ChildNodes":[]},{"Text":"Originator.Email","ChildNodes":[]},{"Text":"Originator.LoginName","ChildNodes":[]},{"Text":"Originator.UserName","ChildNodes":[]},{"Text":"Originator.FullName","ChildNodes":[]},{"Text":"Originator.Mobile","ChildNodes":[]},{"Text":"Originator.OfficePhone","ChildNodes":[]},{"Text":"Originator.OU","ChildNodes":[]},{"Text":"Originator.OUName","ChildNodes":[]},{"Text":"Originator.OUFullName","ChildNodes":[]},{"Text":"Originator.EmployeeNumber","ChildNodes":[]},{"Text":"Originator.IDNumber","ChildNodes":[]},{"Text":"Originator.EmployeeRank","ChildNodes":[]},{"Text":"Originator.Title","ChildNodes":[]},{"Text":"Originator.OUManager","ChildNodes":[]},{"Text":"Originator.DirectOUManager","ChildNodes":[]},{"Text":"Originator.Manager","ChildNodes":[{"Text":"Originator.Manager.Email","ChildNodes":[]},{"Text":"Originator.Manager.OU","ChildNodes":[]},{"Text":"Originator.Manager.UserID","ChildNodes":[]},{"Text":"Originator.Manager.FullName","ChildNodes":[]},{"Text":"Originator.Manager.UserName","ChildNodes":[]},{"Text":"Originator.Manager.Title","ChildNodes":[]},{"Text":"Originator.Manager.Mobile","ChildNodes":[]},{"Text":"Originator.Manager.OfficePhone","ChildNodes":[]}]}]},{"Text":"ActivityParticipant","ChildNodes":[{"Text":"ActivityParticipant","ChildNodes":[]},{"Text":"ActivityParticipant.Email","ChildNodes":[]},{"Text":"ActivityParticipant.Department","ChildNodes":[]},{"Text":"ActivityParticipant.UserID","ChildNodes":[]},{"Text":"ActivityParticipant.FullName","ChildNodes":[]},{"Text":"ActivityParticipant.UserName","ChildNodes":[]},{"Text":"ActivityParticipant.Title","ChildNodes":[]},{"Text":"ActivityParticipant.Manager","ChildNodes":[]}]},{"Text":"ActivityAllParticipants","ChildNodes":[]}]},"EffectivePropertyPermission":null,"PrintConfigItems":[{"Text":"公司名称","Value":"PrintCompanyName"},{"Text":"审批意见","Value":"PrintComment"},{"Text":"打印人","Value":"Printer"},{"Text":"打印时间","Value":"PrintTime"},{"Text":"二维码","Value":"PrintQrCode"}],"MappingProperties":[]}}};

        
          
};

export const loadWorkflowSchemaCodes=function(workflowCode){
    //let data ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Data":{"Workflows":[{"WorkflowCode":"aai4uwamf8k4sxp0fwbveabw5","WorkflowVeision":null,"DisplayName":"测试1","IconCss":"icon-cgfk","SortKey":1,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"611d0069de7e4ab09c5e2d292caa030b","WorkflowVeision":null,"DisplayName":"请假","IconCss":"icon-cgrk","SortKey":1,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"e3lt2pd9q5s33qqsvqavm15g0","WorkflowVeision":null,"DisplayName":"test","IconCss":"icon-cgfk","SortKey":3,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"acf6be7cf93c4b42b071366c5ab130dc","WorkflowVeision":null,"DisplayName":"报销","IconCss":"icon-Financial_028","SortKey":3,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001ProposalQuotation","WorkflowVeision":null,"DisplayName":"方案报价","IconCss":"icon-Financial_029","SortKey":12,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030EmployeeHire","WorkflowVeision":null,"DisplayName":"员工入职","IconCss":"icon-Financial_022","SortKey":12,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001Agreement","WorkflowVeision":null,"DisplayName":"合同协议","IconCss":"icon-Financial_034","SortKey":13,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001SalesOrder","WorkflowVeision":null,"DisplayName":"销售订单","IconCss":"icon-hr_raise","SortKey":14,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030Regular","WorkflowVeision":null,"DisplayName":"员工转正","IconCss":"icon-Personnel_015","SortKey":14,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030StaffContract","WorkflowVeision":null,"DisplayName":"合同续签","IconCss":"icon-Financial_020","SortKey":15,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001FaPiao","WorkflowVeision":null,"DisplayName":"销售发票","IconCss":"icon-Financial_025","SortKey":15,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001Receipt","WorkflowVeision":null,"DisplayName":"收款记录","IconCss":"icon-Financial_022","SortKey":16,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030Resignation","WorkflowVeision":null,"DisplayName":"员工离职","IconCss":"icon-Sales_010","SortKey":16,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001ExpensesClaim","WorkflowVeision":null,"DisplayName":"费用报销","IconCss":"icon-Personnel_008","SortKey":21,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000001MarketingActivity","WorkflowVeision":null,"DisplayName":"市场活动","IconCss":"icon-Financial_026","SortKey":26,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030AssetsClass","WorkflowVeision":null,"DisplayName":"资产类别","IconCss":"icon-Sales_024","SortKey":54,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030AssetsGrant","WorkflowVeision":null,"DisplayName":"资产发放","IconCss":"icon-Sales_013","SortKey":56,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"D000030AssetRetirement","WorkflowVeision":null,"DisplayName":"资产报废","IconCss":"icon-Personnel_024","SortKey":58,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"kgnnnd2uicaciri225rw74tw1","WorkflowVeision":null,"DisplayName":"测试2","IconCss":"icon-dbtj","SortKey":216,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"aq10cbxa3xr37few6n4zie7w2","WorkflowVeision":null,"DisplayName":"test1","IconCss":"icon-Financial_012","SortKey":219,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"wtprygsn5yhp3cpezlqq8i7i4","WorkflowVeision":null,"DisplayName":"1234","IconCss":"icon-cgrk","SortKey":221,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"zk3cjwu3urpsrs4pc0toqr064","WorkflowVeision":null,"DisplayName":"123","IconCss":"icon-cgfk","SortKey":227,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"g0rxq4p3zhto3z3rdpofdrun5","WorkflowVeision":null,"DisplayName":"111","IconCss":"icon-cgfk","SortKey":231,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"s0gu6xu4cqjwjvjpbypyq6c14","WorkflowVeision":null,"DisplayName":"去1111","IconCss":"icon-cgfk","SortKey":232,"ChildMyworkflow":[],"AppCode":null},{"WorkflowCode":"x0sw43fqqmvut8rk7wnfomz27","WorkflowVeision":null,"DisplayName":"111","IconCss":"icon-cgfk","SortKey":233,"ChildMyworkflow":[],"AppCode":null}]}}};

    // PostAction(ActionCollection.ActonName_GetWorkflowClause, { "WorkflowCode": workflowCode }, function (data) {
    //     if (data.Successful) {
    //         data = data.ReturnData.Data;
    //         if (data.Workflows != null && data.Workflows.length > 0) {
    //             for (var i = 0; i < data.Workflows.length; i++) {
    //                 var str = "<option ";
    //                 str += " value=\'" + data.Workflows[i].WorkflowCode + "\'>" + data.Workflows[i].DisplayName + "</option>";
    //                 $(".ws").append(str);
    //             }
    //             $(".ws").DropDownList("Refresh");
    //         }
    //     }
        
    // });
    HTTP.getWorkflowClause().then((data)=>{
        if (data.code==0) {
            data = data.data;
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var str = "<option ";
                    str += " value=\'" + data[i].appId + "\'>" + data[i].displayName + "</option>";
                    $(".ws").append(str);
                }
                $(".ws").DropDownList("Refresh");
            }
        }
        else{
            Message.error(data.msg); 
        }
    })


    
};

export const loadFinished = function() {
    //流程模板对象
    GlobalWorkflowProperties.Workflow=new Workflow(DomCollection.Workspace);

    //使用Svg
    GlobalWorkflowProperties.Workflow.UtilizeSvg = true;
    GlobalWorkflowProperties.SVG = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        .addClass('workspace_svg')
        .attr('version', '1.1');
    GlobalWorkflowProperties.SVG.css('width', '100%').css('height', '100%');
    $(GlobalWorkflowProperties.Workflow.workspace).children(':first').before(GlobalWorkflowProperties.SVG);

    if (GlobalWorkflowProperties.WorkflowMode === WorkflowMode.Designer ||
        GlobalWorkflowProperties.WorkflowMode === WorkflowMode.ViewWithProperty) {
            $('.h3-lnk-bar')
            .css('display','block')
            .css('transform', 'translate3d(160px, 0px, 0px)');
            $("#WorkFlowSet").css({ "transform": "translateX(0px) translateZ(0px)" });
            $("#ActivitySet").css({ "transform": "translateX(-100%) translateZ(0px)" }); 
        $(".property-tabs").on("click.tabs", 'a', function () {
            var $that = $(this);
            $('.normal-message').hide();
            if ($that.attr("id") == "btn_WorkFlowSet") {
                //选中流程属性切换
                $('.h3-lnk-bar')
                    .css('display','block')
                    .css('transform', 'translate3d(160px, 0px, 0px)');
                
                if(!$("#WorkFlowSet").hasClass('active')){  
                    $("#WorkFlowSet").addClass('active');
                    $("#ActivitySet").removeClass('active');
                    $("#ActivitySet").hide();
                    $("#WorkFlowSet").find("div[group]").show();
                    $("#WorkFlowSet").css({ "transform": "translateX(0px) translateZ(0px)" });
                    $("#ActivitySet").css({ "transform": "translateX(-100%) translateZ(0px)" });   
                }
            }else{
                //选中节点属性
                $('.h3-lnk-bar')
                .css('display','block')
                .css('transform', 'translate3d(20px, 0px, 0px)');
                if(!$("#ActivitySet").hasClass('active')){
                    $("#ActivitySet").addClass('active');
                    $("#WorkFlowSet").removeClass('active');
                    $("#ActivitySet").show();
                    $("#WorkFlowSet").find("div[group]").hide();
                    $( $("#ActivitySet").attr("data-target")).show().siblings(".pro-item").hide();
                    $("#ActivitySet").css({ "transform": "translateX(0px) translateZ(0px)" });
                    $("#WorkFlowSet").css({ "transform": "translateX(200%) translateZ(0px)" });
        
                }
                if(GlobalWorkflowProperties.Workflow.selectedActivities.length>0){
                    $('.normal-message').hide();
                }else{
                    var flag=false;
                    for(let line of GlobalWorkflowProperties.Workflow.lines){
                        if(line.isSelected){
                            flag=true;
                        }
                    }
                    if(!flag){
                        $('.normal-message').show();
                    }
                }
            }
        })
        GlobalWorkflowProperties.Wp = new WorkflowProperty(WorkflowDocument);
    }

    ActivityModelInit(GlobalWorkflowProperties.ActivityTemplateConfigs);

    //宽和高
    $(GlobalWorkflowProperties.Workflow.workspace).width(WorkflowSettings.MinInnerWidth);
    $(GlobalWorkflowProperties.Workflow.workspace).height(WorkflowSettings.MinInnerHeight);

    //在流程图中添加点击时自动生成活动和线条的箭头
    if ($(GlobalWorkflowProperties.Workflow.workspace).find('.' + WorkflowStyleClassName.WorkflowAotuArrow).length === 0) {
        var arrow = $("<div class='" + WorkflowStyleClassName.WorkflowAotuArrow + "'></div>");
        arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowLeft).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowUp).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowRight).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowDown).appendTo(GlobalWorkflowProperties.Workflow.workspace);
    }

    //在流程图中添加活动移动时对齐的线
    if ($(GlobalWorkflowProperties.Workflow.workspace).find('.' + WorkflowStyleClassName.ActivityDockLine).length === 0) {
        //<div class='dock_line dock_line_horizontal dock_line_top'></div>
        var dockLine = $("<div class='" + WorkflowStyleClassName.ActivityDockLine + "' ></div>");
        var dockLineHorizontal = dockLine.clone().addClass(WorkflowStyleClassName.ActivityDockLineHorizontal);
        dockLineHorizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineTop).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        dockLineHorizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineMiddle).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        dockLineHorizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineBottom).appendTo(GlobalWorkflowProperties.Workflow.workspace);

        var dockLineVertical = dockLine.clone().addClass(WorkflowStyleClassName.ActivityDockLineVertical);
        dockLineVertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineOffsetLeft).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        dockLineVertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineCenter).appendTo(GlobalWorkflowProperties.Workflow.workspace);
        dockLineVertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineRight).appendTo(GlobalWorkflowProperties.Workflow.workspace);
    }

    if (typeof (GlobalWorkflowProperties.WorkflowTemplate) !== 'undefined' && GlobalWorkflowProperties.WorkflowTemplate) {
        WorkflowDocument.LoadWorkflow(GlobalWorkflowProperties.WorkflowTemplate, false);
    } else if (typeof (GlobalWorkflowProperties.WorkflowCode) !== 'undefined' && GlobalWorkflowProperties.WorkflowCode) {
        //WorkflowDocument.InitWorkflow(decodeURI($.fn.getUrlParam('WorkflowCode')));
        WorkflowDocument.InitWorkflow(GlobalWorkflowProperties.WorkflowCode);
    }


    var outerContainerSize = {
        width: $(GlobalWorkflowProperties.Workflow.outerContainer).css('width'),
        height: $(GlobalWorkflowProperties.Workflow.outerContainer).css('height')
    };

    // if (workflowMode == WorkflowMode.Designer) {
    //     thumbnail_container = $('.div-thumbnail');
    // }
    var _MonitorWorkflowSize = function () {
        //活动拖动\调整大小时不处理
        if (!ActivityDragStack.IsDragging && !ActivityResizeStack.Resizing &&
             (!WorkflowEventStack.CurrentMultiAction ||
            WorkflowEventStack.CurrentMultiAction === WorkflowMultiActionType.None) &&
            $(GlobalWorkflowProperties.Workflow.workspace).is(':visible')) {
            if (outerContainerSize.width !== $(GlobalWorkflowProperties.Workflow.outerContainer).css('width') ||
                outerContainerSize.height !== $(GlobalWorkflowProperties.Workflow.outerContainer).css('height')) {
                outerContainerSize.width = $(GlobalWorkflowProperties.Workflow.outerContainer).css('width');
                outerContainerSize.height = $(GlobalWorkflowProperties.Workflow.outerContainer).css('height');
                GlobalWorkflowProperties.Workflow.autoFit();
                //更新缩略图
                if (typeof (TraceManager) !== 'undefined' && TraceManager.UpdateThumbnail){
                    TraceManager.UpdateThumbnail();
                }
            }
        }
        setTimeout(_MonitorWorkflowSize, 200);
    };

    // //监控流程设计区域大小变化
    setTimeout(_MonitorWorkflowSize, 200);
    $(DomCollection.PropertyContainer).show();
    GlobalWorkflowProperties.Wp.DisplayProperties(GlobalWorkflowProperties.Workflow);
    $(DomCollection.Group_WorkflowBasic).addClass('Expanded').show();
};



// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/loader.js