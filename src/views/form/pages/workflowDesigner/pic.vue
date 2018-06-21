<style>
</style>

<template>
  <div id="app">
    <header>
      <designer-top-nav :title="title" :schema-code="schemaCode" :app-code="appCode" :type="type"></designer-top-nav>
    </header>
    <div class="myContainer">
      <div  v-if="isNeedStartWF">
        <div class="wrapper-start">
          <div class="btn-start" @click="startWF()">
              开启表单流程
            </div>
          <div class="wf-description">
            开启表单流程，设置流转条件搭建工作流表单
          </div>
          <div class="wf-help">
            如有问题，请参考<a href="https://home.h3yun.com/help/word.php?CateId=58" target="_blank" >帮助文档</a>
          </div>

        </div>
      </div>
      <div class="wrapper-content" v-if="!isNeedStartWF">
        <div class="toolbar" >
            <ul>
                <li id='btnUndo' :class="[canUndo?'normal':'forbidden']"  @click='undo()' title="撤销(Ctrl+Z)">
                    <Icon type="ios-undo"style="font-size:22px!important;margin-top:12px!important"></Icon>
                </li>
                <li id='btnRedo' :class="[canRedo?'normal':'forbidden']"  @click='redo()' title="恢复(Ctrl+Y)">
                    <Icon type="ios-redo" style="font-size:22px!important;margin-top:12px!important"></Icon>
                </li>
                <li  class="vertical-divider"></li>
                <li id='btnSize' @click='setSameSize()' title="等大小">
                    <span class="icon-dengdaxiao"></span>
                    等大小
                </li>
                <li class="vertical-divider"></li>
                <li id='btnWidth'  @click='setMiddle()' title="水平对齐">
                    <span class="icon-hengpaiduiqi"></span>
                    水平对齐
                </li>
                <li class="vertical-divider"></li>
                <li id='btnHeight'  @click='setCenter()' title="垂直对齐">
                    <span class="icon-shupaiduiqi"></span>
                    垂直对齐
                </li>
                <li class="vertical-divider"></li>
                <li id='btnHorizontal'  @click='setSameHorizontalDistance()' title="水平等距">
                    <span class="icon-hengpaidengju"></span>
                    水平等距
                </li>
                <li class="vertical-divider"></li>
                <li id='btnVertical'  @click='setSameVerticalDistance()' title="垂直等距">
                    <span class="icon-shupaidengju"></span>
                    垂直等距
                </li>
                <li class="vertical-divider"></li>
                <li  @click='remove()' title="删除(节点,连接线)">
                    <Icon type="trash-a" style="color:red;font-size:22px!important"></Icon>
                </li>
            </ul>
            <div class='btnSave' @click="save()" >
                保存
            </div>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="activity-template-container model_container">
              <div class="activity-template-title">节点</div>
              <div class="node_container">                 
              </div>
              <div class="activity-template-title">子流程</div>
              <div class="subinstance_contanier"></div>
              <div class="activity-template-title">连接线</div>
              <div class="activity-template-node" :class="[lineSelected?'active':'']" @click="showAssistLine">
                  <Icon type="arrow-graph-up-right" style="color: #46b2fe;font-size:20px!important"></Icon>
              </div>
            </div>
          </div>
          <div class="content-main" id="divDesigner">
            <div class="workspace_container" style="width:100%;height:100%;">
                <div class="workspace">
                </div>
            </div>
          </div>
          <div class="content-right" >
            <div id="divPropertyContainer" style="overflow:auto;display:none;height:100%;" position="right" >
                <div class="property-tabs clearfix">
                    <div class="h3-lnk-bar"></div>
                    <a href="javascript:void(0);" id="btn_ActivitySet" data-target="#ActivitySet" >节点属性</a>
                    <a href="javascript:void(0);" id="btn_WorkFlowSet" class="active"  data-target="#WorkFlowSet">流程属性</a>
                </div>
                <div id="WorkFlowSet" class="pro-item">
                    <div class="PropertyTable">
                        <div group='WorkflowBasic' property='SchemaCode'>
                            <div class='property-title'>流程编码</div>
                            <div class='property-value readonly' >
                                <input type="text" readonly style="border:none;" />
                            </div>
                        </div>
                        <!-- <div group='WorkflowBasic' >
                            <div class="workflow-close" @click="closeWorkflow()">关闭流程</div>
                        </div> -->
                    </div>
                </div>
                <div id="ActivitySet" class="pro-item">
                    <div class="PropertyTable" target="LineBasic">
                        <div group="LineBasic" property="DisplayName">
                            <div class='property-title'>连接线名称</div>
                            <div class='property-value property-value-input'>
                                <input type="text" maxlength="32" />
                            </div>
                        </div>
                         <div group="LineBasic" property="Formula" style="border-bottom:0;">
                            <div class='property-title'>节点流转条件</div>
                            <div class='property-value line'>
                                <div>
                                    <select class="form-control">
                                        <option value="1">自定义条件</option>
                                        <option value="0">使用else条件</option>
                                        
                                    </select>
                                </div>
                                <div class="default">
                                    <div class="description">
                                        当不满足同级的所有条件时，进入这条连接线下的节点。
                                    </div>
                                </div>
                                <div class="custom">
                                    <div class="description">
                                        当满足设置条件时，进入这条连接线下的节点；不设
                                        置条件时，默认都会进入这条连接线下的节点。
                                    </div>
                                    <div class="property-set" @click="setLineFormula()">
                                        <div class="trigger">设置条件</div>
                                        <!-- <span class="icon icon-on"></span> -->
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>      
                    <div class="PropertyTable" target="ActivityBasic">
                        <div group="ActivityBasic" property="ActivityCode">
                            <div class='property-title'>节点编码</div>
                            <div class='property-value property-value-input'>
                              <input type="text" v-if="!isDeveloper" maxlength="32" disabled="disabled" />
                              <input type="text" v-else maxlength="32" class="needCheckCharacter" />
                            </div>
                        </div>
                        <div group="ActivityBasic" property="DisplayName">
                            <div class='property-title'>节点名称</div>
                            <div class='property-value property-value-input'>
                               <input type="text" maxlength="18" class="displayname needCheckCharacter" />
                            </div>
                            <div class="activity-description">
                                需要多个节点均处理完后才进入下一节点的场景，可用汇合点来实现，先进入汇合点，再统一进入下一节点。
                            </div>
                        </div>
                         <div  class="setting-toggle" style="display:none;">
                            <div  class="basic-setting">基础设置</div>
                            <div  class="priority-setting">高级设置</div>
                        </div>
                        <!--子流程节点 -->
                        <div group="SubInstanceTemplate" target="basic-setting" property="SchemaCode">
                            <div class='property-title'>
                                选择已有流程
                                <i data-tip="流转到此节点时，将自动创建子流程，子流程根据自身设置的规则流转" class='icon-tooltip icon-tips' ></i>
                            </div>
                            <div class='property-value priority'>
                                <select class="form-control ws">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div group="Participant" target="basic-setting" property="Participants">
                            <div class='property-title'>
                                <span class="content-replace"></span>
                                <i  data-tip="有多个发起人时，会给每个发起人创建一条流程" class='icon-tooltip icon-tips' ></i>                                
                            </div>
                            <div class='property-value ' @click="setParticipant()">
                               <div class="trigger">
                                   <span class="default ">点击设置<span class="content-replace"></span></span>
                                   <span class="custom" style="display:none;"></span>
                                </div>
                               <!-- <span class="icon icon-on"></span> -->
                            </div>
                        </div>
                        <div group="SubInstanceDataMaps" target="basic-setting" property="DataMaps">
                            <div class='property-title'>
                                数据流转规则
                                <i  data-tip="父流程与子流程间的数据相互填充" class='icon-tooltip icon-tips' ></i>                                
                            </div>
                            <div class='property-value '>
                               <div class="trigger" @click="setSubinstanceDataMap()">
                                   <span class="default ">设置规则</span>
                                </div>
                               <!-- <span class="icon icon-on"></span> -->
                            </div>
                        </div>
                        <div group="DataItem" target="basic-setting" property="PropertyPermissions">
                            <div class='property-title'>
                                操作权限
                                <i data-tip='所有字段均未设置可写时，之前节点已参与过经办的人员在此节点会自动跳过，不再参与' class='icon-tooltip icon-tips'></i>
                            </div>
                            <div class='property-value table-wrapper'>
                                <table style="border-width: 0px; width: 100%">
                                    <tr style="line-height: 12px; border-bottom:1px solid #ddd;">
                                        <td></td>
                                        <td></td>
                                        <td style="text-align: left">
                                            <input type="checkbox" id="AllEnabelShow" /><label for="AllEnabelShow">可见</label>
                                        </td>
                                        <td style="text-align: left">
                                            <input type="checkbox" id="AllEnabelEdit" /><label for="AllEnabelEdit">可写</label>
                                        </td>
                                        <td style="text-align: left">
                                            <input type="checkbox" id="AllNeeded" /><label for="AllNeeded">必填</label>
                                        </td>
                                        <td style="text-align: left">
                                            <input type="checkbox" id="AllEnabelPrint" /><label for="AllEnabelPrint">打印</label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div group="SubInstanceRule" target="priority-setting" property="FinishStartActivity">
                            <div class='property-title'>
                                子流程发起后自动提交
                                <i  data-tip="选择“否”，系统仅创建子流程表单;<br/>
                                    选择“是”，系统创建子流程表单并自动提交，进入子流程下一节点。" class='icon-tooltip icon-tips' ></i>                                
                            </div>
                            <div class='property-value priority priority-radio'>
                                <div class="radio-container">
                                    <input type="radio" name='FinishStartActivity' id="fsay" checked />
                                    <label for="fsay" >是</label>
                                </div>
                                <div class="radio-container">
                                    <input type="radio" name='FinishStartActivity' checked id="fsan" />
                                    <label for="fsan" >否</label>
                                </div>
                            </div>
                        </div>
                        <div group="SubInstanceRule" target="priority-setting" property="Sync">
                            <div class='property-title'>
                                父流程在当前子流程结束后才结束                            
                            </div>
                            <div class='property-value priority priority-radio'>
                                <div class="radio-container">
                                    <input type="radio" id="syncy" name='Sync' value="true" />
                                    <label for="syncy" >是</label>
                                </div>
                                <div class="radio-container">
                                    <input type="radio" name='Sync' id="syncn" checked value="false" />
                                    <label for="syncn" >否</label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- <div group="ActivityRule" target="priority-setting" property="ParticipateMethod">
                            <div class='property-title' v-if="curActivity && curActivity.ToolTipText==='FillSheet'">节点经办人为多人时，业务处理顺序</div>
                            <div class='property-title' v-else>节点审批人为多人时，业务处理顺序</div>
                            <div class='property-value priority'>
                                <select class="form-control" >
                                    <option value="0" >所有经办人同时处理</option>
                                    <option value="1">按经办人设置顺序依次处理</option>
                                </select>
                            </div>
                        </div> -->
                        <div group="ActivityRule" target="priority-setting" property="ApproveExit">
                            <div class='property-title'>节点流转规则</div>
                            <div class='property-value priority' >
                               <div class="description" v-show="curActivity">
                                   <span v-if="curActivity && curActivity.ToolTipText==='FillSheet'">{{approveExit=='100%'?'所有':'有'+approveExit}}人提交时进入下一节点</span>
                                   <span v-if="curActivity && curActivity.ToolTipText==='Approve'">{{approveExit=='100%'?'所有':'有'+approveExit}}人同意时进入下一节点，有{{disapproveExit}}人不同意时{{disapproveExitActivityName}}</span>
                               </div>
                               <a href="javascript:;" class="trigger" @click="setActivityRule()">修改规则</a>
                            </div>
                        </div>
                        <!-- <div group="ActivityRule" target="priority-setting" property="NoParticipantPolicy">
                            <div class='property-title' v-if="curActivity && curActivity.ToolTipText==='FillSheet'">找不到经办人时</div>
                            <div class='property-title' v-else>找不到审批人时</div>
                            <div class='property-value priority'>
                                <select class="form-control">
                                    <option value="0">交给系统管理员经办</option>
                                    <option value="3">自动进入下一节点</option>
                                </select>
                            </div>
                        </div>
                        <div group="NotificationMessage" target="priority-setting" property="WorkItemDisplayName">
                            <div class='property-title'>
                                节点消息通知
                                <i data-tip='可定义流程流转到节点时，<span></span>接收到的消息内容' class='icon-tooltip icon-tips content-replace'></i>
                            </div>
                            <div class='property-value priority'>
                                <select class="form-control" v-model="notifyMessageType">
                                    <option value="0">使用系统默认通知</option>
                                    <option value="1">自定义通知</option>
                                </select>
                                <div class="default" >
                                    默认消息为"{创建人}+的+{表单名称}+需要您审批"
                                </div>
                                <div class="custom"  @click="setNotifyMessage()" style="margin-top:5px;">
                                    <div class="trigger">设置消息内容</div>
                                    <span class="icon icon-on"></span>
                                </div>
                            </div>
                        </div>
                        <div group="ActivityRule" target="priority-setting" property="AllowedTime">
                            <div class='property-title'>
                                <span v-if="curActivity && curActivity.ToolTipText==='FillSheet'">经办限时</span>
                                <span v-else>审批限时</span>                                 
                                 <i  data-tip='节点不存在必填项时,若设定时间内<span></span>未处理,则系统将<span></span>(设置后半小时内容生效)' class='icon-tooltip icon-tips content-replace'></i>
                            </div>
                            <div class='property-value priority'>
                                <select class="form-control">
                                    <option value="0">不限时</option>
                                    <option value="1">自定义时间</option>
                                </select>
                                <div class="custom" style="display:none; margin-top:5px;">
                                    <input type="text" class='allowedtime' /> <span>小时</span>
                                </div>
                            </div>
                        </div> -->
                        
                        
                    </div>
                    <div class="normal-message">
                        请先选择节点或连接线
                    </div>
                </div>             
            </div>
          </div>
        </div>
      </div>
    </div>
    <participant 
        :schema-code="schemaCode"
        :title="participantText" 
        :showFlag="participantShow"
        :formula="participants"
        @cancel="calcelParticipantSetting"
        @ok="okParticipantSetting">
    </participant>
    <subinstance 
        :schema-code="subinstanceSchemaCode"
        :title="subinstanceDataMapText" 
        :showFlag="subinstanceDataMapShow"
        :rules="subinstanceDataMapRules"
        :data-items="subDataMapItems"
        @cancel="cancelSubInstanceDataMap"
        @ok="okSubInstanceDataMap">
    </subinstance>
    <activityrule 
        :title="activityRuleText" 
        :showFlag="activityRuleShow"
        :activity="curActivity"
        :activitys="allActivitys"
        @cancel="cancelActivityRule"
        @ok="okActivityRule">
        
    </activityrule>
    <expression 
    :title="formulaTitle"
    :showFlag="formulaShow"
    :formula-type="formulaType"
    :schema-code="schemaCode"
    :formula="formula"
    :formula-text="formulaText" 
    @cancel="cancelExpressionSetting"
    @ok="okExpressionSetting">
    </expression>
  </div>
