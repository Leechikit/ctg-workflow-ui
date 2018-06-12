import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user_module'
import Sync from "vuex-router-sync";
import VuexPersistence from 'vuex-persist';
import mutation from "./mutations.js";
import state from "./state.js";
import action from "./actions.js";
import app from './modules/app';
import user from './modules/user';
import participant from './participant.js';

Vue.use(Vuex);


const store = new Vuex.Store({
  modules:{
    userModule,
    app,
    user,
    participant
  }
});

export default store