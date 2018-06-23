import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user_module';
import VuexPersistence from 'vuex-persist';
import mutation from "./mutations.js";
import state from "./state.js";
import action from "./actions.js";
import app from './modules/app';
import user from './modules/user';
import listview from './modules/listview';
import {saveState, restoreState, customStorage} from '../helper/storge_helper.js';
import participant from './participant.js';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: customStorage,
    modules: ['user'],
    saveState,
    restoreState
});

const store = new Vuex.Store({
  modules:{
    userModule,
    app,
    user,
    listview,
    participant
  },
  plugins: [vuexLocal.plugin]
});

export default store