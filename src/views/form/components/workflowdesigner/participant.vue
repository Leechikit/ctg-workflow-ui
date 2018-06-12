<template>
    <div>
        <Modal v-model="show" @on-cancel="cancel" :title="title" :mask-closable="false" width="530px" class="participant-modal">
            <div class="result-set" ref="result">
                <!-- <span v-if="selectedNodes.length==0" style="color:#999;">请从下方选择内容</span> -->
                <div v-for="node in selectedNodes" :key="node.id">
                    <template v-if="node.NodeType==0">
                        <span class="icon-gongshi" v-if="node.UnitType===1"></span>
                        <span class="icon-zhuzi" v-if="node.UnitType===2"></span>
                        <span class="icon-renwu" v-if="node.UnitType===4"></span>
                        <span class="icon-role" v-if="node.UnitType===8"></span>
                        <span>{{node.name}}</span>
                        <span v-if="node.UnitType===4">{{node.userName}}</span>
                        <span  @click="removeCheck(node)"><Icon type="close"></Icon></span>
                    </template>
                    <template v-if="node.NodeType==1">
                        <span class="icon-control"></span>
                        <span>{{node.displayName}}</span>
                        <span  @click="removeCheck(node)"><Icon type="close"></Icon></span>
                    </template>
                    <template v-if="node.NodeType==2">
                        <span class="icon-fx"></span>
                        <span>{{node.DisplayName}}</span>
                        <span @click="removeCheck(node)"><Icon type="close"></Icon></span>
                    </template>
                </div>
            </div>
            <Tabs v-model="tabName" @on-click="tabClick()" class="myTab">
                <TabPane class="myTabPane" label="部门" name="department" v-if="showDepartment">
                    <department v-if="departmentSource" :check-mode="checkMode" :name-space="nameSpaceDepartment" :root="departmentSource"></department>
                </TabPane>
                <TabPane class="myTabPane" label="人员" name="user" v-if="showUser">
                    <user v-if="userSource" :check-mode="checkMode" :name-space="nameSpaceUser" :root="userSource"></user>
                </TabPane>
                <TabPane class="myTabPane" label="角色" name="role" v-if="showRole">
                    <role></role>
                </TabPane>
                <TabPane :label="controlTabTitle" name="usercontrols">
                    <participantcontrol :check-mode="checkMode" :source="variableSource"></participantcontrol>
                </TabPane>
                <!-- <TabPane label="通过函数查找" name="function" v-if="showFunction">
                    <functionpane @show="parentShow()" @hide="parentHide()"></functionpane>
                </TabPane>
                <TabPane label="其他参数" name="others" v-if="showOthers">
                    <others></others>
                </TabPane> -->
            </Tabs>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok()">确定</a>
                <a class="cancel" @click="cancel()">取消</a>
            </div>
        </Modal>

    </div>

</template>

