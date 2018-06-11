import Vue from 'vue';
import {
  droppable,
  editable,
  authorization,
} from '../directive'

Vue.directive('droppable',droppable);
Vue.directive('editable',editable);
Vue.directive('hasPer',authorization.permissions);
Vue.directive('hasRole',authorization.roles);
