<!--样式部分-->
<style lang="less" scoped>
  @import 'components/common.less';
  @import 'components/table.less';
</style>

<!--模板部分-->
<template>
    <div>
        <Card> 
            <!--标题  -->
            <p slot="title">
                <Icon type="pinpoint"></Icon>
                {{$router.currentRoute.params.moduleName}}
            </p>
            <Modal v-model="showModal" :mask-closable="false" width="50">
                  <div  class="render-container">
                    <h3 slot="title">{{pageName}}</h3>
                    <RenderDev style="margin-top: 50px;" :soul="soul"  ref="myRender"></RenderDev>
                   <!--  <Button @click="result(soul.children)" type="primary">check</Button> -->
                  </div>
                  <div slot="footer">
                        <Button type="primary" :loading="commitLoading" @click="check(soul.children)">提交</Button>
                        <Button type="ghost" @click="handleReset()" style="margin-left: 8px">取消</Button>
                  </div>
            </Modal>

            <div style="min-height: 500px">
                <Row>
                     <Col span="5">
                        <Card>
                            <DragableTable 
                                highlight-row ref="currentRowTable"
                                v-model="appInstData"
                                :columns-list="columnsList"
                                @on-choose="handleOnstart1"
                            ></DragableTable>
                        </Card>
                    </Col>
                    <Col span="2">
                        <span>&nbsp</span>
                    </Col>
                    <Col span="17" >
                        <i-table  :content="self" :columns="columnsCsv" :loading="getLoading" :data="csvData" size="small" ref="tableCsv"></i-table>
                         <Page ref='page' style ="pull:right;margin-top:20px" :total=total size="small" show-elevator show-sizer @on-change="getAppInstanceList(this.appId)"></Page>
                    </Col>
                </Row>

            </div>
        </Card>
    </div>
</template>