</template>

<script>
import DesignerTopNav from "../../components/console/designer-top-nav";
import participant from '../../components/workflowdesigner/participant';
import subinstance from '../../components/workflowdesigner/subinstancedatamap';
import activityrule from '../../components/workflowdesigner/activityrule';
import expression from '../../components/workflowdesigner/expression';
import { getMenuInfo, startWorkflow, closeWorkflow,GetDataItemsByWorkflowCode } from '../../service/getData';
import { WorkflowMode,WorkflowSettings } from '../../lib/H3/Console/workflow/setting';
import '../../lib/H3/H3Plugins/H3.plugins.system';
import '../../lib/H3/Console/workflow/tinytip';
import '../../lib/H3/Console/workflow/global';
import {init} from '../../lib/H3/Console/workflow/loader';
import '../../lib/plugins/chosen/chosen.jquery.min';
//import '../../lib/H3/Console/workflow/misc';
import '../../lib/H3/tooltip';
import '../../lib/H3/H3Plugins/modal.js';
import HTTP from'../../../../api/form.js';

//import '../../lib/plugins/chosen/chosen.min.css';
import "../../lib/plugins/DropDownList/DropDownList.js";
//import "../../lib/plugins/DropDownList/DropDownList.css";
// import "src/assets/css/H3/tipbox.css"
// import 'src/assets/css/tools/style.css';
// import 'src/assets/css/workflow/designer.css';
// import 'src/assets/css/workflow/modal.css';
// import '../../lib/plugins/craftpip-jquery-confirm/jquery-confirm.min.css';