<script>

    import department from './department';
    import user from './user';
    import role from './role';
    import others from './others';
    import participantcontrol from './participantcontrol';
    import functionpane from './functionpane';
    import { LoadParticipantInfos, GetAllRoles, FilterOrgs, SearchUsers, GetChildDepartment, LoadNamesByUnitIds } from '../../service/getData';
    import { Modal, Tabs, TabPane } from "iview";
    import { UnitType, NodeType, CheckMode } from '../../config/const';
    // import { deepClone } from 'workflow/common';
    export default {
        data() {
            return {
                show: false,
                nameSpaceDepartment: 'department',
                nameSpaceUser: 'user',
                checkMode: CheckMode.Checkbox,
                UnitNames: [], //存储Unit的名称
                departmentSource: null,
                userSource: null,
                variableSource: null,
                tabName: 'department'
            }
        },
        components: {
            Modal,
            Tabs,
            TabPane,
            department,
            user,
            role,
            participantcontrol,
            functionpane,
            others
        },
        created() {
        },

        props: {
            title: {
                type: String,
                default: ""
            },
            showFlag: {
                type: Boolean,
                default: false
            },
            formula: {
                type: String,
                default: ""
            },
            schemaCode: {
                type: String,
                default: ""
            },
            showDepartment: {
                type: Boolean,
                default: true
            },
            showUser: {
                type: Boolean,
                default: true
            },
            showRole: {
                type: Boolean,
                default: true
            },
            showFunction: {
                type: Boolean,
                default: true
            },
            showOthers: {
                type: Boolean,
                default: false
            },
            canSelectControls: { //指定可以选择的页面控件
                type: Array,
                default: null
            },
            controlTabTitle: {
                type: String,
                default: '人员部门控件'
            }
        },
        mounted: function () {
        },
        methods: {
            showModal() {
                this.show = true;
                this.getRootNodes();
            },
            async restore() {
                var that = this;
                //过滤控件
                if (this.canSelectControls && this.canSelectControls.length > 0) {
                    var temp = [];
                    var controlFields = this.variableSource;
                    for (var i = 0; i < controlFields.length; i++) {
                        if ($.inArray(controlFields[i].Name, this.canSelectControls) > -1) {
                            temp.push(controlFields[i]);
                        }
                    }
                    this.variableSource = temp;
                }

                // let pattern = new RegExp("u\\((.| )+?\\)", "igm");
                if (this.formula) {
                    // let unitIds = this.formula.match(pattern);
                    // if (unitIds != null && unitIds.length > 0) {
                        this.loadNamesByUnitIds(this.formula, this.schemaCode, function () {
                            that.InitFormulaItmes(that.formula);
                        });
                    // }
                    // else {
                    //     that.InitFormulaItmes(that.formula);
                    // }
                } else {
                    this.$store.state.participant.SelectedParticipants = [];
                }
            },
            InitFormulaItmes(formula) {
                console.log(formula)
                this.$store.state.participant.SelectedParticipants = [];
                let items = formula.split("+");
                for (let item of items) {
                    console.log(item);
                    console.log(item.substring(2,item.length-1))
                    let showName = this.UnitNames[item];
                    if (item.indexOf('{') == 0) {
                        let node = {
                            NodeType: NodeType.Variables,
                            Name: item,
                            DisplayName: this.getVariableDisplayName(item)
                        }
                        this.$store.state.participant.SelectedParticipants.push(node);
                    } else if (item.toLowerCase().indexOf("o(") == 0) {
                        //组织机构
                        // if ((this.UnitNames == null || this.UnitNames[item.toLowerCase()] == null) && item != "u(-1)") {
                        //     continue;
                        // }
                        // if (item == "u(-1)") {
                        //     let node = {
                        //         NodeType: NodeType.Unit,
                        //         ObjectId: -1,
                        //         Name: "当前用户所在部门",
                        //         UnitType: 2
                        //     };
                        //     this.$store.state.participant.SelectedParticipants.push(node);
                        // } else {
                        //     let unit = this.UnitNames[item.toLowerCase()];
                        //     if (unit) {
                        //         let node = {
                        //             NodeType: NodeType.Unit,
                        //             id: unit.id,
                        //             Name: unit.Name,
                        //             UnitType: unit.UnitType
                        //         };
                        //         this.$store.state.participant.SelectedParticipants.push(node);
                        //     }
                        // }
                        let node = {
                            NodeType: NodeType.Unit,
                            id: item.substring(2,item.length-1),
                            name: showName,
                            UnitType: 2
                        }
                        this.$store.state.participant.SelectedParticipants.push(node);
                    } else if(item.toLowerCase().indexOf("u(") == 0){
                        let node = {
                            NodeType: NodeType.Unit,
                            id: item.substring(2,item.length-1),
                            userName: showName,
                            UnitType: 4
                        }
                        this.$store.state.participant.SelectedParticipants.push(node);
                    } else if (item.toLowerCase().indexOf("r(") == 0) {
                        let node = {
                            NodeType: NodeType.Unit,
                            id: item.substring(2,item.length-1),
                            userName: showName,
                            UnitType: 8
                        }
                        this.$store.state.participant.SelectedParticipants.push(node);
                    }else if(item.toLowerCase().indexOf("s") == 0 || item.toLowerCase().indexOf("m") == 0){
                        let node = {
                            NodeType: NodeType.Variables,
                            controlId: item.substring(3,item.length-1),
                            displayName: showName,
                        }
                        if(item.toLowerCase().indexOf("u") == 1){
                            node.UnitType = 4;
                        }else if(item.toLowerCase().indexOf("o") == 1){
                            node.UnitType = 2;
                        }
                        this.$store.state.participant.SelectedParticipants.push(node);
                    }else {
                        let paramStr = item.substring(item.indexOf("(") + 1, item.length - 1);
                        let params = paramStr.split(',');
                        //读取函数名
                        let displayName = item.substring(0, item.indexOf("(") + 1);
                        for (var j = 0, len = params.length; j < len; j++) {
                            let p = params[j];
                            if (p.indexOf("{") == 0) {
                                displayName += this.getVariableDisplayName(p)
                            }
                            else if (p.toLowerCase().indexOf("u(") == 0) {
                                if (this.UnitNames != null && this.UnitNames[p.toLowerCase()] != null) {
                                    displayName += this.UnitNames[p.toLowerCase()].Name;
                                }
                            }
                            else {
                                displayName += p;
                            }

                            if (j < params.length - 1) {
                                displayName += ",";
                            }
                        }
                        displayName += ")";
                        let node = {
                            NodeType: NodeType.Function,
                            DisplayName: displayName,
                            Formula: item
                        };
                        this.$store.state.participant.SelectedParticipants.push(node);
                    }
                }
            },
            getVariableDisplayName(name) {
                for (let variable of this.$store.state.participant.Variables) {
                    if (variable.Name === name) {
                        return variable.DisplayName;
                    }
                }
                return name;
            },
            parentShow() {

                this.show = true;
            },
            parentHide() {
                this.show = false;
            },
            async getRootNodes() {
                // if (this.$store.state.participant.RootNode.ObjectId && this.canSelectControls==null) {
                //     if (!this.departmentSource) {
                //         this.departmentSource = $.extend(true, {}, this.$store.state.participant.RootNode);
                //     }
                //     if (!this.userSource) {
                //         this.userSource = $.extend(true, {}, this.$store.state.participant.RootNode);
                //     }
                //     if (!this.variableSource) {
                //         this.variableSource = $.extend(true, [], this.$store.state.participant.Variables);
                //     }
                //     this.restore();
                //     return;
                // }
                let res = await LoadParticipantInfos(this.schemaCode);
                if (res.code == 0) {
                    let rootNode = res.rootNode;
                    this.$store.state.participant.RootNode = rootNode;
                    this.departmentSource = $.extend(true, {IsExpanded: false}, rootNode);
                    this.userSource = $.extend(true, {IsExpanded: false}, rootNode);
                    this.$store.state.participant.OrgRoles = res.ListRole;
                    // this.$store.state.participant.Variables = res.Variables;
                    this.$store.state.participant.Others = ["-1"];
                    this.variableSource = $.extend(true, [], res.Variables);
                    this.restore();
                }
                // setTimeout((res) => {
                //     res ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"RootNode":{"ObjectId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240","Name":"穿云团队","ParentId":"","HasChild":false,"UserCount":0,"UnitType":1,"Childrens":[],"IsExpanded":true,"Active":false},"Variables":[{"Name":"{F0000005}","DisplayName":"部门多选","BizDataType":27},{"Name":"{Originator}","DisplayName":"发起人","BizDataType":26},{"Name":"{F0000007}","DisplayName":"人员单选","BizDataType":26},{"Name":"{F0000006}","DisplayName":"人员多选","BizDataType":27},{"Name":"{OwnerDeptId}","DisplayName":"所属部门","BizDataType":26},{"Name":"{OwnerId}","DisplayName":"拥有者","BizDataType":26}],"ListRole":[{"Name":"系统管理员","ObjectId":"142c7e93-1fad-42be-9317-0b9c1bb94c64","SortKey":0,"Code":"Administrators"},{"Name":"所有用户","ObjectId":"1fc8e0be-f7c8-4130-a780-de250e2c8b57","SortKey":0,"Code":"Users"},{"Name":"test","ObjectId":"a4105334-f955-4e38-b6c7-6875fc7a4b1b","SortKey":3,"Code":"a4105334-f955-4e38-b6c7-6875fc7a4b1b"},{"Name":"t1","ObjectId":"8faa999a-74aa-4777-a659-3a19c6ca91d6","SortKey":4,"Code":"8faa999a-74aa-4777-a659-3a19c6ca91d6"}]}};
                //      if (res.Successful) {
                //         let rootNode = res.ReturnData.RootNode;
                //         this.$store.state.participant.RootNode = rootNode;
                //         this.departmentSource = $.extend(true, {}, rootNode);
                //         this.userSource = $.extend(true, {}, rootNode);
                //         this.$store.state.participant.OrgRoles = res.ReturnData.ListRole;
                //         this.$store.state.participant.Variables = res.ReturnData.Variables;
                //         this.$store.state.participant.Others = ["-1"];
                //         this.variableSource = $.extend(true, [], res.ReturnData.Variables);
                //         this.restore();
                //     }
                // },1000);
               
            },
            async loadNamesByUnitIds(unitIds, appId, cb) {
                let res = await LoadNamesByUnitIds(unitIds, appId);
                if (res.code == 0) {
                    let units = res.units;
                    this.UnitNames = units;
                    console.log(this.UnitNames);
                    cb();
                }
            },
            ok() {
                //获取参与者的值
                let res = "", displayName = '';
                if (this.$store.state.participant.SelectedParticipants && this.$store.state.participant.SelectedParticipants.length > 0) {
                    for (let participant of this.$store.state.participant.SelectedParticipants) {
                        let prefix = '', displayNameVal = '';
                        if (participant.NodeType === NodeType.Unit) {
                            switch(participant.UnitType){
                                case UnitType.OrganizationUnit:
                                    prefix = 'o';
                                    displayNameVal = participant.name;
                                    break;
                                case UnitType.Company:
                                    prefix = 'o';
                                    displayNameVal = participant.name;
                                    break;
                                case UnitType.User:
                                    prefix = 'u'; 
                                    displayNameVal = participant.userName;
                                    break;
                                case UnitType.Role:
                                    prefix = 'r'; 
                                    displayNameVal = participant.name;
                                    break;
                            }
                            res += `${prefix}(${participant.id})+`;
                            displayName += `${displayNameVal}+`;
                        } else if (participant.NodeType === NodeType.Variables) {
                            switch(participant.controlKey){
                                case 26:
                                    prefix += 's';
                                    break;
                                case 27:
                                    prefix += 'm';
                                    break;
                            }
                            switch(participant.unitType){
                                case UnitType.OrganizationUnit:
                                    prefix += 'o';
                                    break;
                                case UnitType.User:
                                    prefix += 'u';
                                    break;
                            }
                            res += `${prefix}(${participant.controlId})+`;
                            displayName += participant.displayName + '+';
                        } else if (participant.NodeType === NodeType.Function) {
                            res += participant.Formula + '+';
                            displayName += participant.DisplayName + '+';
                        }
                    }
                }
                res = res.substring(0, res.length - 1);
                displayName = displayName.substring(0, displayName.length - 1);
                this.$emit("ok", res, displayName);
            },
            cancel() {
                this.$emit("cancel");
            },
            removeCheck(node) {
                this.$store.commit('participant/removeSelectFromResultSet', node);
                if (node.NodeType === NodeType.Unit) {
                    if (node.UnitType === 1 || node.UnitType === 2) {
                        // this.recursionRemove(this.departmentSource,node);
                        this.$root.eventHub.$emit('removeDepartmentFromResultSet', node);
                    } else if (node.UnitType === 4) {
                        //用户
                        this.$root.eventHub.$emit('removeUserFromResultSet', node);
                    } else if (node.UnitType === 8) {
                        //角色
                        this.$root.eventHub.$emit('removeRoleFromResultSet', node);
                    }
                } else if (node.NodeType === NodeType.Variables) {
                    //变量
                    this.$root.eventHub.$emit('removeControlFromResultSet', node);
                }
            },
            tabClick() {
                //触发切换事件，隐藏搜索框
                if (this.tabName === 'department') {
                    this.$root.eventHub.$emit('hide.user');
                    this.$root.eventHub.$emit('hide.role');
                } else if (this.tabName === 'user') {
                    this.$root.eventHub.$emit('hide.role');
                    this.$root.eventHub.$emit('hide.department');
                } else if (this.tabName === 'role') {
                    this.$root.eventHub.$emit('hide.department');
                    this.$root.eventHub.$emit('hide.user');
                } else {
                    this.$root.eventHub.$emit('hide.department');
                    this.$root.eventHub.$emit('hide.user');
                    this.$root.eventHub.$emit('hide.role');
                }
            }
        },
        computed: {
            selectedNodes: function () {
                return this.$store.state.participant.SelectedParticipants;
            }
        },
        watch: {
            showFlag: function () {
                this.show = this.showFlag;
                if (this.show) {
                    this.getRootNodes();
                } else {
                    this.departmentSource = null;
                    this.variableSource = null;
                    this.userSource = null;
                    this.$root.eventHub.$emit('hide.department');
                    this.$root.eventHub.$emit('hide.user');
                    this.$root.eventHub.$emit('hide.role');
                }
            },
            selectedNodes() {
                this.$nextTick(() => {
                    this.$refs.result.scrollTop = this.$refs.result.scrollHeight;
                });
            }
        }
    }
