<style lang="less" scoped>
    @import '../../styles/common.less';
    @import 'components/table.less';
</style>
<style scoped>
.VerticalTimeLine {
    background-color: #fff;
    position: relative;
    font-family: 'Microsoft YaHei'
}

.VerticalTimeLine.noline:before {
    display: none
}

.VerticalTimeLine .nodata {
    margin-left: 67%;
    position: relative;
    top: -65px
}

.VerticalTimeLine .nodata .nodata-title {
    display: block;
    margin-top: 25px;
    margin-left: 25px
}

.VerticalTimeLine .success {
    color: rgba(41,188,114,.9)
}

.VerticalTimeLine .warn {
    color: rgba(251,163,35,.9)
}

.VerticalTimeLine .failed {
    color: rgba(244,99,80,.9)
}

.VerticalTimeLine .my {
    background: #38adff
}

.VerticalTimeLine .wait {
    background: #f88376
}

.VerticalTimeLine .finished {
    background: #00ce98
}

.VerticalTimeLine:before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 0;
    width: 1px;
    background: #ebeaea;
    border-radius: 1px;
    left: 150px
}

.point {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 6px solid #fff;
    border-radius: 13px;
    background: #38adff;
    left: 150px;
    margin-left: -9px
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
    outline: 5px solid #fff
}

.VerticalTimeLine .itemContainer {
    padding: 0
}

.VerticalTimeLine .item {
    list-style-type: none;
    padding-left: 6px;
    clear: both
}

.VerticalTimeLine .item.date {
    height: 50px
}

.VerticalTimeLine .item.date .left {
    text-align: left;
    top: 0;
    margin-left: 20px;
    margin-top: -10px
}

.VerticalTimeLine .item.date .right {
    border: none;
    box-shadow: none;
    padding: 0
}

.VerticalTimeLine .item .left,.VerticalTimeLine .item .middle,.VerticalTimeLine .item .right {
    float: left
}

.VerticalTimeLine .item .left {
    width: 120px;
    text-align: right;
    padding-top: 0;
    margin-top: 0
}

.VerticalTimeLine .item .right {
    margin-left: 170px;
    padding: 16.5px 0 18px 60px;
    border: 1px solid #fff;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(146,156,164,.34);
    border-radius: 4px;
    width: 698px;
    top: -24px
}

.VerticalTimeLine .item .right:hover {
    cursor: pointer;
    border: 1px solid #dfdfdf;
    box-shadow: 0 1px 2px 0 rgba(146,156,164,.34)
}

.nodata {
    margin-left: 67%;
    position: relative;
    top: -65px
}
.nodata-title {
    display: block;
    margin-top: 25px;
    margin-left: 25px
}

.VerticalTimeLine .item .right .title {
    height: 20px;
    font-size: 14px;
    color: #333;
    margin-bottom: 8.5px;
    overflow: hidden;
    word-wrap: break-word
}

.VerticalTimeLine .item .right .content {
    font-size: 14px;
    color: #666;
    letter-spacing: 0;
    line-height: 22px;
    overflow: hidden;
    word-wrap: break-word
}

.VerticalTimeLine .item .right .arrow:before {
    content: '';
    position: absolute;
    left: -18px;
    top: 6px;
    box-shadow: 0 1px 3px 0 rgba(146,156,164,.34);
    transform: scaleY(.8) rotate(45deg);
    height: 12px;
    width: 12px;
    left: -6px;
    background-color: #fff
}

.VerticalTimeLine .item .right .arrow:after {
    content: '';
    position: absolute;
    height: 14px;
    width: 14px;
    top: 6px;
    left: 0;
    background-color: #fff
}

.VerticalTimeLine .item .middle {
    margin-top: 0
}

.VerticalTimeLine .item .left .day {
    float: left;
    width: 40px;
    height: 45px;
    font-size: 34px;
    color: #333;
    letter-spacing: 0;
    margin-left: 6px
}

.VerticalTimeLine .item .left .time {
    font-size: 12px;
    color: #666;
    letter-spacing: 0
}

.VerticalTimeLine .item .left .weekMonth {
    float: left;
    margin: 8px
}

.VerticalTimeLine .item .left .weekMonth .weekday {
    text-align: left;
    font-size: 12px;
    color: #333;
    letter-spacing: 0
}

.VerticalTimeLine .item .left .weekMonth .month {
    font-size: 10px;
    color: #333;
    letter-spacing: 0
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
    top: 16px
}

.VerticalTimeLine .item .right .avatar>img {
    width: 32px
}

.VerticalTimeLine .item .right .action {
    font-size: 14px;
    position: relative
}

.VerticalTimeLine .item .right .action .action-btn-group {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 14px
}