export default {
    name: 'workflow',
    data () {
        return {
            type: 'workflow',
            schemaCode: '',
            displayName: '',
            title: '',
            appCode: '',
            isNeedStartWF: false,
            nodeType: null,
            icon: null,
            isBoSheet: false,
            isSaasApp: false,
            isSpecialApp: false,
            isDeveloper: false,
            participantText: '参与者设置',
            participantShow: false,
            participants:null, //每个节点的参与者设置
            workflowMode: WorkflowMode.Designer,
            subinstanceDataMapText:'数据流转规则',
            subinstanceDataMapShow: false,
            subinstanceDataMapRules: null,
            subinstanceSchemaCode:null,
            subDataMapItems:[],
            activityRuleText: '节点流转规则',
            activityRuleShow: false,
            curActivity: null,
            allActivitys: [],
            formulaShow:false,
            formulaType:null,
            formulaText: null,
            formula:null,
            formulaTitle:'节点实例名称设置',
            lineSelected: false,
            deleteModal:null,
            canUndo: false,//是否可以撤销
            canRedo: false, //是否可以恢复
            highlightRemove: false //高亮显示删除
            
        };
    },
    components: {
        DesignerTopNav,
        participant,
        subinstance,
        activityrule,
        expression
    },
    created () {
        GlobalWorkflowProperties.VueInstance=this;
        //this.schemaCode = window.location.search.split('?')[1].split('=')[1];
        this.schemaCode = this.$route.params.appId;
        this.getWorkflowInfo(this.schemaCode);
        // this.startWF();


    },
    methods: {
        async getWorkflowInfo (schemaCode) {
            //let res = await getMenuInfo(schemaCode);

            HTTP.getMenuInfo(schemaCode)
                .then(res => {
                    if (res.ReturnData) {
                            let data = res.ReturnData;
                            this.displayName = data.DisplayName;
                            this.title = this.displayName;
                            //document.title='氚云-流程设计-'+this.displayName;
                            this.appCode = this.$route.params.appId;
                            this.isNeedStartWF = data.IsNeedStartWF;
                            this.nodeType = data.NodeType;
                            this.icon = data.Icon;
                            this.isDeveloper= data.IsDeveloper;
                            this.isBoSheet = data.IsBoSheet;
                            this.isSaasApp = data.IsSaasApp;
                            this.isDetachApp= data.IsDetachApp;
                            GlobalWorkflowProperties.IsDeveloper=this.isDeveloper;
                            GlobalWorkflowProperties.IsSaasApp=this.isSaasApp;
                            GlobalWorkflowProperties.IsDetachApp=this.isDetachApp;
                            
                            if (!this.isNeedStartWF){
                                init(this.schemaCode, this.workflowMode,this);
                            }
                        } else {
                            //  错误 弹框提示
                        }
            })
            .catch(err => {
    
            }).finally(()=>{

            })


            // let res={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"AppCode":"Acddd8f7643d946a3a22beb54648b157f","DisplayName":"AAA","IsDeveloper":false,"IsNeedStartWF":false,"NodeType":210,"Icon":"icon-cgfk","IsBoSheet":true,"IsSaasApp":false,"IsDetachApp":false}}
            //  setTimeout(() => {
                    
            //     }, 2000);
            
        },
        startWF () {
            this.start(this.schemaCode);
            
        },
        async start(schemaCode){
            let res={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"AppCode":"Acddd8f7643d946a3a22beb54648b157f","DisplayName":"AAA","IsDeveloper":false,"IsNeedStartWF":false,"NodeType":210,"Icon":"icon-cgfk","IsBoSheet":true,"IsSaasApp":false,"IsDetachApp":false}};
            if (res.Successful){
                //window.location.reload();
                this.isNeedStartWF = false;
                init(schemaCode, this.workflowMode,this);
            }
            
        },
        async close(schemaCode){
            let res=await closeWorkflow(schemaCode);
            if (res.Successful){
                
                window.location.reload();
            }
        },
        save(){
            GlobalWorkflowProperties.WorkflowDocument.PublishWorkflow();
        },
        closeWorkflow(){
            if(this.appCode==='Sys_Workflow'){
                $.IShowWarn('流程中心内流程不允许删除');
                return;
            }
            var that=this;
            var Actions = [{
                Key: "btn_OK",
                Text: "关闭",
                Theme: 'btn_delete',
                CallBack: function () {
                    that.close(that.schemaCode);
                }
            },
            {
                Text: '取消',
                Theme: 'btn_cancel',
                CallBack: function () {
                    that.deleteModal.hide();
                }
            }];
            var $contentDelete = $('<div style="text-align:center;"><p><i class="icon-exclamation-circle" style="font-size:52px;color:#f0ad4e;margin-top:9px;"></i></p><p style="font-size:20px;color:#333;margin:5px 0;">关闭流程</p><p style="font-size:14px;color:#666">流转中的数据将停止流转，流转完成的数据其流程信息将丢失</p></div')
            that.deleteModal = new $.IModal({
                Title: '关闭流程',
                Width: 420,
                Height: 233,
                ShowBack: true,
                HasIframe: false,
                Content: $contentDelete,
                ToolButtons: Actions,
                ContentUrl: ''
            });
            
        },
        undo(){
            if(!this.canUndo){
                return;
            }
            this.canRedo=true;
            GlobalWorkflowProperties.TraceManager.Undo();
        },
        redo(){
            if(!this.canRedo){
                return;
            }
            GlobalWorkflowProperties.TraceManager.Redo();
        },
        setSameSize(){
            this.canUndo=true;
            GlobalWorkflowProperties.Workflow.setSameStyle(WorkflowSettings.SameStyle.Size);
        },
        setMiddle(){
            this.canUndo=true;
            GlobalWorkflowProperties.Workflow.setSameStyle(WorkflowSettings.SameStyle.Middle);
        },
        setCenter(){
            this.canUndo=true;
            GlobalWorkflowProperties.Workflow.setSameStyle(WorkflowSettings.SameStyle.Center);
        },
        setSameHorizontalDistance(){
            this.canUndo=true;
            GlobalWorkflowProperties.Workflow.setSameStyle(WorkflowSettings.SameStyle.HorizontalDistance);
        },
        setSameVerticalDistance(){
            this.canUndo=true;
            GlobalWorkflowProperties.Workflow.setSameStyle(WorkflowSettings.SameStyle.VerticalDistance);
        },
        setUndo(){
            this.canUndo=true;
        },
        setHightlight(flag){
            this.highlightRemove=flag;
        },
        showAssistLine(){
            this.lineSelected=!this.lineSelected;
            GlobalWorkflowProperties.Workflow.displayAssistLine();
        },
        removeLineSelected(){
            this.lineSelected=false;
        },
        remove(){
            if(GlobalWorkflowProperties.Workflow.selectedActivities.length>0){
                for(let i=GlobalWorkflowProperties.Workflow.selectedActivities.length-1;i>=0;i--){
                    var activity=GlobalWorkflowProperties.Workflow.selectedActivities[i];
                    GlobalWorkflowProperties.Workflow.removeActivity(activity.Id);
                }
            }
            for(let line of GlobalWorkflowProperties.Workflow.lines){
                if(line.isSelected){
                    GlobalWorkflowProperties.Workflow.removeLine(line.Id);
                }
            }
        },
        setParticipant(){
            let activity=GlobalWorkflowProperties.Wp.CurrentObject;
            if(activity.ToolTipText==='FillSheet'){
                this.participantText='经办人';
            }else if(activity.ToolTipText==='Approve'){
                this.participantText='审批人';
            }else if(activity.ToolTipText==='Circulate'){
                this.participantText='抄送人';
            }else if(activity.ToolTipText==='SubInstance'){
                this.participantText='发起人';
            }
            this.$store.state.SelectedParticipants=[];
            this.participants=GlobalWorkflowProperties.Wp.CurrentObject['Participants'];
            this.participantShow=true;
        },
        calcelParticipantSetting(){
            this.participantShow=false;
        },
        okParticipantSetting(res,displayName){
            this.participantShow=false;
            GlobalWorkflowProperties.Wp.CurrentObject['Participants']=res;
            //设置div显示名称
            if(res){
                var trigger= $("div[property='Participants']").find('div.trigger');
                $(trigger).children('.default').hide();
                $(trigger).children('.custom').html(displayName).show();
            }
            
        },
        async getDataItemsByWorkflowCode(workflowCode){
            if(this.$store.state.SubInstanceDataItems[workflowCode]){
                return ;
            }
            let res=await GetDataItemsByWorkflowCode(workflowCode);
            if(res.Successful){
                let result=res.ReturnData.Data;
                if(result){
                    this.$store.state.SubInstanceDataItems[workflowCode]=result.DataItems;
                }
            }
        },
        
        setSubinstanceDataMap(){
            this.subinstanceSchemaCode=GlobalWorkflowProperties.Wp.CurrentObject['SchemaCode'];
            if(!this.subinstanceSchemaCode){
                $.IShowWarn('请先选择已有流程...');
                return;
            }
            this.subinstanceDataMapShow=true;
            this.subinstanceDataMapRules=GlobalWorkflowProperties.Wp.CurrentObject['DataMaps'];
            
        },
        cancelSubInstanceDataMap(){
            this.subinstanceDataMapShow=false;
        },
        okSubInstanceDataMap(dataMaps){
            //给子流程数据映射赋值
            this.subinstanceDataMapShow=false;
            GlobalWorkflowProperties.Wp.CurrentObject['DataMaps']=dataMaps;
        },
        setActivityRule(){
            //涉及到如下几个属性的配置 同意出口、否决出口、 驳回设置、驳回到哪一个节点
            this.curActivity=GlobalWorkflowProperties.Wp.CurrentObject;
            this.allActivitys=GlobalWorkflowProperties.Workflow.activities;
            this.activityRuleShow=true;
        },
        cancelActivityRule(){
            this.activityRuleShow=false;
        },
        okActivityRule(rule){
            if(this.curActivity.ToolTipText==="FillSheet"){
                //手工环节
                this.curActivity.ApproveExit=rule.ApproveExit;
                this.curActivity.DisapproveExit=1;
                this.curActivity.DisapproveExitType=1;
                this.curActivity.DisapproveExitActivityCode=null;
            }else if(this.curActivity.ToolTipText==="Approve"){
                this.curActivity.ApproveExit=rule.ApproveExit;
                this.curActivity.DisapproveExit=rule.DisapproveExit;
                this.curActivity.DisapproveExitType=rule.DisapproveExitType;
                this.curActivity.DisapproveExitActivityCode=rule.DisapproveExitActivityCode;
            }
            this.activityRuleShow=false;
        },
        setNotifyMessage(){
            this.formula=GlobalWorkflowProperties.Wp.CurrentObject["WorkItemDisplayName"];
            this.formulaType="ActivityName";
            this.formulaTitle='消息内容';
            this.formulaShow=true;
        },
        cancelExpressionSetting: function(){
            this.formulaShow=false;
        },
        okExpressionSetting: function(formulaType,res){
            if(formulaType==='ActivityName'){
                GlobalWorkflowProperties.Wp.CurrentObject["WorkItemDisplayName"]=res.formula;
                let trigger= $("div[property='WorkItemDisplayName']").find('div.trigger');
                $(trigger).html(res.formulaText);
            }else{
                GlobalWorkflowProperties.Wp.CurrentObject["Formula"]=res.formula;
                GlobalWorkflowProperties.Wp.CurrentObject["Exclusive"]=false;
                let trigger=$("div[property='Formula']").find('.trigger');
                if(res.formula){
                    $(trigger).html(res.formulaText);
                }else{
                    $(trigger).html('设置条件');
                }
                //设置线条样式
                if (GlobalWorkflowProperties.Wp.CurrentObject.SetLineStyle){
                    GlobalWorkflowProperties.Wp.CurrentObject.SetLineStyle();
                }
                
            }
            this.formulaShow=false;
        },
        setLineFormula(){
            this.formula=GlobalWorkflowProperties.Wp.CurrentObject["Formula"];
            this.formulaText =this.formula;
            var params = {
                    formula:this.formula,
                    appId: this.schemaCode,
                    SchemaCodes: null
             };
            
            HTTP.parseFormulaText(params)
                .then(data => {
                      if (data && data.code == 0) {
                        let formulaText = data.ReturnData.FormulaText;
                        this.formulaText = formulaText;
                        this.formulaType="BOOL";
                        this.formulaTitle='节点流转条件';
                        this.formulaShow=true;
                    }
                    else{
                        this.$Message.error("异常"+data.msg);
                    }
            })
            .catch(err => {
                this.$Message.error(err);
                
            }).finally(()=>{

            })
            
        },
        
        
    },
    computed:{
        approveExit: function(){
            if(this.curActivity){
                if(this.curActivity.ApproveExit){
                    return this.curActivity.ApproveExit;
                }
            }
            return 1;
        },
        disapproveExit: function(){
            if(this.curActivity && this.curActivity.DisapproveExit){
                return this.curActivity.DisapproveExit;
            }
            return 0;
        },
        disapproveExitActivityName: function(){
            if(this.curActivity ){
                console.log(this.curActivity.DisapproveExitType);
                if(this.curActivity.DisapproveExitType===0){
                    return '驳回到第一个经办节点';
                }else if(this.curActivity.DisapproveExitType===1){
                    return '驳回到前一个经办节点';
                }else if(this.curActivity.DisapproveExitType===3){
                    return '直接否决流程且不再流转';
                }else{
                    if(this.curActivity.DisapproveExitActivityCode){
                        for(let activity of GlobalWorkflowProperties.Workflow.activities){
                            if(activity.ActivityCode===this.curActivity.DisapproveExitActivityCode){
                                if(activity.ToolTipText==='End'){
                                    return '直接结束流程';
                                }else{
                                    return '驳回到指定节点:'+activity.DisplayName;
                                }
                               
                            }
                        }
                    }
                }
                
            }
            return '回退到前一个经办节点';
        },
        notifyMessageType: function(){
            if(this.curActivity){
                if(this.curActivity.WorkItemDisplayName){
                    return 1;
                }
            }
            return 0;
        },
        
    },
    watch:{
    }

};
</script>

