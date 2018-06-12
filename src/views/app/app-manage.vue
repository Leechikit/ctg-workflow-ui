<!--样式部分-->
<style lang="less" scoped>
  @import 'components/common.less';
  @import 'components/table.less';
</style>

<style type="text/css" scoped>
    .demo{padding: 2em 0;}
    .our-team{
        padding: 30px 0 40px;
        background: #FFFFF0;
        text-align: center;
        overflow: hidden;
        position: relative;
        left: 26%;
        width: 180px;
        height: 250px;
    }
    .our-team .pic{
        display: inline-block;
        width: 60px;
        height: 60px;
        margin-bottom: 40px;
        z-index: 1;
        position: center;
    }
    .our-team .pic:before{
        content: "";
        width: 100%;
        height: 0;
        border-radius: 50%;
        background: #ee4266;
        position: center;
        bottom: 135%;
        right: 0;
        left: 0;
        opacity: 0.2;
        transform: scale(3);
        transition: all 0.3s linear 0s;
    }
    .our-team:hover .pic:before{ height: 100%; }
    .our-team .pic:after{
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #ee4266;
        position: center;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .our-team .pic img{
        width: 100%;
        height: auto;
        border-radius: 50%;
        transform: scale(1);
        transition: all 0.9s ease 0s;
    }
    .our-team:hover .pic img{
        box-shadow: 0 0 0 14px #f7f5ec;
        transform: scale(0.7);
    }
    .our-team .team-content{ margin-bottom: 30px; }
    .our-team .title{
        font-size: 22px;
        font-weight: 700;
        color: #4e5052;
        letter-spacing: 1px;
        text-transform: capitalize;
        margin-bottom: 5px;
    }
    .our-team .post{
        display: block;
        font-size: 15px;
        color: #4e5052;
        text-transform:capitalize;
    }
    .our-team .social{
        width: 50%;
        padding: 0;
        margin: 0;
        height:30px;
        background: #eb1768;
        position: absolute;
        bottom: -100px;
        left: 0px;
        transition: all 0.5s ease 0s;
    }
    .our-team:hover .social{ bottom: 0; }
    .our-team .social li{ display: inline-block; }
    .our-team .social li a{
        display: block;
        padding: 10px;
        font-size: 17px;
        color: #fff;
        transition: all 0.3s ease 0s;
    }
    .our-team .social li a:hover{
        color: #eb1768;
        background: #f7f5ec;
    }
    @media only screen and (max-width: 100px){
        .our-team{ margin-bottom: 30px; }
    }
    .ivu-menu-dark{
        background: none;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover{
        background: none;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
        color: inherit;
        border-right:  none;
    }
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
            <Row>
            <!--菜单部分  -->
            <Col span="8">
                <div>
                    <span>&nbsp</span>
                    <template v-for="app in appInstData">
                        <Menu theme="dark" active-name="1" >
                            <MenuItem name="1" @click.native="appManage(app.id, app.moduleId, app.modelId)">
                                <Icon type="document-text"></Icon>
                                {{app.appName}}
                                  <Icon style="float:right;font-size:20px!important" color="red" type="trash-a" @click.stop.prevent="delApp(app.id)"></Icon>
                                   <Icon style="float:right;font-size:20px!important" type="clipboard"  @click.stop.prevent="modModule(app.id,app.appName)"></Icon>
                            </MenuItem>
                        </Menu>
                    </template>
                </div>
            </Col>
             <Col span="16">
                <div>
                    <Row class="our-team" >
                        <div class="pic">
                            <img src="../home/images/8.jpg">
                        </div>
                        <div class="team-content">
                            <h3 class="title"><Button type='text' @click="newModule()"><span style="font: bold 20px/30px arial">新建表单</span></Button></h3>
                            <Span class="post">表单用来搜集数据，并将数据应用于流程</Span>
                        </div>
                    </Row>
                </div>
            </Col>
        </Row>
        </Card>
        <Modal v-model="addAppModal">
                 <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
                       <span>新建应用</span>
                 </p>
                <Form ref="formValidate" :model="app"  :label-width="80">
                   <FormItem label="名称" >
                       <Input v-model="app.appName"></Input>
                   </FormItem>
               </Form>
               <div slot="footer">
                       <Button type="primary" @click="addSubmit()">确定</Button>
                       <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
               </div>
        </Modal>


         <Modal v-model="modAppFlag">
                  <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
                        <span>修改应用</span>
                  </p>
                 <Form ref="formValidate" :model="app"  :label-width="80">
                    <FormItem label="名称" >
                        <Input v-model="app.appName"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                        <Button type="primary" @click="handleSubmit()">确定</Button>
                        <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
                </div>
            </Modal>
            <Modal v-model="showDelModal" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除</span>
                </p>
                <div style="text-align:center">
                    <p>删除会清除所有的表单，流程，用户数据。</p>
                    <p>确定删除?</p>
                </div>
                <div slot="footer">
                    <Button type="error"   :loading="modal_loading" @click="del">删除</Button>
                    <Button type="text"  @click="cancel">取消</Button>
                </div>
            </Modal>
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
    import log from '../flow-manager/designFlowModal/appInfoLog.vue';
    import {dataFormat} from '../../util/assist.js';
    import {getUserRoleAndPermission} from '../../api/role.js';

    export default {
        components: {ICol},
        name: 'appManage',
        data () {
            return {
                self:this,
                theme1: {
                    type: String,
                    default: 'light',
                    color: 'gray'
                },
                manager:false,
                modAppFlag:false,
                showDelModal:false,
                currentParam:{},
                list:[],
                app:{moduldId:null,appName:null},
                csvData: appRunData,
                appInstData:appInstanceData,
                selectMinRow: 1,
                selectMinCol: 1,
                minRow: 1,
                minCol: 1,
                fontSize: 16,
                getLoading: false,
                delId:null,
                modal_loading:false,
                addAppModal:false,
            };
        },
        mounted() {
            this.getAppList(this.$router.currentRoute.params.moduleId);
            // this.getAppInstanceList();
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
        },
        methods: {
            cancel(){
                this.showDelModal= false;
            },
            getAppList (moduleId) {
                this.getLoading=true;
                HTTP.appList(moduleId)
                    .then(res => {
                        this.appInstData=res.page.result;

                        //this.getAppInstanceList(this.appInstData[0].id);
                    })
                    .catch(err => {
                        this.$Message.error('This is an error')
                    }).finally(()=>{
                    this.getLoading=false;
                })
            },
            async addSubmit(){
              this.app.moduleId=this.$router.currentRoute.params.moduleId;
              HTTP.addApp(this.app)
                  .then(async res => {
                      if (res.code==0) {
                        this.$Message.success("填加成功");

                        this.getAppList(this.$router.currentRoute.params.moduleId);
                        let permissionsRes = await getUserRoleAndPermission();
                        this.$store.dispatch('user/setPermissionsObj',permissionsRes.permissions);
                      }
                      else{
                        this.$Message.error({
                              content: "失败,请联系管理员",
                              duration: 5
                          })
                      }

                      //this.getAppInstanceList(this.appInstData[0].id);
                  })
                  .catch(err => {

                      this.$Message.error({
                            content: err,
                            duration: 5
                        })

                  }).finally(()=>{
                  this.addAppModal=false;
                  this.app={moduldId:null,appName:null},
                  this.getLoading=false;
              })
            },
            newModule(id,a){
                this.addAppModal=true;
                // this.app.moduleName=a;
                // this.app.id=id;
                // this.hidePoptips();

            },

            modModule(id,a){
                this.modAppFlag=true;
                this.app.moduleName=a;
                this.app.id=id;
                this.hidePoptips();

            },

             closeAddApp(){
                this.modAppFlag=false;
            },
             delApp: function(id) {
                this.showDelModal = true
                this.delId = id
            },
            del(){
                this.modal_loading=true;
                HTTP.delModule(this.delId)
                .then(res => {
                    if(res.code==0){
                        this.$Message.success('删除成功');
                        this.showDelModal=false;
                        this.getModuleList();
                    }

                    else
                    this.$Message.error('删除失败')
                })
                .catch(err => {
                        this.$Message.error('This is an error')
                }).finally(()=>{
                        this.modal_loading=false;
                })

            },
            appManage(appId, moduId, modeId) {
                let app ={"appId": appId, "moduleId": moduId, "modelId": modeId};
                this.$store.commit('updateCurrentApp', app);
                sessionStorage.setItem("currentApp",JSON.stringify(app));
                this.$router.push({
                    name: 'design-sheet',
                    params: {appId: appId, moduleId: moduId, modelId: modeId}
                });
                
            },


        }
    };
</script>