.VerticalTimeLine .item .right .action .action-btn-group>button {
    border-radius: 3px;
    width: 66px;
    height: 26px;
    background: #37abfd;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left: 10px
}

.VerticalTimeLine .item .right .action .action-btn-group>.agree:hover {
    background: #1889b8
}

.VerticalTimeLine .item .right .action .action-btn-group>.disagree {
    background: #fff;
    color: #333;
    border: 1px solid #d7d5d5
}

.VerticalTimeLine .item .right .action .action-btn-group>.disagree:hover {
    color: #37abfd;
    border: 1px solid #37abfd
}

.VerticalTimeLine .item .right .action button.disabled {
    background-color: #d7d5d5
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
    cursor: pointer
}

.VerticalTimeLine .item .right .corner {
    position: absolute;
    top: -5px;
    right: -2px;
    width: 40px;
    height: 50px
}

.VerticalTimeLine .item .right .corner.my {
    background: url(/Content/images/wode.svg) no-repeat
}

.VerticalTimeLine .item .right .corner.finished {
    background: url(./yiban.svg) no-repeat
}

.VerticalTimeLine .item .right .corner.wait {
    background: url(./daiban.svg) no-repeat
}

.VerticalTimeLine .item .middle .point:before {
    content: '';
    position: absolute;
    top: -25px;
    bottom: 0;
    height: 20px;
    width: 1px;
    background: #ebeaea;
    border-radius: 1px;
    left: 3px
}

