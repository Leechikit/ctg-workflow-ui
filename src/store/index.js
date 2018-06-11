import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user_module'
import dragModule from './drag_module'
import routerModule from './router_module'
import Sync from "vuex-router-sync";
import VuexPersistence from 'vuex-persist';
import mutation from "./mutations.js";
import state from "./state.js";
import action from "./actions.js";
import app from './modules/app';
import user from './modules/user';
import {saveState, restoreState, customStorage} from '../helper/storge_helper.js';
import participant from './participant.js';


import {
  router
} from '../plugin/router'
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: customStorage,
    modules: ['user'],
    saveState,
    restoreState
})

const store = new Vuex.Store({
  modules:{
    userModule,
    dragModule,
    routerModule,
    app,
    user,
    participant
  },
  plugins: [vuexLocal.plugin]
});

Sync.sync(store, router, {
  moduleName: 'routerModule'
})

export default store