<style lang="less" scoped>
@import "../../styles/common.less";
@import "components/table.less";
@import "../role/role.css";
</style>
<style scoped>
.VerticalTimeLine {
  background-color: #fff;
  position: relative;
  font-family: "Microsoft YaHei";
}

.VerticalTimeLine.noline:before {
  display: none;
}

.VerticalTimeLine .nodata {
  margin-left: 67%;
  position: relative;
  top: -65px;
}
.nodata {
  margin-left: 67%;
  position: relative;
  top: -65px;
}
.nodata-title {
  display: block;
  margin-top: 25px;
  margin-left: 25px;
}

.VerticalTimeLine .nodata .nodata-title {
  display: block;
  margin-top: 25px;
  margin-left: 25px;
}

.VerticalTimeLine .success {
  color: rgba(41, 188, 114, 0.9);
}

.VerticalTimeLine .warn {
  color: rgba(251, 163, 35, 0.9);
}

.VerticalTimeLine .failed {
  color: rgba(244, 99, 80, 0.9);
}

.VerticalTimeLine .my {
  background: #38adff;
}

.VerticalTimeLine .wait {
  background: #f88376;
}

.VerticalTimeLine .finished {
  background: #00ce98;
}

.VerticalTimeLine:before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 0;
  width: 1px;
  background: #ebeaea;
  border-radius: 1px;
  left: 150px;
}

.point {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 6px solid #fff;
  border-radius: 13px;
  background: #38adff;
  left: 150px;
  margin-left: -9px;
}

.bigPoint {
  position: absolute;
  height: 16px;
  width: 16px;
  border: 3px solid #37abfd;
  border-radius: 50%;
  background: #fff;
  left: 150px;
  margin-left: -7px;
  outline: 5px solid #fff;
}

.VerticalTimeLine .itemContainer {
  padding: 0;
}

.VerticalTimeLine .item {
  list-style-type: none;
  padding-left: 6px;
  clear: both;
}

.VerticalTimeLine .item.date {
  height: 50px;
}

.VerticalTimeLine .item.date .left {
  text-align: left;
  top: 0;
  margin-left: 20px;
  margin-top: -10px;
}

.VerticalTimeLine .item.date .right {
  border: none;
  box-shadow: none;
  padding: 0;
}

.VerticalTimeLine .item .left,
.VerticalTimeLine .item .middle,
.VerticalTimeLine .item .right {
  float: left;
}

.VerticalTimeLine .item .left {
  width: 120px;
  text-align: right;
  padding-top: 0;
  margin-top: 0;
}

.VerticalTimeLine .item .right {
  margin-left: 170px;
  padding: 16.5px 0 18px 60px;
  border: 1px solid #fff;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(146, 156, 164, 0.34);
  border-radius: 4px;
  width: 698px;
  top: -24px;
}

.VerticalTimeLine .item .right:hover {
  cursor: pointer;
  border: 1px solid #dfdfdf;
  box-shadow: 0 1px 2px 0 rgba(146, 156, 164, 0.34);
}

.VerticalTimeLine .item .right .title {
  height: 20px;
  font-size: 14px;
  color: #333;
  margin-bottom: 8.5px;
  overflow: hidden;
  word-wrap: break-word;
}

.VerticalTimeLine .item .right .content {
  font-size: 14px;
  color: #666;
  letter-spacing: 0;
  line-height: 22px;
  overflow: hidden;
  word-wrap: break-word;
}

.VerticalTimeLine .item .right .arrow:before {
  content: "";
  position: absolute;
  left: -18px;
  top: 6px;
  box-shadow: 0 1px 3px 0 rgba(146, 156, 164, 0.34);
  transform: scaleY(0.8) rotate(45deg);
  height: 12px;
  width: 12px;
  left: -6px;
  background-color: #fff;
}

.VerticalTimeLine .item .right .arrow:after {
  content: "";
  position: absolute;
  height: 14px;
  width: 14px;
  top: 6px;
  left: 0;
  background-color: #fff;
}

.VerticalTimeLine .item .middle {
  margin-top: 0;
}

.VerticalTimeLine .item .left .day {
  float: left;
  width: 40px;
  height: 45px;
  font-size: 34px;
  color: #333;
  letter-spacing: 0;
  margin-left: 6px;
}

.VerticalTimeLine .item .left .time {
  font-size: 12px;
  color: #666;
  letter-spacing: 0;
}

.VerticalTimeLine .item .left .weekMonth {
  float: left;
  margin: 8px;
}

.VerticalTimeLine .item .left .weekMonth .weekday {
  text-align: left;
  font-size: 12px;
  color: #333;
  letter-spacing: 0;
}

