<style scoped>
@import url("./style.css");

</style>

<template>
    <div id="app">
        <designer-top-nav :isSingleMode="engineInfo.SingletonModule" :title.sync="engineInfo.SheetName" type="sheet" :schema-code="code" :app-code="engineInfo.AppCode"
            :toLink="toLink"></designer-top-nav>

        <div>
            <div id="DesignerZone" class="row" v-show="showIndex==0">
                <div class="sheet-design-col" id="ControlsWrapper">
                    <div id="Controls" class="sheet-design-left" tabindex="0">
                        <div class="control-header" id="btn_Save" style="padding-top:5px;">基础控件  <Button type="primary" style="display: block;width: 58px;height: 26px;float:right;line-height: 27px;border-radius: 3px;background: #2d7fff;border: 0;padding: 0;text-align: center;color: #fff!important;
  ">保存表单</Button></div>

                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);"  canDropType="STG" class="drag ui-draggable" data-controlkey="FormTextBox" title="单行文本">
                                    <Icon type="compose" color="#57a3f3"></Icon>&nbsp&nbsp单行文本
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormTextArea" title="多行文本">
                                    <Icon type="clipboard" color="#57a3f3"></Icon>&nbsp&nbsp多行文本
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormDateTime" title="日期">
                                    <Icon type="calendar" color="#57a3f3"></Icon>&nbsp&nbsp日期

                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormNumber" title="数字">
                                    <Icon type="ios-calculator" color="#57a3f3"></Icon>&nbsp&nbsp数字
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormRadioButtonList" title="单选框">
                                    <Icon type="android-radio-button-on" color="#57a3f3"></Icon>&nbsp&nbsp单选框
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormCheckboxList" title="复选框">
                                    <Icon type="android-checkbox-outline" color="#57a3f3"></Icon>&nbsp&nbsp复选框
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormDropDownList" title="下拉框">
                                    <Icon type="android-arrow-dropdown-circle" color="#57a3f3"></Icon>&nbsp&nbsp下拉框
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormAttachment" title="附件">
                                    <Icon type="paperclip" color="#57a3f3"></Icon>&nbsp&nbsp 附件
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormAreaSelect" title="地址">
                                    <Icon type="ios-home" color="#57a3f3"></Icon>&nbsp&nbsp 地址
                                </a>
                                <a href="javascript:void(0);" canDropType="ST" class="drag ui-draggable currentUnsupport" data-controlkey="FormMap" title="位置">
                                     <Icon type="location" color="#57a3f3"></Icon>&nbsp&nbsp 位置
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormUser" title="人员单选">
                                     <Icon type="ios-person" color="#57a3f3"></Icon>&nbsp&nbsp 人员单选
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormMultiUser" title="人员多选">
                                     <Icon type="ios-people" color="#57a3f3"></Icon>&nbsp&nbsp 人员多选
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormDepartment" title="部门单选">
                                     <Icon type="ios-list-outline" color="#57a3f3"></Icon>&nbsp&nbsp 部门单选
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormMultiDepartment" title="部门单选">
                                     <Icon type="ios-paper-outline" color="#57a3f3"></Icon>&nbsp&nbsp 部门多选
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormPhoto" title="图片">
                                     <Icon type="image" color="#57a3f3"></Icon>&nbsp&nbsp 图片
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable" data-controlkey="FormCheckbox" title="是/否">
                                     <Icon type="android-checkbox-outline" color="#57a3f3"></Icon>&nbsp&nbsp 是/否
                                </a>
                            </li>
                        </ul>
                        <div class="control-header">布局控件</div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="分组标题" data-controlkey="page-header">
                                    <Icon type="social-hackernews-outline" color="#57a3f3"></Icon>&nbsp&nbsp分组标题
                                </a>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="一行两列" data-controlkey="layout_towcols">
                                    <Icon type="pause" color="#57a3f3"></Icon>&nbsp&nbsp一行两列
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="S" class="drag issystem ui-draggable" title="描述说明" data-controlkey="DesControl">
                                    <Icon type="document" color="#57a3f3"></Icon>&nbsp&nbsp描述说明
                                </a>
                                <a href="javascript:void(0);" canDropType="S" class="drag ui-draggable" title="子表" data-controlkey="FormGridView">
                                    <Icon type="ios-barcode-outline" color="#57a3f3"></Icon>&nbsp&nbsp子表
                                </a>
                            </li>
                        </ul>
                        <div class="control-header">系统控件</div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable currentUnsupport" title="流水号" data-controlkey="FormSeqNo"
                                    data-datafield="SeqNo">
                                    <Icon type="ios-barcode" color="#57a3f3"></Icon>&nbsp&nbsp 流水号
                                </a>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable currentUnsupport" title="创建人" data-controlkey="FormLabel"
                                    data-datafield="CreatedBy.FullName">
                                    <Icon type="person" color="#57a3f3"></Icon>&nbsp&nbsp 创建人
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable currentUnsupport" title="拥有者" data-controlkey="FormUser"
                                    data-datafield="OwnerId">
                                    <Icon type="person-add" color="#57a3f3"></Icon>&nbsp&nbsp 拥有者
                                </a>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable currentUnsupport" title="所属部门" data-controlkey="FormUser"
                                    data-datafield="OwnerDeptId">

                                    <Icon type="grid" color="#57a3f3"></Icon>&nbsp&nbsp 所属部门
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable currentUnsupport" title="创建时间" data-controlkey="FormLabel"
                                    data-datafield="CreatedTime">
                                    <Icon type="ios-clock-outline" color="#57a3f3"></Icon>&nbsp&nbsp 创建时间
                                </a>
                                <a href="javascript:void(0);" canDropType="ST" class="drag issystem ui-draggable currentUnsupport" title="修改时间" data-controlkey="FormLabel"
                                    data-datafield="ModifiedTime">
                                    <Icon type="ios-clock" color="#57a3f3"></Icon>&nbsp&nbsp 修改时间
                                </a>
                            </li>
                        </ul>
                        <div class="control-header">高级控件</div>
                        <ul class="nav">
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormQuery" title="关联表单">
                                    <Icon type="ios-list-outline" color="#57a3f3"></Icon>&nbsp&nbsp 关联表单
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormAssociateProperty" title="关联属性">
                                    <Icon type="ios-photos" color="#57a3f3"></Icon>&nbsp&nbsp关联属性 </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormMultiQuery" title="关联表单多选">
                                   <Icon type="social-buffer" color="#57a3f3"></Icon>&nbsp&nbsp 关联表单多选
                                </a>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormFormula" title="公式型控件">
                                    <Icon type="ios-calculator" color="#57a3f3"></Icon>&nbsp&nbsp 公式型控件
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" canDropType="STG" class="drag ui-draggable currentUnsupport" data-controlkey="FormButton" title="按钮">
                                    <i class="fa icon-anniu"></i> 按钮
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sheet-design-col" id="Designer-right-wrapper">
                    <div class="Designer-right">
                        <div class="property-tabs">
                            <a href="javascript:void(0);" id="btn_SheetControlProperty" data-target="#SheetControlPropertysPanel" class="">控件属性</a>
                            <a href="javascript:void(0);" id="btn_SheetProperty" class="active" data-target="#SheetPropertysPanel">表单属性</a>
                        </div>
                        <div id="tabs-content">
                            <div id="SheetControlPropertysPanel" tabindex="1" placeholder="请先选择或者拖入控件"></div>
                            <div id="SheetPropertysPanel" tabindex="2">
                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            数据标题
                                             <i data-tip='数据标题用于快速辨别一条数据，适用于移动端列表显示、web列表首列标题、关联表单数据显示等场景中<br/>' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div id="ProAddNameItems" class="property-item">
                                        <div class="property-input" id="NameItems" placeholder="添加标题">
                                        </div>
                                        <i id="AddNameItems" class="icon-add"></i>
                                    </div>
                                </div>

                                <!-- <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            数据摘要
                                             <i data-tip='数据摘要用于展示数据主要信息，适用于移动端列表显示、列表时间轴显示等场景中。' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div id="ProAddSummaryItems" class="property-item">
                                        <div class="property-input" id="SummaryItems" placeholder="添加摘要">
                                        </div>
                                        <i id="AddSummaryItems" class="ivu-icon ivu-icon-checkmark icon-add"></i>
                                    </div>
                                </div>

                                <div class="property-group" id="InheritAclRow">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">数据查看权限</div>
                                    </div>
                                    <div class="property-item">
                                        <select class="form-control" id="InheritObject" style="display: none;">
                                            <option value="">用户根据角色权限查看数据</option>
                                            <option value="false">所有用户可查看全部数据</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="property-group" v-show="!isWorkflow">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">功能按钮</div>
                                    </div>
                                    <div class="property-item property-buttons ">
                                        <div>
                                            <a class="btn btn-default currentUnsupport" id="btn_ActionAcl">
                                                <i class="fa fa-lock mr5"></i> 设置功能按钮</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="property-group" v-show="!isWorkflow">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">操作权限</div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default currentUnsupport" id="btnShowFieldAclModal" @click="showFieldAclModal">
                                                <i class="fa fa-building-o mr5"></i> 设置操作权限</a>
                                        </div>
                                    </div>
                                </div> -->


                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            表单提交校验
                                            <i data-tip='当表单满足设定条件时无法提交' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default FormulaEditable" formula-button="true" id="btn_SchemaSubmitFormula">
                                                <i class="fa fa-check-square-o mr5"></i> 设置校验条件
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="property-group ">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            业务规则
                                            <i data-tip='可对其他表单的数据进行插入、更新、删除等操作' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    关联列表
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default currentUnsupport" id="btn_PropertyEventHandler">
                                                <i class="fa fa-building-o mr5"></i>设置业务规则</a>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            关联列表
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default currentUnsupport" id="btn_SelectBoList">
                                                <i class="fa fa-building-o mr5"></i>设置关联列表</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            消息推送提醒
                                            <i data-tip='开启消息推送提醒后可在手机端以信息的形式进行提示。' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default ScheduleRule currentUnsupport" id="btn_ScheduleRuleFormula">
                                                <i class="fa fa-check-square-o mr5"></i> 设置提醒
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="property-group">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">
                                            表单外链
                                            <i data-tip='开启表单外链后将允许外部人员填写当前表单' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <div class="property-item property-buttons">
                                        <div>
                                            <a class="btn btn-default ExternalForm currentUnsupport" id="btn_ExternalFormFormula">
                                                <i class="fa fa-check-square-o mr5"></i> 设置外链
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="property-group bg-item ">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">表单动态
                                            <i data-tip='开启后可在表单中增加评论功能，让员工讨论分享、发表意见建议等' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <ul class="property-items currentUnsupport">
                                        <li data-index="0" class="property-item currentUnsupport">
                                            <div data-index="0" style="width: 47%; display:inline-block;  overflow: hidden;">
                                                <input type="radio" name="OrgUnitVisible" value="true" class="ckEnableFormSns" id="ckEnableFormSnsA">
                                                <label style="padding-left:0;" for="ckEnableFormSnsA" class="radio-inline">开启</label>
                                            </div>
                                            <div data-index="0" style="width: 47%; display:inline-block; overflow: hidden;">
                                                <input type="radio" name="OrgUnitVisible" value="false" class="ckEnableFormSns" id="ckEnableFormSnsB">
                                                <label style="padding-left:0;" for="ckEnableFormSnsB" class="radio-inline">不开启</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="property-group bg-item ">
                                    <div class="property-item property-title">
                                        <div class="property-left property-paddingleft-1x">任务提醒
                                            <i data-tip='开启后可在表单中增加任务、提醒功能，根据需要新建提醒。' class='ivu-icon ivu-icon-help-circled' style="color:#2d7fff"></i>
                                        </div>
                                    </div>
                                    <ul class="property-items">
                                        <li data-index="0" class="property-item currentUnsupport">
                                            <div data-index="0" style="width: 47%; display:inline-block;  overflow: hidden;">
                                                <input type="radio" name="taskTip" value="true" class="ckEnableTask" id="enableTaskTip">
                                                <label style="padding-left:0;" for="enableTaskTip" class="radio-inline">开启</label>
                                            </div>
                                            <div data-index="0" style="width: 47%; display:inline-block;  overflow: hidden;">
                                                <input type="radio" name="taskTip" value="false" class="ckEnableTask" id="disableTaskTip">
                                                <label style="padding-left:0;" for="disableTaskTip" class="radio-inline">不开启</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sheet-design-col" id="sheetContentWrapper">
                    <div class="Designer-view" tabindex="3">
                        <div id="sheetContent" class="sheetContent ui-sortable" placeholder="">
                            <!-- <img src="./huizhi.svg" id="tipPic"> -->
                        </div>
                    </div>
                </div>
            </div>
            <cs-code-zone v-if="isDevMode" :csCode="csCode" :appCode="appCode" :schemaCode="code" :showIndex="showIndex" @mounted="csOnMounted"></cs-code-zone>
            <javascript-code-zone v-if="isDevMode" :jsCode="jsCode" :showIndex="showIndex" @mounted="jsOnMounted"></javascript-code-zone>
        </div>
    </div>
