<style lang="less" scoped>
    @import "./home.less";
    @import "../../styles/common.less";
</style>

<style scoped>

  .service-tag-box {
    overflow: hidden;
    margin:100px;
  }

  .icons-item {
    margin: 0 0 15px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: #5c6b77;
  }

  .icons-item:hover {
    cursor: pointer;
    background-color: #f8f8f8
  }

  .icons-item i {
    font-size: 30px;
  }

  .icons-item span {
    display: block;
  }
.icon-recent {
      /* 通过设置 font-size 来改变图标大小 */
      width: 3em; height: 3em;
      /* 图标和文字相邻时，垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变 SVG 的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
         normalize.css 中也包含这行 */
      overflow: hidden;
      margin:0 auto;
    }

    .btn-outline {
    width: 100%;
    min-height: 85px;
    display: table;
}
 .btn-outline {
    border: 1px dashed #d7d5d5;
    background-color: #f9fafb;
    border-radius: 3px;
    color: #848484;
    font-size: 14px;
    padding: 0;
    height: 32px;
    padding-top: 5px;
}
</style>



<style scoped>
    .mainpanel {
        width: 100%;
        margin-left: 0;
        text-align: center
    }
    .contentpanel{
        text-align: center;
         min-height: 850px;
        height:100%;
    }
    .mainwrapper {
        text-align: center;
        position: relative;
        padding: 8px 8px 0 8px;
        height: 100%;

        background-color: #fff
        .img-online {
        border: 2px solid #5cb85c;
        padding: 2px;
        background-color: #fff;
        }
    }
    .img-offline {
        border: 2px solid #ccc;
        padding: 2px;
        background-color: #fff;
    }

    .left-hide:after {
        content: '';
        width: 1px;
        background-color: #ddd;
        position: fixed;
        top: 60px;
        bottom: 10px;
        margin-left: 21px
    }
    .left-tool {
    position: fixed;
    width: 22px;
    height: 40px;
    background-color: #e1e1e1;
    top: 50%;
    margin-top: -15px;
    overflow: hidden;
    z-index: 200;
    display: none
}

.left-tool:hover {
}

.left-tool:hover>.left-hide>.left-icon:after {
    border-right-color: rgba(75,155,237,1)
}

.left-tool:hover>.left-show>.left-icon:after {
    border-left-color: rgba(75,155,237,1)
}
.left-hide {
    border-radius: 30px 0 0 30px;
    left: 217px
}

.left-hide>.left-icon:before {
    right: 4px;
    border-right-color: #fff
}

.left-hide>.left-icon:after {
    right: 2px;
    border-right-color: #e1e1e1
}
.left-hide:after {
    content: '';
    width: 1px;
    background-color: #ddd;
    position: fixed;
    top: 60px;
    bottom: 10px;
    margin-left: 21px
}

.has-announce .left-hide:after {
    top: 80px
}
.mainpanel {
    text-align: center;
    margin-top:100px;
    position: relative;
    height: 100%;
    margin:0 auto;
}


#main-body {

    width: 700px;
    height: 100%;
    top: 20%;
    text-align: center;
    margin:0 auto;
}
div.logo-wrapper {
    margin-bottom: 10px
}

div.logo-wrapper>img {
}

div.search-wrapper {
    position: relative;
    margin-bottom: 40px
}

div.search-wrapper>.form-search input {
    width: 600px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    margin-left: 50px;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: #333;
    letter-spacing: 0;
    border: 1px solid #d6d4d4;
    border-radius: 2px
}

div.search-wrapper>.form-search input.search-input:focus {
    border: 1px solid #38adff
}

div.search-wrapper>.form-search input+span.search-btn .icon-nav_search {
    cursor: pointer
}


div.search-wrapper>.form-search span.search-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 65px;
    margin-top: 8px;
    color: #37abfd;
    font-size: 18px
}
.form-search input::-webkit-input-placeholder {
    font-size: 14px;
    color: #999
}

.form-search input:-moz-placeholder {
    font-size: 14px;
    color: #999
}

.form-search input::-moz-placeholder {
    font-size: 14px;
    color: #999
}

.form-search input:-ms-input-placeholder {
    font-size: 14px!important;
    color: #999!important;
    line-height: normal!important
}
.recent-wrapper{
    height:430px!important;
}

.recent-wrapper  td {
    position: relative;
    padding: 8px;

    
}

.recent-wrapper td .box-recent:hover {
    cursor: pointer;

}


.box-recent,.box-recent-empty {
    width: 158px;
    height: 130px;
    border-radius: 3px;
    padding-top: 30px
}