</script>

<style>

    * {
        font-size: 14px;
    }

    .ivu-modal {
        height: 500px;
    }

    div .result-set {
        height: 80px; // overflow-x: hidden;
        overflow-y: auto;
        border: 1px dashed #e3e3e3;
        margin: 16px;
        margin-bottom: 5px;
        padding: 4px;
        div {
            display: inline-block;
            background: #f4f8ff;
            border-radius: 2px;
            color: #4ba0fa;
            font-size: 14px;
            margin: 0 3px 3px 0;
            padding: 2px 8px;
            text-align-items: center;
            cursor: pointer;
            span.icon {
                font-size: 8px;
            }
        }
    }

    
   
    .ivu-tabs-tabpane div.search {
        position: relative;
        width: 100%;
        height: 36px;
        border-bottom: 1px solid #e3e3e3;
        input {
            width: 100%;
            padding-left: 18px;
            height: 34px;
            border: none;
            &:focus {
                outline: none !important;
            }
        }
        span {
            position: absolute;
            right: 18px;
            top: 10px;
        }
    }

    .ivu-modal-footer {
        border-top: 0;
    }

    div.layout {
        height: 218px; // overflow: scroll;
        div.left,
        div.right {
            display: inline-block;
            width: 49.5%;
            height: 100%;
            overflow: auto;
        }
        div.left {
            border-right: 1px solid #e3e3e3;
            li {
                height: 22px;
            }
        }
        div.right li {
            width: 100%;
            cursor: pointer;
            &:hover{
                background-color: #e8f4fe;    
            }
        }
    }
    .myTab{
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            color: #495060;
            zoom: 1;
            border: 1px solid #e3e3e3;
            margin: 0 16px;
    }
    .myTabPane{
        flex-shrink: 0;
        width: 100%;
        transition: opacity .3s;
        opacity: 1;
    }
</style>



// WEBPACK FOOTER //
// src/components/workflowdesigner/participant.vue