<style  lang="less" >
  .myContainer{
    position: absolute;
    width:100%!important;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .wrapper-content {
    width: 100%!important;
    height: 100%;
    background: #fff;
    position: relative;
    div.toolbar {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background: #f2f2f6;
      div.btnSave {
          float: right;
          margin-right: 48px;
          width: 56px;
          margin-top: 9px;
          height: 26px;
          line-height: 26px;
          color: #fff;
          background: #2d7fff;
          border-radius: 2px;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
      }
     ul{
        list-style:none; /* 去掉ul前面的符号 */
        margin: 0px; /* 与外界元素的距离为0 */
        padding: 0px; /* 与内部元素的距离为0 */
        width: auto; /* 宽度根据元素内容调整 */
        li{
            margin-left: 6px;
            height: 44px;
            line-height: 44px;
            color: #5a5a5a;
            float: left;
            font-size: 12px;
            cursor: pointer;
            span {
                color:#7195b3; 
                margin-right: 4px;
            }
        }
        li:first-child {
            margin-left: 36px;
        }
        li:last-child{
            color: #557691;
            padding-top: 2px;
            span{
                font-size: 16px;
            }
        }
        li.normal {
            cursor: pointer;
            color: #7195b3;
        }
        li.forbidden {
            cursor: not-allowed;
            span{
                color: #98a4ae;
            }
            
        }
        li.vertical-divider {
            margin: 12px 6px 12px 12px;
            height: 20px;
            line-height: 20px;
            border-left: 1px solid #979797;
            font-size: 0;
        }
    }
      
      
    }
    .content{
        width: 100%!important;
        // height: 100%;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        .content-left {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 130px;
          
          div.activity-template-container {
            padding: 0 11px;
            // div{
            //   height: 30px;
            //   line-height: 30px;
            //   margin: 5px 0;
            // } 
            div.subinstance_contanier div.activity_model,
            div.node_container div.activity_model{
                height: 30px;
                line-height: 30px;
                width: 100%;
                padding: 0;
                margin-bottom: 10px;
                border: none;
                background: #f0f4ff;
                span{
                    font-size: 12px;
                    &.activity_model_logo::before{
                        top: 0;
                    }
                }
                &:hover{
                    color:#1c1c1c;
                    border: 1px dashed #37adff;
                }
            }
            div.activity-template-title {
              color: #1c1c1c;
              font-size: 14px;
              margin: 12px 0;
            }
            div.activity-template-node {
              text-align: center;
              background: #f0f4ff;
              height: 30px;
              line-height: 30px;
              span {
                color: #2c2c2c;
                font-size: 12px;
              }
              span.icon {
                color: #46b2fe;
                margin-right: 2px;
              }
            }
            
            
          }
        }
        .content-main{
          position: absolute;
          top: 0;
          left: 130px;
          right: 300px;
          bottom: 0;
          margin-left: 2px;
          margin-right: 2px;
          box-shadow:  0 2px 4px 0 #E5EDFC;
          border-radius: 2px; 
        }
        .content-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 300px;
        } 
      }
  }
  .wrapper-start {
    position : absolute;
    left : 50%;
    top: 100px;
    width :300px;
    height :100px;
    margin-left : -150px;
    text-align :center;
    .btn-start{
      margin: 0 auto;
      width :118px;
      height :36px;
      line-height :36px;
      border-radius :3px;
      background-color :#2d7fff;
      color :#fff;
      text-align :center;
      font-size :12px;
      cursor: pointer;
    }
    .wf-description {
      color :#8d8d8d;
      font-size :13px;
      line-height :17px;
      margin-top: 11px;
    }
    .wf-help {
      color :#a1a1a1;
      font-size :11px;
      line-height :15px;
      margin-top: 11px;
      a {
        color :#2d7fff;
        text-decoration :none;
      }
    }
  }
  .workflow-close {
    margin-top: 260px;
    width: 100%;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #fff;
    background: #f46950;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
  }
  .normal-message{
      display: none;
      position: absolute;
      top: 50%;
      margin-top: 50%;
      width: 100%;
      text-align: center;
      color: #666;
      font-size: 20px;

  }
  .h3-lnk-bar{
    height: 3px;
    width:120px;
    box-sizing: border-box;
    background-color: #2d7fff;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 500;
    transition: transform .3s ease-in-out;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
  }

</style>




// WEBPACK FOOTER //
// src/pages/workflowDesigner/App.vue