.VerticalTimeLine .item .middle .point.longline:before {
    top: -35px;
    height: 30px
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
                    <Input  v-model = "appRunName" @on-change="valueChange" placeholder="请输入流程名称搜搜..." style="width: 200px" />
                    <span  style="margin: 0 10px;"><Button type="primary" :loading="getLoading" icon="search" @click="getFinishJobList()">搜索</Button></span>
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
                                        <td><div class='addroleusers-userselect' id='startApprovalId' 
                         data-ismultiple='false' data-uservisible='true' data-orgunitvisible='false' data-width='100%'></div></td>   
                                    </tr>
                                </tbody>
                                 <Button type="success" @click="getFinishJobList()">确定</Button>
                                 <Button type="text" @click="closeFilter()">取消</Button>
                            </table>
                        </div>
                    </Poptip>
                </Row>
              <!--   <Row>
                    <Input   v-model = "appRunName" @on-change="valueChange" placeholder="请输入流程名称搜搜..." style="width: 200px" />
                    <span  style="margin: 0 10px;"><Button :loading="getLoading" type="primary" icon="search" @click="getFinishJobList()">搜索</Button></span>
                </Row> -->
                    <!-- <span  style="margin-right:10px;"><Button  type="warning" icon="loop">重置</Button></span>
                    <Button  type="success" icon="plus">新增</Button> -->
                
               <!--  <Row class="margin-top-10 ">
                    <Col span="24">
                        <i-table  :content="self" :loading="getLoading" :columns="columnsCsv" :data="csvData" size="small" ref="tableCsv"></i-table>
                    </Col>
                </Row>
                <Row class="margin-top-20">
                    <Page ref = "page" class ="pull-left" :total=total size="small" show-elevator show-sizer @on-change="getFinishJobList()"> </Page>
                </Row>  -->
           
            <div id="task-container"style="margin-top:30px">
                    <div class="form-inline" style="width:70%;margin-left:-45px;margin-top:120px">
                        <div id="timeline" style="margin-top: -30px; margin-left: -23px; height: auto; width: 100%; float: left; padding-bottom: 35px;">
                            <div v-if="this.downList.length==0" class="nodata">
                                    <img src="./meiyoushuju.png">
                                    <span class="nodata-title">还没有任何数据</span>
                                 </div>

                            <div class="VerticalTimeLine" v-if="this.downList.length!=0">
                                <ul class="itemContainer"  v-for="index in this.downList">
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
                                    <li class="item" v-for="num in index.list"  @click="openLogModal(num)">
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
                                                {{num.appRunName}}
                                            </div>
                                            <div class="content" v-for="pro in num.json ">
                                                {{pro.name}}:{{pro.valueStr}}
                                                <br>
                                            </div>
                                            <div class="avatar" style="background-color:#17C295">
                                                 {{num.startUserName}}
                                            </div>
                                            <div class="action warn">
                                                <span>
                                                 {{num.taskName}}
                                                </span>
                                                <span v-if="num.taskAction==0" class="action warn">审批中</span>
                                                <span v-if="num.taskAction==1" class="action success">同意</span>
                                                <span v-if="num.taskAction==2" class="action failed">不同意</span>
                                                <span v-if="num.taskAction==3" class="action failed">弃权</span>
                                                <span v-if="num.taskAction==4" class="action failed">驳回</span>
                                                <span v-if="num.taskAction==5" class="action warn">转办</span>
                                                <span v-if="num.taskAction==6" class="action warn">批阅</span>
						<span v-if="num.taskAction==7" class="action warn">跳转</span>
                                                </span>
                                                <div class="action-btn-group" v-if="num.taskAction==0">
                                                    <button class="agree">
                                                        同&nbsp;意
                                                    </button>
                                                    <button class="disagree">
                                                        不同意
                                                    </button>
                                                </div>
                                            </div>
                                            <div v-if="num.taskAction==0" class="corner wait">
                                            </div>
                                            <div v-if="num.taskAction!=0" class="corner finished">
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                                <Button  type ="text" :loading="moreData" v-if="downList.length!=0&&!noMore" style="margin-left:160px" @click="getFinishJobList(1)"><Icon type="arrow-down-a"></Icon>加载更多</Button>
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
import {dataFormat} from '../../util/assist.js';
import Cookies from 'js-cookie';
import {filter} from './data/filter.js';
import log from './designFlowModal/approvalLog.vue';
import HTTP from '../../api/work-flow.js';
import {table2csvData, csvColumns} from './data/table2csv.js';
import {table2excelData, excelColumns} from './data/table2excel.js';
import  approval from './designFlowModal/approvalLog.vue'

import "../role/BaseControl.js";
import "../role/ControlManager.js";
import "../role/SmartForm.js";
import "../role/FormControls.js";
import "../role/FormMultiUser.js";


export default {
    name: 'flow-manager',
    data () {
        return {
            self:this,
            Cookies:Cookies,
            appRunName:null,
            downList:[],
            currentIndex:1,
            moreData:false,
            hyper:{
                    Datefilter:null,
                    Appfliter:null,
                    Userfliter:null,
                },
            csvData: [],
            total:40,
            selectMinRow: 1,
            selectMinCol: 1,
            minRow: 1,
            minCol: 1,
            csvFileName: '',
            excelFileName: '',
            fontSize: 16,
            getLoading:false,
            noMore:false,
        };
    },
    methods: {
        valueChange() {
            var obj = this
            this.$emit('value', obj.formValidate)
        },
        exportData (type) {
            if (type === 1) {
                this.$refs.tableCsv.exportCsv({
                    filename: '原始数据'
                });
            } else if (type === 2) {
                this.$refs.tableCsv.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.tableCsv.exportCsv({
                    filename: this.csvFileName,
                    columns: this.columnsCsv.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
                    data: this.csvData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
                });
            }
        },
        getFinishJobList(value=0){
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
            //
            HTTP.finishJobList(param)
                .then(res => {
                    let tmp=res.result;
                    
                    if(tmp.length>0){
                        this.currentIndex++;
                        for(var index in tmp){
                            for(var num in tmp[index].list){
                               tmp[index].list[num].currentTime =this.getNowFormatDate(tmp[index].list[num].createTime);
                               if(tmp[index].list[num].propertyJson) tmp[index].list[num].json = JSON.parse(tmp[index].list[num].propertyJson);
                            }
                            this.downList.push(tmp[index]);
                        }

                    }
                    else{
                        this.noMore =true;
                    }
                   
                })
                .catch(err => {
                    console.log(err);
                   this.$Message.error(err)
                }).finally(()=>{
                    this.getLoading=false;
                    this.moreData=false;
                })
        },
        getNowFormatDate(time) { 
            var date = new Date(time);   
            var hour=date.getHours();
            var minus=date.getMinutes();
            var currentdate =  hour +":"+minus;  
            return currentdate;  
        },
        openLogModal(param) {
            console.log(param);
            this.$Modal.info({
                styles:{
                top: '20px'
                },
                render: (h) => {
                        return h(log, {
                            props: {
                               value:param
                            },
                            on: {
                                value: (value1) => {
                                  
                                    this.addParam = value1
                                }
                            }
                        })
                    } ,
                width:1000,                       
            })
        }


    },
    mounted(){
        if(!this.startApproval){
        this.startApproval = $("#startApprovalId").RoleFormMultiUser();
        }
        this.getFinishJobList();
    },
    computed: {
    // 计算属性的 getter
            colNum: function () {
              // `this` 指向 vm 实例
              return this.columnsCsv.length;
            },
             rowNum: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            },
            selectMaxCol:function(){
              return this.columnsCsv.length;
            },
             selectMaxRow: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            },
             maxCol:function(){
              return this.columnsCsv.length;
            },
             maxRow: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            }
        }

};



</script>