.box-recent-empty {
    background-color: #ffffff
}

.box-recent:hover {
    box-shadow: 0 0 5px #666;
}

.box-recent:hover .box-recent-operate{
   bottom: 9px;
   display: inline-block;
}

.box-recent-logo {
    margin-bottom: 15px
}

.box-recent-logo>span {
    font-size: 40px;
    color: #fff
}

.box-recent-text>span {
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: #fff;
    letter-spacing: 0
}

.box-recent-operate {
    position: absolute;
    display: none;
    right: 9px;
    bottom: 9px;
    left: 9px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    background-color: #000;
    opacity: 0.6;
    transition: all 0.5s ease 0s;
}
.box-recent-operate:hover{
    bottom: 9px;
    display: inline-block;
}

.box-recent-operate span {
    display: inline-block;
    width: 40%;
    height: 30px;
    line-height: 30px;
    color: #fff
}

/*.box-recent-operate span:before {
    margin-right: 5px
}*/

.box-a-bg {
    background-color: #0fa2d1
}

.box-b-bg {
    background-color: #55b088
}

.box-c-bg {
    background-color: #c85241
}

.box-d-bg {
    background-color: #d8743b
}

.box-e-bg {
    background-color: #d89327
}

.box-f-bg {
    background-color: #0fa2d1
}





</style>


