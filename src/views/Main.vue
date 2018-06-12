<style lang="less">
    @import "./main.less";
    .ivu-dropdown-rel {
        position:relative
    }

    .ivu-dropdown-transfer {
        width:auto
    }

    .ivu-dropdown-item-focus,.ivu-dropdown-item:hover {
        background:#f3f3f3
    }
    .ivu-dropdown-item-disabled {
        color:#bbbec4;
        cursor:not-allowed
    }
    .ivu-dropdown-item-disabled:hover {
        color:#bbbec4;
        background-color:#fff;
        cursor:not-allowed
    }
    .ivu-dropdown-item-selected,.ivu-dropdown-item-selected:hover {
        color:#fff;
        background:rgba(45,140,240,.9)
    }
    .ivu-dropdown-item-selected.ivu-dropdown-item-focus {
        background:rgba(40,123,211,.91)
    }
    .ivu-dropdown-item-divided {
        margin-top:5px;
        border-top:1px solid #e9eaec
    }
    .ivu-dropdown-item-divided:before {
        content:"";
        height:5px;
        display:block;
        margin:0 -16px;
        background-color:#fff;
        position:relative;
        top:-7px
    }
    .ivu-dropdown-large .ivu-dropdown-item {
        padding:7px 16px 8px;
        font-size:14px!important
    }

</style>
<style>

  .icons-item {
    margin: 0 0 15px;
    height: 90px;
    width:100px;
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
.icon {
      /* 通过设置 font-size 来改变图标大小 */
      width: 8em; height: 8em;
      /* 图标和文字相邻时，垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变 SVG 的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
         normalize.css 中也包含这行 */
      overflow: hidden;
      margin:0 auto;
    }
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <!-- <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                    <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div> -->
        <div class="main-header-con" :style="{paddingLeft: shrink?'0px':'0px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-middle-module">
                     <Poptip placement="bottom" width="400">
                            <Button @click="getModuleList()" type="text">所有应用</Button>
                            <div class="api" slot="content">
                                <center>
                                  <div class="demo">
                                      <div class="demo">
                                             <div>
                                                <Row  justify="start" >
                                                  <Col span="7" v-for="item in appData">
                                                    <div class="icons-item" @click="toApp(item.id, item.moduleName)">
                                                     <svg class="icon" style="width: 4em; height: 4em;" aria-hidden="true" v-html="item.icon">
                                                        {{item.icon}}
                                                     </svg>
                                                       <span style="word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;">{{item.moduleName}}</span>
                                                    </div>
                                                  </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </center>
                            </div>
                    </Poptip>
                </div>
                <div class="header-avator-con">
                    <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen> -->
                    <!-- edit start by lzj -->
                    <authority></authority>    
                    <!-- <authority v-hasPer="['index:setting']"></authority>                     -->
                    <!-- edit end by lzj -->
                    <!--<appMana></appMana>-->
                    <!-- <lock-screen></lock-screen> -->
                    <message-tip v-model="mesCount"></message-tip>
                    <finishWork></finishWork>
                    <selfSubmit></selfSubmit>
                    <!-- <authority></authority> -->
                    <!-- <theme-switch></theme-switch> -->

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <!-- <div class="tags-con">
                <navHeader></navHeader>
            </div> -->
        </div>
        <div class="single-page-con" :style="{left: shrink?'0px':'0px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import appMana from './main-components/AppMana.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import navHeader from './main-components/navHeader.vue';
    import finishWork from './main-components/finishWork.vue';
    import selfSubmit from './main-components/selfSubmit.vue';
    import authority from './main-components/authority.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';

    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import HTTP from '../api/app-apply.js';
    import API from '../api/work-flow.js';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            finishWork,
            selfSubmit,
            themeSwitch,
            appMana,
            navHeader,
            authority,
        },
        data () {
            return {
                shrink: true,
                userName: '',
                appData:[],
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.getUnfinishJob();
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            toApp (itemId, itemName) {
            // itemId='0f60c6ecf77a431490ac69fd0d24adf4';
                this.$router.push({
                name: 'start-application',
                params: {moduleId: itemId, moduleName: itemName}
                });
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('user/logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            getModuleList() {
                this.getLoading=true;
                HTTP.getAllModule()
                .then(res => {
                    this.appData=res.page.result;
                     for(var index in this.appData){
                        this.appData[index].icon ="<use xlink:href="+this.appData[index].icon+"></use>"
                    }
                })
                .catch(err => {
                        this.$Message.error('This is an error')
                }).finally(()=>{
                        this.getLoading=false;
                })
            },
            getUnfinishJob(){
             API.unfinishJobList()
                .then(res => {
                    //this.total = res.page.total;
                   this.$store.commit('setMessageCount', res.total);          
                })
                .catch(err => {

                   this.$Message.error(err);
                }).finally(()=>{
                    this.getLoading=false;
                })
            }

        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
            this.getModuleList();
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        }
    };
</script>