</template>

<script>
    import '../../lib/plugins/jquery-ui'
    import '../../lib/plugins/niceScroll/jquery.nicescroll.min.js'

    import '../../lib/H3/Console/SheetDesigner/SheetDesigner.js'
    import '../../lib/H3/Console/SheetDesigner/ControlManager.js'
    import '../../lib/H3/Console/SheetDesigner/SheetReponse.js'

    import '../../lib/H3/Form/FormControls.js'
    import '../../lib/H3/Console/Formula/NewFormulaEditable.js'
    import '../../lib/plugins/DropDownList/DropDownList.js'
    // import '../../lib/plugins/DropDownList/DropDownList.css'

    import DesignerTopNav from '../../components/console/designer-top-nav'
    import CsCodeZone from '../../components/listviewdesigner/cs-code-zone'
    import JavascriptCodeZone from '../../components/listviewdesigner/javascript-code-zone'
    // import FieldAclModal from 'components/sheetdesigner/fieldAclModal/field-acl-modal'
    import FieldAclModalVue from '../../components/sheetdesigner/fieldAclModal/index'
    import HTTP from '../../../../api/form.js'

    import {
        GetEngineCode,
        LoadCustomCode,
        CheckSchemaInstalled
    } from '../../service/SheetDesigner/getData'
    import '../../lib/H3/H3Plugins/H3.plugins.system'
    import { baseUrl } from '../../config/env'