<template>
<body>
    <section style="">
        <div class="mainwrapper">

            <div class="mainpanel">
    <div class="contentpanel">
        <div id="main-body">
        <div class="search-container">
            <div class="logo-wrapper">
                    <a href="https://home.h3yun.com/jinpaisbx/index.html" target="_blank" title="金牌客户上榜秀">
                        <img src="./images/logo.png" id="activityImg" />
                    </a>

            </div>

            <div class="recent-wrapper">
                <table>
                    <tr v-for = "(rowItem, index) in formatedData">
                        <td v-for = "(item, innerIndex) in rowItem">
                            <div class="box-recent-empty" v-if="!item"></div>
                            <div :class="item.class" v-if="item">
                                <div class="box-recent-logo">
                                   <svg class="icon-recent" aria-hidden="true" v-html = 'item.icon'>
                                        <!-- <use xlink:href="item.icon"></use> -->
                                        {{item.icon}}
                                    </svg>
                                </div>
                                <div class="box-recent-text">
                                    <span>{{item.appName}}</span>
                                </div>
                                <div class="box-recent-operate">
                                    <span v-if="checkPerm(['act:deal:start:'+item.appKey])" class="xinzengshuju " @click="showRender(item.id,item.appName);">新增</span>
                                    <span v-if="!checkPerm(['act:deal:start:'+item.appKey])" class="xinzengshuju " >    </span>
                                    |
                                    <span class="chakanliebiao "@click="showApp(item.moduleId,item.appName,item.id,item.appKey)" >查看</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                        <!--     <td>
                               <div class="box-recent-empty" v-if="!appData[1]"></div>
                                <div class="box-recent box-b-bg" v-if="appData[1]">
                                    <div class="box-recent-logo" >
                                       <svg class="icon-recent" aria-hidden="true">
                                            <use xlink:href="#icon-diannaoguzhang"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[1].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[1].id,appData[1].appName);" >新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[1].moduleId,appData[1].appName,appData[1].id)" >查看</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[2]"></div>
                                <div class="box-recent box-c-bg" v-if="appData[2]">
                                    <div class="box-recent-logo" >
                                       <svg class="icon-recent" aria-hidden="true">
                                            <use xlink:href="#icon-fukuanshenqing"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[2].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[2].id,appData[2].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[2].moduleId,appData[2].appName,appData[2].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                 <div class="box-recent-empty" v-if="!appData[3]"></div>
                                <div class="box-recent box-d-bg" v-if="appData[3]">
                                    <div class="box-recent-logo" >
                                       <svg class="icon-recent" aria-hidden="true">
                                            <use xlink:href="#icon-ITshenqing"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[3].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[3].id,appData[3].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao "@click="showApp(appData[3].moduleId,appData[3].appName,appData[3].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[4]"></div>
                                <div class="box-recent box-e-bg" v-if="appData[4]" >
                                    <div class="box-recent-logo" >
                                       <svg class="icon-recent" aria-hidden="true">
                                            <use xlink:href="#icon-jiaotongbaoxiao"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[4].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[4].id,appData[4].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[4].moduleId,appData[4].appName,appData[4].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            </td>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[5]"></div>
                                <div class="box-recent box-a-bg" v-if="appData[5]">
                                    <div class="box-recent-logo" >
                                       <svg class="icon-recent" aria-hidden="true">
                                             <use xlink:href="#icon-xiujia"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[5].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[5].id,appData[5].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao" @click="showApp(appData[5].moduleId,appData[5].appName,appData[5].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                             <div class="box-recent-empty" v-if="!appData[6]"></div>
                                <div class="box-recent box-f-bg" v-if="appData[6]">
                                    <div class="box-recent-logo">
                                       <svg class="icon-recent" aria-hidden="true">
                                            <use xlink:href="#icon-jiaotongbaoxiao"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[6].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[6].id,appData[6].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[6].moduleId,appData[6].appName,appData[6].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[7]"></div>
                                <div class="box-recent box-c-bg" v-if="appData[7]">
                                    <div class="box-recent-logo">
                                       <svg class="icon-recent" aria-hidden="true">
                                           <use xlink:href="#icon-jiekuanshenqing"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[7].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju "@click="showRender(appData[7].id,appData[7].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[7].moduleId,appData[7].appName,appData[7].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                         <tr>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[8]"></div>
                                <div class="box-recent box-b-bg" v-if="appData[8]">
                                    <div class="box-recent-logo" >
                                       <svg class="icon-recent" aria-hidden="true">
                                            <use xlink:href="#icon-jiaban"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[8].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[8].id,appData[8].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[8].moduleId,appData[8].appName,appData[8].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            </td>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[9]"></div>
                                <div class="box-recent box-c-bg" v-if="appData[9]">
                                   <div class="box-recent-logo">
                                       <svg class="icon-recent" aria-hidden="true">
                                           <use xlink:href="#icon-jiaotongbaoxiao"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[9].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[9].id,appData[9].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao "  @click="showApp(appData[9].moduleId,appData[9].appName,appData[9].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                             <div class="box-recent-empty" v-if="!appData[10]"></div>
                                <div class="box-recent box-d-bg" v-if="appData[10]">
                                    <div class="box-recent-logo">
                                       <svg class="icon-recent" aria-hidden="true">
                                             <use xlink:href="#icon-wupinshenqing"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[10].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate" >
                                        <span class="xinzengshuju " @click="showRender(appData[10].id,appData[10].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[10].moduleId,appData[10].appName,appData[10].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="box-recent-empty" v-if="!appData[11]"></div>
                                <div class="box-recent box-e-bg" v-if="appData[11]">
                                    <div class="box-recent-logo">
                                       <svg class="icon-recent" aria-hidden="true">
                                           <use xlink:href="#icon-jiekuanshenqing"></use>
                                        </svg>
                                    </div>


                                    <div class="box-recent-text">
                                        <span>{{appData[11].appName}}</span>
                                    </div>
                                    <div class="box-recent-operate">
                                        <span class="xinzengshuju " @click="showRender(appData[11].id,appData[11].appName)">新增</span>
                                        |
                                        <span class="chakanliebiao " @click="showApp(appData[11].moduleId,appData[11].appName,appData[11].id)">查看</span>
                                    </div>
                                </div>
                            </td>
                        </tr> -->
                </table>
            </div>
        </div>
        </div>

            </div>
        </div>
    </div>
        </section>
        <Modal v-model="showModal" :mask-closable="false" width=60>
                  <div  class="render-container" @submitForm="closePanel">
                   <!--  <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>{{appName}}</span>
                    </p> -->
                    <openModal v-if="showModal":code="currentCode"></openModal>
                    <!-- <RenderDev style="margin-top: 50px;" :soul="soul"  ref="myRender"></RenderDev> -->
                   <!--  <Button @click="result(soul.children)" type="primary">check</Button> -->
                  </div>
                  <div slot="footer">
                        <!-- <Button type="primary" :loading="commitLoading" @click="check(soul.children)">提交</Button>
                        <Button type="ghost" @click="handleReset()" style="margin-left: 8px">取消</Button> -->
                  </div>
            </Modal>
    </body>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import HTTP from '../../api/app-apply.js';
import router from '../../router/router.js';
import {dataFormat} from '../../util/assist.js';
import {parse} from'../../util/assist';
import {mapGetters, mapMutations, mapActions} from 'vuex';
import utils from '../../util/utils.js';
import openModal from './openModal.vue';




export default {
    name: 'home',
    components: {
        openModal,
        
    },

    data () {
        return {
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            showModal:false,
            utils:new utils(),
            cityData: cityData,
            app:{name:null,desc:null},
            showAddNewTodo: false,
            newToDoItemValue: '',
            newApp:false,
            appData:[],
            modelId:null,
            appId:null,
            propertyJson:[],
            validResult:true,
            result:true,
            pageName:'',
            appName:'',
            commitLoading:false,
            currentCode:"",
            maxRowNum:3,
            columnNum: 4,
            formatedData:[],
            iconList:[
                '#icon-renshishenqing',
                '#icon-diannaoguzhang',
                '#icon-fukuanshenqing',
                '#icon-ITshenqing',
                '#icon-jiaotongbaoxiao',
                '#icon-xiujia',
                '#icon-jiaotongbaoxiao',
                '#icon-jiekuanshenqing',
                '#icon-jiaban',
                '#icon-jiaotongbaoxiao',
                '#icon-wupinshenqing',
                '#icon-jiekuanshenqing',
            ],
            classList:[
                'box-recent box-a-bg',
                'box-recent box-b-bg',
                'box-recent box-c-bg',
                'box-recent box-d-bg',
                'box-recent box-e-bg',
                'box-recent box-a-bg',
                'box-recent box-f-bg',
                'box-recent box-c-bg',
                'box-recent box-b-bg',
                'box-recent box-c-bg',
                'box-recent box-d-bg',
                'box-recent box-e-bg',
            ]
        };
    },
    computed: {
         ...mapGetters('dragModule', ['soul']),
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    mounted(){
        this.getAppList();
    },
    methods: {
        ...mapMutations('dragModule', ['setSoul']),
        getAppList() {
        this.getLoading=true;
            HTTP.getAllApp()
                .then(res => {
                this.appData=res.page.result;
                this.formatedData = this.resolveData(res.page.result);
                console.log(this.formatedData);
        })
        .catch(err => {
            console.log(err);
        }).finally(()=>{
                this.getLoading=false;
        })
        },
        handleReset(){
            this.showModal=false;
            $("#SheetContent").html("");
        },
        closePanel(){
            this.showModal=false;
        },

        showRender(params,name){

            this.currentCode=params;
            this.showModal=true;
                //  HTTP.getPageSoul.call(this,params)
                //     .then(res => {
                //         this.showModal = true;
                //         // this.appId=res.id;
                //         // this.modelId = res.modelId;
                //         // this.appName =name;
                //         // let ancestorSoul = parse(res.pagesoul);
                //         // this.setSoul(ancestorSoul)
                //     })
                //     .catch(err => {
                //         this.$Message.error('This is an error'+err);
                //         console.log(err);
                //     }).finally(()=>{
                //     this.getLoading=false;
                // })
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
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },

        showApp(itemId,itemName,id,appKey){
            this.$router.push({
                name: 'start-application',
                params: {moduleId: itemId, appName: itemName,appId:id,appKey}
            });
        },

        toApp (itemId, itemName) {
            // itemId='0f60c6ecf77a431490ac69fd0d24adf4';
            this.$router.push({
                name: 'start-application',
                params: {moduleId: itemId, moduleName: itemName}
            });
        },
        closeAddApp(){
            this.newApp=false;
        },
        handleSubmit(){
            this.app.imgSrc="5.jpg";
            this.appData.push(this.app);
            this.newApp=false;
            this.app={name:null,desc:null};
        },
        addApp() {
            this.$router.push({
                name: 'formpage_index',
            });
        },

        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        deleteApp(name){
            for(var index in this.appData){
                if(this.appData[index].name==name){
                    this.appData.splice(index,1);
                }
            }
        },
        resolveData(dataList){
            let n = 0;
            let newList = [];
            for (let i = 0; i<dataList.length; i++){
                dataList[i].class = this.classList[i];
                dataList[i].icon = `<use xlink:href="${this.iconList[i]}"></use>`;
            }
            for (let i = 0; i<this.columnNum*this.maxRowNum; i++){
                if(!dataList[i]){
                    dataList[i] = false;
                }
            }
            let rowNum = dataList.length > this.columnNum*this.maxRowNum ? this.maxRowNum : parseInt(dataList.length/this.columnNum);
            console.log(rowNum);
            for (let i = 0; i < rowNum; i++) {
                let star = i * this.columnNum;
                newList[n++] = dataList.slice(star, star + this.columnNum);
            }
            var y = dataList.length - rowNum * 4;
            if (y > 0) {
                newList[n++] = dataList.slice(rowNum * 4);
            }
            console.log(newList);
            return newList;
        },
        checkPerm(permList){
            return this.$_has('permissions',permList);
        }
    }
};
</script>
