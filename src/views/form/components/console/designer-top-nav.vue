<template>
    <div class="designer-nav-box" style="margin:0 auto">
        <div style="margin:0 auto">
            
            <ButtonGroup>
                    <Button @click="link('0')">表单设计</Button>
                    <Button @click="link('1')">流程设计</Button>
            </ButtonGroup>

            <!-- <ul class="designer-tab">
                <li data-role="SheetDesigner" :class="[type=='sheet'?'active':'']">
                    <a href="javascript:void(0);" @click="link('sheet')">
                        <i class="fa icon-biaodansheji"></i>表单设计</a>
                </li>
                <li data-role="WorkflowDesigner" :class="[type=='workflow'?'active':'']" v-cloak v-show="!isSingleMode">
                    <a href="javascript:void(0);" @click="link('workflow')">
                        <i class="fa icon-liucsheji"></i>流程设计</a>
                </li>
                <li data-role="QeuryDesigner" v-if="appCode!='Sys_Workflow'" v-cloak :class="[type=='list'?'active':'']" v-show="!isSingleMode">
                    <a href="javascript:void(0);" @click="link('list')">
                        <i class="fa icon-liebiaomingc"></i>列表设计</a>
                </li>
            </ul> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// import { Icon } from 'iview'
import { GetUserInfo,Save } from '../../service/getData'
import clickoutside from '../workflowdesigner/clickoutside.js'