.VerticalTimeLine .item .left .weekMonth .month {
  font-size: 10px;
  color: #333;
  letter-spacing: 0;
}

.VerticalTimeLine .item .right .avatar {
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  overflow: hidden;
  border-radius: 16px;
  color: #fff;
  background: #17c295;
  font-size: 11px;
  position: absolute;
  left: 20px;
  top: 16px;
}

.VerticalTimeLine .item .right .avatar > img {
  width: 32px;
}

.VerticalTimeLine .item .right .action {
  font-size: 14px;
  position: relative;
}

.VerticalTimeLine .item .right .action .action-btn-group {
  /* position: absolute; */
  float:right!important;
  right: 10px!important;
  top: 0;
  font-size: 14px;
}

.VerticalTimeLine .item .right .action .action-btn-group > button {
  border-radius: 3px;
  width: 66px;
  height: 26px;
  background: #37abfd;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}

.VerticalTimeLine .item .right .action .action-btn-group > .agree:hover {
  background: #1889b8;
}

.VerticalTimeLine .item .right .action .action-btn-group > .disagree {
  background: #fff;
  color: #333;
  border: 1px solid #d7d5d5;
}

.VerticalTimeLine .item .right .action .action-btn-group > .disagree:hover {
  color: #37abfd;
  border: 1px solid #37abfd;
}

.VerticalTimeLine .item .right .action button.disabled {
  background-color: #d7d5d5;
}

.VerticalTimeLine .item .right .action .execute {
  position: absolute;
  right: 10px;
  background: #37abfd;
  border-radius: 3px;
  width: 66px;
  height: 26px;
  border: none;
  font-size: 14px;
  color: #fff;
  letter-spacing: 0;
  outline: none;
  cursor: pointer;
}

.VerticalTimeLine .item .right .corner {
  position: absolute;
  top: -5px;
  right: -2px;
  width: 40px;
  height: 50px;
}

.VerticalTimeLine .item .right .corner.my {
  background: url(/Content/images/wode.svg) no-repeat;
}

.VerticalTimeLine .item .right .corner.finished {
  background: url(./yiban.svg) no-repeat;
}

.VerticalTimeLine .item .right .corner.wait {
  background: url(./daiban.svg) no-repeat;
}

.VerticalTimeLine .item .middle .point:before {
  content: "";
  position: absolute;
  top: -25px;
  bottom: 0;
  height: 20px;
  width: 1px;
  background: #ebeaea;
  border-radius: 1px;
  left: 3px;
}

.VerticalTimeLine .item .middle .point.longline:before {
  top: -35px;
  height: 30px;
}
.VerticalTimeLine .item .left .day {
  float: left;
  width: 40px;
  height: 45px;
  font-size: 34px;
  color: #333;
  letter-spacing: 0;
  margin-left: 6px;
}
.VerticalTimeLine .item.date .left {
  text-align: left;
  top: 0;
  margin-left: 20px;
  margin-top: -10px;
}

.VerticalTimeLine .item .left {
  width: 120px;
  text-align: right;
  padding-top: 0;
  margin-top: 0;
}
* {
  line-height: 1.5;
}
.VerticalTimeLine .item {
  list-style-type: none;
  padding-left: 6px;
  clear: both;
}
#task-container {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding-left: 87px;
  padding-right: 67px;
}
</style>
<template>
    <div>
        <Row>
            <Card style="height:830px">
                <Row>
                    <Input  v-model = "appRunName" clearable @on-change="valueChange" placeholder="请输入应用名称搜搜..." style="width: 200px" />
                    <span  style="margin: 0 10px;"><Button type="primary" :loading="getLoading" icon="search" @click="getUnFinishJobList()">搜索</Button></span>
                     <Poptip title="高级选项"  placement="bottom" v-model="showFilter" @on-popper-hide="closeFilter()">
                        <Button   type="warning" icon="loop">高级搜索</Button>
                         <div class="api" slot="content">
                            <table>
                                <tbody>
                                    <tr style="height:50px">
                                        <td style="width:100px">起止时间</td>
                                        <td> <DatePicker v-model="hyper.Datefilter" type="datetimerange" format="yyyy-MM-dd HH:mm"  style="width: 300px"></DatePicker></td>

                                    </tr>
                                   <!--  <tr style="height:50px">
                                        <td style="width:100px">应用名称</td>
                                        <td><Input v-model="hyper.Appfliter"  clearable style="width: 200px"></Input></td>
                                    </tr> -->
                                    <tr style="height:50px">
                                        <td style="width:100px">发起人</td>
                                        <td> <div class='addroleusers-userselect' id='startApprovalId' 
                         data-ismultiple='false' data-uservisible='true' data-orgunitvisible='false' data-width='100%'></div></td>
                                    </tr>
                                </tbody>
                                 <Button type="success" @click="getUnFinishJobList()">确定</Button>
                                 <Button type="text" @click="closeFilter(false)">重置</Button>
                            </table>
                        </div>
                    </Poptip>

                     <Modal v-model="modal2" width="1000" :styles="{top: '20px'}">
                        <div slot="header" style="color:#f60;text-align:center">
                                <Icon type="information-circled"></Icon>
                                <span>办理</span>
                        </div>
                        <Form   :label-width="80" >
                            <div>
                                
                          </div>
                         <openModal v-if="modal2":result="currentApproval.data" :code="currentCode"></openModal>
                            <Row>
                                <Col span="24">
                                    <FormItem label="" > </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <FormItem label="审批意见" >
                                        <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange"></Input>
                                    </FormItem>
                            </Col>
                            </Row>
                        </Form>
                        <div slot="footer">
                                <Button v-if = "currentApproval.props.taskType != '4'" type="primary" @click="handleSubmit(currentApproval.props)">同意</Button>
                                <Button v-if = "currentApproval.props.taskType != '4'" type="error" @click="handleReset(currentApproval.props)">反对</Button>
                                <Button type="primary" @click="openLogModal(currentApproval.props)">流程状态</Button>
                                <Button v-if = "currentApproval.props.taskType != '4'" type="error" @click="handleResetTS(currentApproval.props)">驳回原点</Button>
                                <Button v-if = "currentApproval.props.taskType != '4'" type="error" @click="turnModal = true">转办</Button>
                                <Button v-if = "currentApproval.props.taskType != '4'" type="error" @click="getJumpNode(currentApproval.props)">跳转至</Button>
                                <Button v-if = "currentApproval.props.taskType == 4" type="primary" @click="updateCC(currentApproval.props)">确定</Button>
                                <Button type="ghost" @click="close()" style="margin-left: 8px">取消</Button>
                        </div>
                    </Modal>

                    <Modal v-model="turnModal" @on-cancel="closeTurn">
                        <div slot="header" style="color:#f60;text-align:center">
                                <Icon type="information-circled"></Icon>
                                <span>请选择审批人</span>
                        </div>
                        <Form   :label-width="80" >
                            <Row>
                                <Col span="24">
                                    <FormItem label="转办给">
                                        <!-- <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange"></Input> -->
                                        <div class='addroleusers-userselect' id='transApprovalId' 
                         data-ismultiple='false' data-uservisible='true' data-orgunitvisible='false' data-width='100%'></div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <FormItem label="审批意见">
                                        <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <div slot="footer">
                            <Button type="primary" :loading="commitLoading" @click="commitTurnTask(currentApproval.props)">确认</Button>
                            <Button type="ghost" style="margin-left: 8px"  @click="closeTurn">取消</Button>
                        </div>
                    </Modal>

                    <Modal v-model="jumpModal" @on-cancel="closeJump">
                        <div slot="header" style="color:#f60;text-align:center">
                                <Icon type="information-circled"></Icon>
                                <span>请选择跳转节点</span>
                        </div>
                        <Form   :label-width="150" >
                            <Row>
                                <Col span="50">
                                    <FormItem label="选择跳转审批节点: ">
                                        <div >
                                            <select v-model="selected" style="margin-right:150px">
                                                <option v-for="item in jumpParams.inParam" v-bind:value="item">{{item.nodeName}}</option>
                                            </select>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormItem label="审批意见: ">
                                        <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <div slot="footer">
                            <Button type="primary" :loading="commitLoading" @click="commitJumpTask(currentApproval.props)">确认</Button>
                            <Button type="ghost" style="margin-left: 8px"  @click="closeJump">取消</Button>
                        </div>
                    </Modal>

			<!--
                    <Modal v-model="showModal" :mask-closable="false" width="50">
                          <div  class="render-container">
                            <h3 slot="title">{{pageName}}</h3>
                            <RenderDev style="margin-top: 50px;" :soul="soul"  ref="myRender"></RenderDev>
                          </div>
                          <div slot="footer">
                                <Button type="primary" :loading="commitLoading" @click="restartFlow(soul.children)">提交</Button>
                                <Button type="ghost" @click="closeModal()" style="margin-left: 8px">取消</Button>
                          </div>
                    </Modal>
			-->

		                <Modal v-model="showModal" :mask-closable="false" width="60">
                          <div  class="render-container">
                                <openModal_ v-if="showModal":code="showModalAppId"></openModal_>
                          </div>
                           <div slot="footer"></div>
                    </Modal>


                </Row>
               <div id="task-container" style="margin-top:30px">
                    <div class="form-inline" style="width:70%;margin-left:-45px;margin-top:120px">
                        <div id="timeline" style="margin-top: -30px; margin-left: -23px; height: auto; width: 100%; float: left; padding-bottom: 35px;">

                                <div v-if="this.downList.length==0" class="nodata">
                                    <img src="./meiyoushuju.png">
                                    <span class="nodata-title">还没有任何数据</span>
                                 </div>
                            <div class="VerticalTimeLine" v-if="this.downList.length!=0">

                                <ul  class="itemContainer"  v-for="index in this.downList">
                                    <li class="item date" >
                                        <div class="left">
                                            <div class="day" style="font-size:34px!important;-webkit-text-size-adjust:none;">
                                                {{index.date}}
                                            </div>
                                            <div class="weekMonth">
                                                <div class="weekday">
                                                    <span v-if="index.dayOfWeek==1">星期日</span>
                                                    <span v-if="index.dayOfWeek==2">星期一</span>
                                                    <span v-if="index.dayOfWeek==3">星期二</span>
                                                    <span v-if="index.dayOfWeek==4">星期三</span>
                                                    <span v-if="index.dayOfWeek==5">星期四</span>
                                                    <span v-if="index.dayOfWeek==6">星期五</span>
                                                    <span v-if="index.dayOfWeek==7">星期六</span>
                                                </div>
                                                <div class="month">
                                                    {{index.month}}/{{index.year}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="middle">
                                            <div class="bigPoint">
                                            </div>
                                        </div>
                                        <div class="right" style="width: 1007px;">
                                        </div>
                                    </li>
                                    <li class="item" v-for="num in index.list"  @click="dealTask(num)">
                                        <div class="left">
                                            <span class="time">
                                               {{num.currentTime}}
                                            </span>
                                        </div>
                                        <div class="middle">
                                            <div class="point" style="background-color:#17C295">
                                            </div>
                                        </div>
                                        <div class="right" style="width: 1007px;">
                                            <div class="arrow">
                                            </div>
                                            <div class="title">
                                                {{num.appRunName}} <span v-if="num.taskType==3" class="warn">(被驳回需重新提交)</span>
                                            </div>
                                            <div class="content" v-for="pro in num.json ">
                                                {{pro.name}}:&nbsp;&nbsp;{{pro.valueStr}}
                                                <br>
                                            </div>
                                            <div class="avatar"   style="background-color:#17C295">
                                                 {{num.startUserName}}
                                            </div>
                                            <div class="action warn">
                                                <span>
                                                 {{num.taskName}}
                                                </span>
                                                <span style="float:left">{{num.dealName}}&nbsp;</span>
                                                <span v-if="num.taskAction==0" class="warn">待处理</span>
                                                <span v-if="num.taskAction==1" class="success">同意</span>
                                                <span v-if="num.taskAction==2" class="failed">不同意</span>
                                                <span v-if="num.taskAction==3" class="failed">弃权</span>
                                                <span v-if="num.taskAction==4" class="failed">驳回</span>
                                                <span v-if="num.taskAction==5" class="warn">转办</span>
                                                <span v-if="num.taskAction==6" class="warn">批阅</span>
					                                    	<span v-if="num.taskAction==7" class="warn">跳转</span>
                                                </span>
                                                <div class="action-btn-group" v-if="num.taskType==1||num.taskType==2">
                                                    <button class="agree" @click.stop.prevent="handleSubmit(num)">
                                                        同&nbsp;意
                                                    </button>
                                                    <button class="disagree" @click.stop.prevent="handleReset(num)">
                                                        不同意
                                                    </button>
                                                </div>
                                            </div>
                                            <div v-if="num.status==1" class="corner wait">
                                            </div>
                                            <div v-if="num.status!=1" class="corner finished">
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                                 <Button  type ="text" :loading="moreData" v-if="downList.length!=0&&!noMore" style="margin-left:160px" @click="getUnFinishJobList(1)"><Icon type="arrow-down-a"></Icon>加载更多</Button>
                                <Button type ="text" v-if="noMore" style="margin-left:160px">暂无更多数据......</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import HTTP from "../../api/work-flow.js";
import appReq from "../../api/app-apply.js";
import { dataFormat, parse } from "../../util/assist.js";
import approval from "./components/approval.vue";
import { unfinishData, unfinishColumns } from "./data/unfinishJob.js";
import { table2excelData, excelColumns } from "./data/table2excel.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import utils from "../../util/utils.js";
import openModal from "./components/approvalDetail.vue";
import openModal_ from "./openModal.vue";
import log from "./designFlowModal/approvalLog.vue";

import "../role/BaseControl.js";
import "../role/ControlManager.js";
import "../role/SmartForm.js";
import "../role/FormControls.js";
import "../role/FormMultiUser.js";

//console.log(approval);
export default {
  name: "flow-manager",
  components: {
    approval,
    openModal,
    openModal_
  },
  data() {
    return {
      self: this,
      transApproval: "",
      startApproval:"",
      total: 0,
      showFilter: false,
      modal2: false,
      showModal: false,
      utils: new utils(),
      commitLoading: false,
      appRunName: null,
      pageName: "",
      downList: [],
      moreData: false,
      noMore: false,
      currentCode: "",
      currentIndex: 1,
      showModalAppId: "",
      hyper: {
        Datefilter: null,
        Appfliter: null,
        Userfliter: null
      },
      currentApproval: {
        data: [],
        props: {
          appRunId: "",
          taskId: "",
          ruWfTaskId: "",
          taskResult: "",
          taskType: "",
          instanceId: ""
        }
      },
      returnSuccess: {},
      returnFail: {},
      csvData: [],
      total: 40,
      selectMinRow: 1,
      selectMinCol: 1,
      minRow: 1,
      minCol: 1,
      csvFileName: "",
      excelFileName: "",
      fontSize: 16,
      getLoading: false,
      restartParam: {},

      turnModal: false,
      jumpModal: false,
      selected: [],
      jumpParams: {
        data: [],
        outParam: {
          appRunId: "",
          taskId: "",
          ruWfTaskId: "",
          taskResult: "",
          targetNodeId: ""
        },
        inParam: {
          nodeId: "",
          nodeName: ""
        }
      },
      toUserId: "",
      turnParams: {
        appRunId: "",
        taskId: "",
        ruWfTaskId: "",
        taskResult: "",
        toUserId: ""
      },
      restartParam: {}
    };
  },
  mounted() {
    let _self = this;
    this.$nextTick(() => {
      _self._initFormUser();
    });
    if(!this.startApproval){
      this.startApproval = $("#startApprovalId").RoleFormMultiUser();
    }
    this.getUnFinishJobList();
    // 创建页面时，获取部门信息数据
    
  },
  methods: {
    ...mapMutations("dragModule", ["setSoul"]),
    exportData(type) {
      if (type === 1) {
        this.$refs.tableCsv.exportCsv({
          filename: "原始数据"
        });
      } else if (type === 2) {
        this.$refs.tableCsv.exportCsv({
          filename: "排序和过滤后的数据",
          original: false
        });
      } else if (type === 3) {
        this.$refs.tableCsv.exportCsv({
          filename: this.csvFileName,
          columns: this.columnsCsv.filter(
            (col, index) =>
              index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1
          ),
          data: this.csvData.filter(
            (data, index) =>
              index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1
          )
        });
      }
    },
    // 初始化FormUser控件
    _initFormUser() {
      if (!this.transApproval) {
        this.transApproval = $("#transApprovalId").RoleFormMultiUser();
        
      }
    },
    closeFilter(value = true) {
      if (value) {
        this.showFilter = false;
      } else {
        this.hyper = {
          Datefilter: null,
          Appfliter: null,
          Userfliter: null
        };
      }
    },
    dealTask(params) {
      if (params.taskType == "3") {
        //this.showRender(params);
        this.showRender1(params);
        return;
      }
      this.openApprvalModal(params);
    },

    getJumpNode(params) {
      HTTP.queryTurnNode(params)
        .then(res => {
          this.jumpParams.inParam = res.preNodeName;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.loading = false;
        });
      this.jumpModal = true;
    },
    commitJumpTask(params) {
      this.jumpParams.outParam.appRunId = params.appRunId;
      this.jumpParams.outParam.taskId = params.taskId;
      this.jumpParams.outParam.ruWfTaskId = params.ruWfTaskId;
      this.jumpParams.outParam.taskResult = params.taskResult;
      this.jumpParams.outParam.targetNodeId = this.selected.nodeId;
      HTTP.freeJump(this.jumpParams.outParam)
        .then(res => {
          console.log("跳转成功");
          //刷新列表
          this.getUnFinishJobList();
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.loading = false;
        });
      this.jumpModal = false;
      this.modal2 = false;
    },
    commitTurnTask(params) {
      this.turnParams.appRunId = params.appRunId;
      this.turnParams.taskId = params.taskId;
      this.turnParams.ruWfTaskId = params.ruWfTaskId;
      this.turnParams.taskResult = params.taskResult;
      // console.log(this.transApproval);
      // console.log(JSON.stringify(this.transApproval.GetUnitIDs()));
      this.turnParams.toUserId = this.transApproval.GetUnitIDs()[0];
      // this.transApproval.
      var ValObjs = this.transApproval.GetValue();
      var toLoginName;
      for (var key in ValObjs) {
        toLoginName = ValObjs[key].loginName;
        // UintIDs.push(key);
      }
      if (Cookies.get("user") == toLoginName) {
        //不能选自已
        this.$Message.error("转办失败，已是工作项的参与者");
        return 0;
      }
      // this.$Message.error("");

      HTTP.turnToDo(this.turnParams)
        .then(res => {
          console.log("转办成功");
          //刷新待办列表
          this.getUnFinishJobList();
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.loading = false;
        });
      this.turnModal = false;
      this.modal2 = false;
    },
    closeJump() {
      this.jumpModal = false;
    },
    closeTurn() {
      this.turnModal = false;
    },

    openApprvalModal(params) {
      this.currentApproval.props.appRunId = params.id;
      this.currentApproval.props.taskId = params.taskId;
      this.currentApproval.props.ruWfTaskId = params.ruWfTaskId;
      this.currentApproval.props.taskResult = params.taskResult;
      this.currentApproval.props.taskType = params.taskType;
      this.currentApproval.props.instanceId = params.instanceId;
      HTTP.approvalDetail({
        busId: params.id,
        appId: params.appId,
        ruWfTaskId: params.ruWfTaskId,
      }).then(res => {
          //console.log(res);
          //res = JSON.parse(JSON.stringify(res));

          this.currentApproval.data = res;
          this.currentCode = params.id;
          this.modal2 = true;
          //this.currentApproval.data=res;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    valueChange() {
      var obj = this;
      console.log(this);
      this.$emit("value", obj.formValidate);
    },
    valueReset() {
      this.appRunName = "";
      this.getUnFinishJobList();
    },
    removeFromList(runId) {
      for (var index in this.downList) {
        for (var num in this.downList[index].list) {
          if (this.downList[index].list[num].ruWfTaskId == runId) {
            this.downList[index].list.splice(num, 1);
            HTTP.unfinishJobList(param).then(res => {
              this.$store.commit("setMessageCount", res.total);
            });
          }
        }
      }
    },
    getSheetValue(List,ret){
        List.forEach((value)=>{
          if(value.dataset!=null&&value.dataset!=undefined&&value.dataset!={}){
             if(value.dataset.datafield!==null&&value.dataset.datafield!==undefined){
               if(value.childNodes[1].childNodes[0]&&value.childNodes[1].childNodes[0].value) 
                  {
                     ret[value.dataset.datafield]=value.childNodes[1].childNodes[0].value;
                  }
                else{
                   ret[value.dataset.datafield]=value.childNodes[1].innerText;
                }
             }
              else{
                this.getSheetValue(value.childNodes,ret);
              }   
          }
       
      })
      return ret;

    },
    handleSubmit(name) {
      this.returnSuccess.appRunId =
        name.appRunId === undefined ? name.id : name.appRunId;
      this.returnSuccess.taskId = name.taskId;
      this.returnSuccess.ruWfTaskId = name.ruWfTaskId;
      this.returnSuccess.taskResult = name.taskResult;
      // this.returnSuccess.formData = JSON.stringify($.ControlManager.SaveSheetData());
      console.log($("#SheetContent"))
      var sheetData={}
      if(($("#SheetContent")[0]!==null&&($("#SheetContent")[0]!==undefined)))
      this.returnSuccess.formData=JSON.stringify(this.getSheetValue($("#SheetContent")[0].childNodes,sheetData));
      
      HTTP.agree(this.returnSuccess)
        .then(res => {
          if (res.code == 0) {
            this.$Message.success("办理成功!");
            // this.removeFromList(this.returnSuccess.ruWfTaskId);
            //刷新列表
            this.getUnFinishJobList();
          } else this.$Message.error(res.msg);
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
        });
    },
    handleReset(name) {
      this.returnFail.appRunId =
        name.appRunId === undefined ? name.id : name.appRunId;
      this.returnFail.taskId = name.taskId;
      this.returnFail.ruWfTaskId = name.ruWfTaskId;
      this.returnFail.taskResult = name.taskResult;

      HTTP.reject(this.returnFail)
        .then(res => {
          this.$Message.success("办理成功!");
          // this.removeFromList(this.returnFail.ruWfTaskId);
          this.getUnFinishJobList();
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
        });
    },
    handleResetTS(name) {
      this.returnFail.appRunId = name.appRunId;
      this.returnFail.taskId = name.taskId;
      this.returnFail.ruWfTaskId = name.ruWfTaskId;
      this.returnFail.taskResult = name.taskResult;
      HTTP.turndown(this.returnFail)
        .then(res => {
          if (res.code == 0) {
            this.$Message.success("Success!");
            //刷新列表
            this.getUnFinishJobList();
          } else {
            this.$Message.error("failed");
          }
        })
        .catch(err => {
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.modal2 = false;
        });
    },
    updateCC(name) {
      var param = {};
      param.appRunId = name.appRunId;
      param.taskId = name.taskId;
      param.ruWfTaskId = name.ruWfTaskId;
      param.taskResult = name.taskResult;
      HTTP.updateCC(param)
        .then(res => {
          if (res.code == 0) {
	    this.getUnFinishJobList();
            //this.removeFromList(name.ruWfTaskId);
            this.$Message.success("Success!");
          } else {
            this.$Message.error("failed");
          }
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
        });
    },
    getUnFinishJobList(value = 0) {
      let param = {};
      if (value == 0) {
        param.pageNum = 1;
        this.downList = [];
      } else {
        param.pageNum = this.currentIndex;
      }
      if (this.appRunName !== undefined && this.appRunName !== null)
        param.appRunName = this.appRunName;
      if (
        this.hyper.Datefilter !== undefined &&
        this.hyper.Datefilter !== null &&
        this.hyper.Datefilter[0] !== ""
      ) {
        param.queryStartTime = new Date(this.hyper.Datefilter[0]).getTime();
        param.endTime = new Date(this.hyper.Datefilter[1]).getTime();
      }
      if (
         this.startApproval.GetUnitIDs()[0] !== undefined &&
        this.startApproval.GetUnitIDs()[0] !== null
      ) {
        param.startUserId = this.startApproval.GetUnitIDs()[0];
      }
      this.getLoading = true;
      HTTP.unfinishJobList(param)
        .then(res => {
          //this.total = res.page.total;
          let tmp = res.result;
          this.$store.commit('setMessageCount', res.total);  
          if (tmp.length > 0) {
            this.currentIndex++;
            for (var index in tmp) {
              for (var num in tmp[index].list) {
                tmp[index].list[num].currentTime = this.getNowFormatDate(
                  tmp[index].list[num].createTime
                );
                if (tmp[index].list[num].propertyJson)
                  tmp[index].list[num].json = JSON.parse(
                    tmp[index].list[num].propertyJson
                  );
              }
              this.downList.push(tmp[index]);
            }
          } else {
            this.noMore = true;
          }
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.getLoading = false;
        });
    },
    getNowFormatDate(time) {
      var date = new Date(time);
      var hour = date.getHours();
      var minus = date.getMinutes();
      var currentdate = hour + ":" + minus;
      return currentdate;
    },
    close() {
      this.modal2 = false;
    },
    closeModal() {
      this.showModal = false;
    },
    restartFlow(param) {
      try {
        this.checkValidation(this.$refs["myRender"].$children);
        this.restartParam.propertyJson = JSON.stringify(this.anaData(param));
        this.commitLoading = true;
        console.log(this.restartParam);
        HTTP.restartFlow(this.restartParam)
          .then(res => {
            if (res.code == 0) {
              this.$Message.success("提交成功");
            } else {
              this.$Message.error("提交失败");
            }
          })
          .catch(err => {
            this.$Message.error("This is an error");
          })
          .finally(() => {
            this.commitLoading = false;
            this.showModal = false;
          });
      } catch (err) {
        this.$Message.error(err);
        console.log(err);
      }
    },
    getDataParam(param) {
      for (var item in param) {
        if (
          param[item].type == "Div" ||
          param[item].type == "Row" ||
          param[item].type == "Col"
        ) {
          this.getDataParam(param[item].children);
        } else {
          return param;
        }
      }
    },
    check(param) {
      let validResult = true;
      console.log(this.$refs["myRender"].$children);
      if (this.utils.judgeNull(this.$refs["myRender"].$children)) {
      } else {
        validResult = this.checkValidation(this.$refs["myRender"].$children);
      }

      // if(validResult){

      // }
      // else{
      //    this.$Message.error('校验失败');
      // }
    },
    checkValidation(param) {
      this.result = true;
      if (this.utils.judgeNull(param)) return;
      for (var i = 0; i < param.length; i++) {
        if (!param[i].soul.isFormItem) {
          if (this.utils.judgeNull(param[i].$refs))
            this.checkValidation(param[i].$refs);
          else {
          }
        } else {
          if (
            !param[i].$refs["formItem"] ||
            !param[i].$refs["formItem"].validate
          ) {
          } else {
            if (param[i].soul.desc == "FormCheckbox") {
              if (param[i].$refs["formItem"].$children.length < 2) {
                console.log(param[i].$refs["formItem"].$children);
              } else {
                param[i].$refs["formItem"].$children[1].validate(valid => {
                  this.result = valid;
                });
                if (!this.result) throw "校验失败";
              }
            } else {
              param[i].$refs["formItem"].validate(valid => {
                this.result = valid;
              });
              if (!this.result) throw "校验失败";
            }
          }
        }
      }
      console.log(this.result);
      if (!this.result) throw "校验失败";
      return this.result;
    },
    anaData(param) {
      let returnVal = [];
      for (var index in param) {
        if (
          param[index].type == "Div" ||
          param[index].type == "Row" ||
          param[index].type == "Col"
        ) {
          this.anaData(param[index].children);
          return;
        }
        // else{
        //     this.anaData(param[index]);
        // }
        let item = param[index];
        var tmp = {};
        tmp.value = [];
        tmp.id = item.uid;
        if (item.type == "FormCheckbox") {
          let currentChoose = item.model.value.value;
          let retChoose = [];
          for (var i in item.model.items.value) {
            if (currentChoose.indexOf(item.model.items.value[i].value) !== -1) {
              retChoose.push(item.model.items.value[i].label);
            }
          }
          tmp.name = item.model.label.value;
          tmp.value = retChoose;
          returnVal.push(tmp);
        } else {
          tmp.name = item.model.label.value;
          tmp.value.push(item.model.value.value);
          returnVal.push(tmp);
        }
      }
      return returnVal;
    },

    showRender1(params) {
      this.showModalAppId = params.appId + "," + params.id;
      this.showModal = true;
      //this.pageName = params.appName;
      //this.restartParam.appRunId = params.id;
    },

    showRender(params) {
      this.showModal = true;
      this.pageName = params.appName;
      this.restartParam.appRunId = params.id;
      appReq.getPageSoul
        .call(this, params.appId)
        .then(res => {
          //this.restartParam.appId=res.id;
          this.restartParam.modelId = res.modelId;
          let ancestorSoul = parse(res.pagesoul);
          console.log(ancestorSoul);
          this.setSoul(ancestorSoul);
        })
        .catch(err => {
          this.$Message.error("This is an error" + err);
          console.log(err);
        })
        .finally(() => {
          this.getLoading = false;
        });
    },
    openLogModal(param) {
      console.log(
        "openLogModal.param.appRunId=" +
          param.appRunId +
          ",param.instanceId=" +
          param.instanceId
      );
      var param_ = {};
      param_.id = param.appRunId;
      param_.instanceId = param.instanceId;
      this.$Modal.info({
        styles: {
          top: "20px"
        },
        render: h => {
          return h(log, {
            props: {
              value: param_
            }
          });
        },
        width: 1000
      });
    }
  },
  computed: {
    ...mapGetters("dragModule", ["soul"]),
    // 计算属性的 getter
    colNum: function() {
      // `this` 指向 vm 实例
      return this.columnsCsv.length;
    },
    rowNum: function() {
      // `this` 指向 vm 实例
      return this.csvData.length;
    },
    selectMaxCol: function() {
      return this.columnsCsv.length;
    },
    selectMaxRow: function() {
      // `this` 指向 vm 实例
      return this.csvData.length;
    },
    maxCol: function() {
      return this.columnsCsv.length;
    },
    maxRow: function() {
      // `this` 指向 vm 实例
      return this.csvData.length;
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  display: table;
  max-width: 100%;
  background-color: transparent;
  border-spacing: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  border-collapse: collapse;
  color: #666;
  border: 1px solid #cecece;
  font-size: 12px;
}

.table thead th,
.table thead td {
  background: #ececec;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  color: #666;
  padding: 5px 9px;
}

.table thead td {
  height: 40px;
  font-weight: bold;
}

.table tbody tr td,
.table tbody tr th {
  border-bottom: solid 1px #e5e5e5;
  vertical-align: middle;
  height: 40px;
}

.table tbody tr th {
  text-align: right;
  padding-right: 10px;
  background: #f8f8f8;
  border-right: 1px solid #e5e5e5;
  color: #666;
  font-weight: 400;
  width: 200px;
}

.table tbody tr td {
  padding-left: 10px;
}
</style>
