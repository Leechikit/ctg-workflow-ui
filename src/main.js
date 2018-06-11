import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import $ from 'jquery';

//拖拽
import VueResource from "vue-resource";
import interceptor from './plugin/interceptor'
import installDirective from "./plugin/install_directive"//don't delete,let vue install
import SoulUi from "./plugin/install_component"
import Store from './store/index'
import 'iview/dist/styles/iview.css'
import './style/index.less'
import  VueQuillEditor from 'vue-quill-editor'
import VueHighlightJS from 'vue-highlightjs'

//图标
import './iconfont/iconfont.css'
import  './iconfont/iconfont.js';
import  './iconfont/demo.css';

import './libs/funExtend.js';

import "./views/role/role.css"
// import "./views/form/pages/sheetDesignerIndex/sheetDesign.css"
import "./views/form/sheetDesigner/page/style.css"








Vue.use(VueHighlightJS)
Vue.use(VueQuillEditor)

Vue.dev = true

Vue.use(VueResource)
Vue.use(SoulUi)


Vue.use(VueI18n);
Vue.use(iView);

Vue.prototype.$_has = function(type, rArray) {
  // return true;
  let resources = [];
  let permission = true;
  //提取权限数组
  if (Array.isArray(rArray)) {
    rArray.forEach(function(e) {
      resources = resources.concat(e);
    });
  } else {
    resources = resources.concat(rArray);
  }
  //校验权限
  let resourcePermission = store.getters['user/permissions'];
  resources.forEach(function(p) {
    if (!resourcePermission[p]) {
      return permission = false;
    }
  });
  return permission;
}

new Vue({
    el: '#app',
    router: router,
    store: Store,
    render: h => h(App),
    data: {
        currentPageName: '',
        eventHub: new Vue()
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        //util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