export default {
  props: {
    title: {
      type: String
    },
    type: {
      type: String
    },
    schemaCode: {
      type: String
    },
    appCode: {
      type: String
    },
    toLink: {
      type: Boolean,
      default: false
    },
    isSingleMode:{
        type:Boolean,
        default:false
    },
    ListViewSetting:{
        type: Object
    }
  },

  //["title", "type", "schemaCode", "appCode"],
  data() {
    return {
      CurUser: {
        Name: '',
        ProfilePhotoUrl: ''
      },
      CurEngineCode: '',
      OptionalEngines: {},
      ShowEngineOptions: false,
      toLinkType: ''
    }
  },
  components: {
    // Icon
  },
  directives: {
    clickoutside
  },
  created() {
    this.getUserEnginInfo()
  },
  computed: {
    optionalEnginesCount() {
      let arr = Object.keys(this.OptionalEngines)
      return arr.length
    },
    showProfilePhoto() {
      let url = this.CurUser.ProfilePhotoUrl + ''
      if (url && url.length > 10) {
        return true
      }
      return false
    },
    HandleName() {
      let name = this.CurUser.Name
      if (name.length > 2) {
        name = name.substring(name.length - 2, name.length)
      }
      return name
    }
  },
  methods: {
    async getUserEnginInfo() {
      //获取用户和引擎信息
      let data = await GetUserInfo()
      if (data.Successful) {
        this.CurUser = data.ReturnData.CurUser
        this.CurEngineCode = data.ReturnData.EngineCode
        this.OptionalEngines = data.ReturnData.OptionalEngines
      }
    },

    link(nodeType) {
        // alert(this.$route.name);
        var saveSheetDesignerSuccess = true;
        //切换设计器时要保存原设计器数据
        if(this.type=="0"){
            //保存表单
            if(window.SaveSheetDesigner && $.isFunction(window.SaveSheetDesigner)){
                saveSheetDesignerSuccess = window.SaveSheetDesigner.apply();
            }
            let app = this.$store.state.app.currentApp;
            this.$router.push({
                name: 'design-sheet',
                params: app });
        }else if(this.type=="list"){
            //保存列表
            if(window.SaveListDesigner && $.isFunction(window.SaveListDesigner)){
                window.SaveListDesigner.apply();
            }
        }else if(this.type=="1"){
            //保存流程
            if (window.Model_Save && $.isFunction(window.Model_Save)) {
                window.Model_Save.apply();
            }
            let app = this.$store.state.app.currentApp;
            this.$router.push({
                name: 'design-page',
                params: app
            });
        }
        if(saveSheetDesignerSuccess === false){
            return;
        }
        if (nodeType == '0') {
            //this.router.push();
            let app = this.$store.state.app.currentApp;
            this.$router.push({
                name: 'design-sheet',
                params: app });
            //window.location.href = './sheetdesigner.html?id=' + this.schemaCode
        } else if (nodeType == '1') {
            let app = this.$store.state.app.currentApp;
            this.$router.push({
                name: 'design-page',
                params: app
            });
        }
    },
    goBack() {
      window.location.href = './sheetdesignerindex.html?id=' + this.appCode
    },
    goHelp() {},
    toggleEngine(engineCode) {
      document.cookie = 'EngineCode=' + engineCode + ';path=/'
      window.location.href = '/Login/Index?enginecode=' + engineCode
    },
    handleClose() {
      this.ShowEngineOptions = false
    },
  }
}
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }
    .designer-nav-box {
        position: fixed;
        top: 62px;
        width: 100%;
        height: 37px;
        left:0px;
        line-height: 56px;
        /* background-color: #090723; */
        box-shadow: 0 2px 5px 0 rgba(99, 99, 99, 0.15);
        margin:0 auto;
        font-size: 14px;
        color: #fff;
        letter-spacing: 0;
        z-index: 999;

        ul {
            display: inline;
            list-style: none;
            width: auto;
            margin: 0px;
            padding: 0px;

            li {
                display: inline-block;
                margin: 0px;
                font-size: 14px;

                a {
                    display: block;
                    width: 100px;
                    height: 53px;
                    line-height: 53px;
                    text-decoration: none;
                    font-size: 14px;
                    color: #B9B9BF;
                    text-align: center;
                }

                &.active a {
                    color: #FFFFFF;
                }
            }

            li.active {
                border-bottom: 2px solid #EFEFF4;
            }
        }

        div {
            position: absolute;
        }

        .sheet-title {
            left: 15px;
            font-size: 16px;
        }

        .designer-tabs {
            width: 100%;
            height: 40px;
            line-height: 36px;
            margin: 0px;
            padding: 0px;
            text-align: center;
        }

        .right-tabs {
            right: 0;
            height: 56px;
            line-height: 56px;
            margin: 0px;
            padding: 0px;
            text-align: center;

            li {
                float: left;
                margin-top: 17px;
                margin-right: 20px;

                a {
                    width: 48px;
                    height: 22px;
                    line-height: 21px;
                    font-size: 12px;
                }

                &.help {
                    margin-right: 7px;

                    a {
                        width: 60px;
                        font-size: 14px;
                        text-align: left;

                        i {
                            font-size: 18px;
                        }

                        span {
                            magin-left: 6px;
                        }
                    }
                }

                &.user {
                    width: 22px;
                    padding-right: 20px;

                    .mask {
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 100%;
                        z-index: 1000;
                    }
                }
            }

            li.back a {
                border: 0.8px solid #B9B9BF;
                border-radius: 2.4PX;
                box-sizing: border-box;
            }

            li+li {
                padding-left: 20px;
                border-left: 1px solid #979797;
            }
        }

        .optionengines {
            position: fixed;
            top: 58px;
            right: 2px;
            width: 180px;
            max-height: 400px;
            padding-top: 10px;
            padding-bottom: 10px;
            border: 0;
            border-radius: 3px;
            box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.22);
            overflow-y: auto;
            background-color: #fff;
            z-index: 9999;

            &:before {
                content: '';
                position: fixed;
                display: inline-block;
                top: 45px;
                right: 20px;
                width: 0;
                height: 0;
                border: 7px solid #561616;
                border-color: transparent transparent #fff;
            }

            ul {
                margin-left: -40px;

                li {
                    width: 180px;
                    height: 30px;
                    line-height: 30px;
                    margin: 0;
                    padding: 0;
                    border: 0;
                    text-align: center;
                    font-size: 14px;
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    list-style: none;

                    &:hover {
                        color: #2d7fff;
                        background-color: #e5f5fe;
                        cursor: pointer;
                    }

                    &.divider:hover {
                        background-color: #ffffff;
                    }

                    &.isCurEngine {
                        color: #2d7fff;
                        margin-right: 0;
                        border-bottom: 1px solid #e1e1e1;
                    }
                }
            }
        }

        .fa {
            position: relative;
            top: 1px;
            margin: 0 4px;
        }
    }
</style>



// WEBPACK FOOTER //
// src/components/console/designer-top-nav.vue