// import '../../../../assets/bootstrap/js/bootstrap.min.js'
// import '../../../../assets/bootstrap/css/bootstrap.css'

    export default {
        data() {
            return {
                appCode: '',
                jsCode: '',
                csCode: '',
                showIndex: 0,
                isDevMode: true,
                isCodeEditorMounted: false, //自定义代码编辑器加载完毕
                // isCustomCodeLoaded: false, //自定义代码加载完毕
                code: '',
                engineInfo: {},
                fieldAclModel: {
                    showFieldAclModalFlag: false
                },
                openExternalForm: false, //是否启用表单外链
                hostAddress: '',
                showExternalFormModalFlag: false, //显示隐藏表单外链弹出框
                sheetDesigner: null,
                isWorkflow: false,
                isInstalledSchema: false,
                toLink: false,
                isSingleMode: false,
                canSave: false
            }
        },
        created() {

            if(this.$route!=null&&this.$route.params!=null){
               this.code = this.$route.params.appId;
               // alert(this.$route.params.appId);
            }

            this.getEngineCode()
        },
        mounted() {
            //var that = this;
        },
        methods: {
            init: function () {
                var niceScroll = $('#Controls').niceScroll({
                    cursorcolor: '#ccc',
                    cursoropacitymin: 0.1,
                    cursoropacitymax: 0.5,
                    touchbehavior: false,
                    cursorwidth: '5px',
                    cursorborder: '0',
                    cursorborderradius: '5px',
                    autohidemode: 'leave',
                    cursorminheight: 40,
                    mousescrollstep: 60
                })

                var niceScrollR = $(
                    '#SheetPropertysPanel,#SheetControlPropertysPanel'
                ).niceScroll({
                    cursorcolor: '#ccc',
                    cursoropacitymin: 0.1,
                    cursoropacitymax: 0.5,
                    touchbehavior: false,
                    cursorwidth: '5px',
                    cursorborder: '0',
                    cursorborderradius: '5px',
                    autohidemode: 'leave',
                    cursorminheight: 40,
                    mousescrollstep: 60,
                    enablescrollonselection: true
                })

                this.sheetDesigner = new SheetDesigner(
                    this.code,
                    baseUrl + '/Console/SheetDesigner/OnAction',
                    this.engineInfo.EngineCode,
                    this.dataLoaded
                )
                var that = this;
                window.SaveSheetDesigner = function () {
                    return that.sheetDesigner.Save(null, false);
                }

                var s = document.body.clientHeight - 100
                $('#DesignerZone').css({ height: s + 'px' })
                $(window).resize(function () {
                    s = document.body.clientHeight - 100 //当浏览器大小变化时
                    $('#DesignerZone').css({ height: s + 'px' });
                    //一行两列中切换按钮的位置调整
                    var widthLeft = $('.layoutrow-item[data-layoutitem="Left"]').width();
                    $('.layoutrow  span[data-type="changeplace"]').css({ 'left': widthLeft })
                })
                var $ToolTip = $(
                    '<div class="table-tip" style="display: none;"></div>'
                ).appendTo($('#Designer-right-wrapper'))
                $('.ivu-icon-help-circled')
                    .mouseenter(function () {
                        var $that = $(this)
                        var offset = $that.offset()
                        $ToolTip
                            .html($that.attr('data-tip'))
                            .css({
                                left:
                                    offset.left +
                                    ($that.outerWidth() - $ToolTip.outerWidth()) / 2 -
                                    $(window).scrollLeft(),
                                bottom:
                                    $(window).height() - offset.top + 6 + $(window).scrollTop()
                            })
                            .toggle()
                        return false
                    })

                $('.ivu-icon-help-circled')
                    .mouseleave(function () {
                        $ToolTip.hide()
                    })
            },
            showFieldAclModal() {
                // this.fieldAclModel.showFieldAclModalFlag = true
                let options = {
                    fieldAclModel: this.fieldAclModel,
                    schemaCode: this.code
                }
                FieldAclModalVue.show(options);
            },
            dataLoaded: function () {
                this.isWorkflow = this.sheetDesigner.IsWorkflow
            },
            csOnMounted(editor) {
                //window.viewSetting.CSEditor = editor;
                // this.isCustomCodeLoaded = true;
                this.isCodeEditorMounted = true;
                this.canSave = true;
                this.sheetDesigner.CSEditor = editor
            },
            jsOnMounted(editor) {
                //window.viewSetting.JSEditor = editor;
                // this.isCustomCodeLoaded = true;
                this.isCodeEditorMounted = true;
                this.canSave = true;
                this.sheetDesigner.JSEditor = editor
            },
            async getEngineCode() {
                var that = this
                //let res = await GetEngineCode(this.code)
                let res ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"CurUser":{"Name":"梦达","ProfilePhotoUrl":""},"ShowSystemIntegration":false,"EngineCode":"n3wk40r211ew2fafgh9jg71x6","OptionalEngines":{"n3wk40r211ew2fafgh9jg71x6":"mq项目组"}}}
                setTimeout(()=>{
                    if (res.Successful) {
                    that.engineInfo = res.ReturnData
                    // document.title = '氚云 - ' + that.engineInfo.Title
                    that.init()
                    that.loadCustomCode()
                    // that.checkSchemaInstalled();
                    } else {
                        // that.$Message.info(res.ErrorMessage);
                    }
                })


            },
            async loadCustomCode() {
                var that = this
                
                // let ret = await LoadCustomCode(this.code)
                let ret ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"JsCode":"","CsCode":"","DefaultJsCode":"","DefaultCsCode":"","IsDevMode":true,"AppCode":"","IsSingleMode":false}};
                if (ret.Successful) {
                    that.jsCode = ret.ReturnData['JsCode']
                    that.csCode = ret.ReturnData['CsCode']
                    that.appCode = ret.ReturnData['AppCode']
                    that.isDevMode = ret.ReturnData['IsDevMode']
                    that.sheetDesigner.defaultJsCode = ret.ReturnData['DefaultJsCode']
                    that.sheetDesigner.defaultCsCode = ret.ReturnData['DefaultCsCode']
                    if (that.isDevMode == false) {
                        that.canSave = true;
                    }
                    that.isSingleMode = ret.ReturnData["IsSingleMode"];
                }
            },
            async checkSchemaInstalled() {
                var that = this
                let ret = await CheckSchemaInstalled(this.code)
                setTimeout(()=>{
                    if (ret.Successful) {
                    that.isInstalledSchema = ret.ReturnData['IsInstalled']
                }
                },2000)



            }
        },
        components: {
            DesignerTopNav,
            // FieldAclModal,
            CsCodeZone,
            JavascriptCodeZone
        }
    }
</script>



// WEBPACK FOOTER //
// src/pages/SheetDesigner/App.vue