<!--js部分-->
<script>
    import HTTP from '../../api/app-apply.js';
    import {filter} from './data/filter.js';
    import {appRunData, appRunColumns} from './data/appRunDao.js';
    import {appInstanceData, appInstanceColumns} from './data/appInstDao.js';
    import addApp from './designFlowModal/addNewAppInstance.vue';
    import router from '../../router/router.js';
    import ICol from 'iview/src/components/grid/col';
    import Render from '../../component/render_dev.js';
    import log from '../flow-manager/designFlowModal/appInfoLog.vue';
    import {dataFormat} from '../../util/assist.js';
    import {parse} from'../../util/assist';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import {getRichPage} from '../../resource/assemble_resource';
    import DragableTable from '../tables/components/dragableTable.vue';
    import utils from '../../util/utils.js';

    export default {
        components: {ICol,DragableTable},
        name: 'appRun',
        data () {
            return {
                self:this,
                theme1: {
                    type: String,
                    default: 'light',
                    color: 'gray'
                },
                showModal:false,
                currentParam:{},
                list:[],
                pageName:'',
                appName:'',
                currentData:[],
                currentList:'',
                commitLoading:false,
                utils:new utils(),
                columnsCsv: [
                    {
                        type: 'index',
                        width: 80,
                        'fixed': 'left',
                        align: 'center'
                    },
                    {
                        'title': '应用运行名称',
                        'key': 'appRunName',
                        width: 200
                    },
                    {
                        'title': '应用名称',
                        'width': 200,
                        'key': 'appName'
                    },
                    {
                        'title': '状态',
                        width: 150,
                        'key': 'status',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status ==1 ? 'blue' : row.status == 2 ? 'yellow' : 'green';
                            const text = row.status == 1 ? '草稿' : row.status == 2 ? '审批中' : '结束';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        'title': '流程发起人',
                        'key': 'startUserId',
                        width: 150
                    },
                    {
                        'title': '流程发起时间',
                        'key': 'startTime',
                        width: 170,
                        render: (h, params)=> { return h('div',{},dataFormat(params.row.startTime));}
                    },
                    {
                        'title': '审批结果',
                        'key': 'actResult',
                        width: 200,
                        render: (h, params)=> {
                            return h('div',{},filter.approvalResult[params.row.actResult]);
                            /*这里的this.row能够获取当前行的数据*/
                        }
                    },
                    {
                        'title': '操作',
                        'key': 'action',
                        'width': 130,
                        'align': 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        this.openLogModal(params)
                                        }
                                    }
                                }, '审查记录')
                            ]);
                        }
                    }
                ],
                columnsList:[
                {
                    title: '应用名称',
                    key: 'appName',
                },
                 {
                        'title': '操作',
                        'key': 'action',
                        'width': 100,
                        'align': 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        this.showRender(params.row.id,params.row.appName);
                                        }
                                    }
                                }, '应用')
                            ]);
                        }
                    }
            ],
                csvData: appRunData,
                appInstData:[],
                appId:'',
                total:40,
                selectMinRow: 1,
                selectMinCol: 1,
                minRow: 1,
                minCol: 1,
                fontSize: 16,
                getLoading: false,
                modelId:null,
                appId:null,
                propertyJson:[],
                validResult:true,
                result:true,
            };
        },
        mounted() {
            this.getAppList(this.$router.currentRoute.params.moduleId);
            // this.getAppInstanceList();
        },
        computed: {
            ...mapGetters('dragModule', ['soul']),
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

        },
        methods: {
            ...mapMutations('dragModule', ['setSoul']),
            getAppList (moduleId) {
                this.getLoading=true;
                HTTP.appList(moduleId)
                    .then(res => {
                        if(res.code==0&&res.page.result&&res.page.result.length>0){
                             this.appInstData=res.page.result;
                            // let ancestorSoul = parse(res.page.result[0].pagesoul)
                            // this.setSoul(ancestorSoul)
                            this.appId=this.appInstData[0].id;
                            this.getAppInstanceList(this.appInstData[0].id);
                        }
                       


                        // this.appId=this.appInstData[0].id;
                        // this.modelId = this.appInstData[0].modelId;
                    })
                    .catch(err => {
                        this.$Message.error('This is an error')
                    }).finally(()=>{
                    this.getLoading=false;
                })
            },
            handleOnstart1 (form) {
              this.getAppInstanceList(this.appInstData[form].id);
                this.appId=this.appInstData[form].id;
            },
            showRender(params,name){
                this.showModal = true;
                 HTTP.getPageSoul.call(this,params)
                    .then(res => {
                        this.appId=res.id;
                        this.modelId = res.modelId;
                        this.appName =name;
                        let ancestorSoul = parse(res.pagesoul);
                        console.log(ancestorSoul);
                        this.setSoul(ancestorSoul)
                    })
                    .catch(err => {
                        this.$Message.error('This is an error'+err);
                        console.log(err);
                    }).finally(()=>{
                    this.getLoading=false;
                })
            },
            getAppInstanceList (appId) {
                let param = {};
                this.getLoading=true;
                param.pageNum = this.$refs.page.currentPage;
                param.appId = appId;
                // console.log(param);
                HTTP.appInstanceList(param)
                    .then(res => {
                        this.total = res.page.total;
                        this.csvData=res.page.result;
                    })
                    .catch(err => {
                        this.$Message.error('This is an error')
                    }).finally(()=>{
                    this.getLoading=false;
                })
            },
            handleReset(){
                this.showModal=false;
            },
            check(param){
                this.validResult =true;
                console.log(this.$refs['myRender'].$children)
                 if(this.utils.judgeNull(this.$refs['myRender'].$children)){

                 }
                 else{
                    this.validResult =this.checkValidation(this.$refs['myRender'].$children);
                 }

                 if(this.validResult){
                        this.propertyJson=[];
                        for(var index in param){
                                if(param[index].type=='Div'||param[index].type=='Row'||param[index].type=='Col'){
                                    this.check(param[index].children);
                                }
                                else{
                                    this.anaData(param[index]);
                                }
                          }

                        this.commitLoading=true;
                        HTTP.commitNewData({modelId:this.modelId,appId:this.appId,propertyJson:JSON.stringify(this.propertyJson),appName:this.appName})
                            .then(res => {
                                if( res.code==0 ){
                                    this.$Message.success('提交成功');
                                }
                                else{
                                    this.$Message.error('提交失败');
                                }

                            })
                            .catch(err => {
                                this.$Message.error('This is an error')
                            }).finally(()=>{
                            this.commitLoading=false;
                            this.showModal=false
                        })
                 }
                 else{
                    this.$Message.error('校验失败');
                 }
              },
              checkValidation(param){
                    this.result =true;
                    for(var index =0;index<param.length;index++){
                        if(!param[index].soul.isFormItem){
                            if(this.utils.judgeNull(param[index].$refs)){

                            }
                            else{
                                this.checkValidation(param[index].$refs);
                               }
                        }
                        else{
                            if(!param[index].$refs['formItem']||!param[index].$refs['formItem'].validate){
        
                            }
                            else{
                                if(param[index].soul.desc=="FormCheckbox"){
                                    if(param[index].$refs['formItem'].$children.length<2){
                                        console.log(param[index].$refs['formItem'].$children);
                                    }
                                    else{
                                        param[index].$refs['formItem'].$children[1].validate((valid)=>{
                                            if (valid) {
                                                    
                                            } else {
                                                this.result =false;
                                            }
                                        })
                                    }
                                }
                                else{
                                    param[index].$refs['formItem'].validate((valid)=>{
                                        if (valid) {
                                                
                                        } else {
                                            this.result =false;
                                        }
                                    })
                                }
                                 
                            }
                        }
                    }
                    return this.result;
              },
              anaData(param){
                var tmp={};
                tmp.value=[];
                tmp.id=param.uid
                if(param.type=='FormCheckbox'){
                   let currentChoose = param.model.value.value;
                   let retChoose = []
                   for(var i in param.model.items.value){
                     if(currentChoose.indexOf(param.model.items.value[i].value)!==-1){
                        retChoose.push(param.model.items.value[i].label)
                     }
                   }
                   tmp.name=param.model.label.value;
                   tmp.value=retChoose
                   this.propertyJson.push(tmp);
                }
                else{
                   tmp.name=param.model.label.value;
                   tmp.value.push(param.model.value.value);
                   this.propertyJson.push(tmp);
                }

              },
            openLogModal(param) {
                this.$Modal.info({
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
                width:970,})
            }
        }
    };
</script>
