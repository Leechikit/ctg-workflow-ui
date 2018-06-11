import Vue from 'vue'
import {findSoulByUidDown} from '../helper/soul_helper'
import {findElUpward} from '../helper/dom_helper'
import {isPlain} from '../util/assist'
import {getVueCode} from '../helper/code_helper'
import pretty from 'pretty'

export default {
  namespaced: true,
  state: {
    soul: null,//the view data of current routerPath
    dragElement: null,//current dragging element
    draggableControls: null,//draggableControls are the draggable items on the left side of dropPanel
    editLayer: {},//the cover appears when hover the dropped element
    rightClickMenu: {},//right click menu when right click the dropped element
    controlClazzes: [],//left side controls in assemble factory
    editSoul: null,
    vueCode:null,
    showCode:false
  },
  getters: {
    soul: ({soul}) => soul,
    dragElement: ({dragElement}) => dragElement,
    draggableControls: ({draggableControls}) => draggableControls,
    editLayer: ({editLayer}) => editLayer,
    rightClickMenu: ({rightClickMenu}) => rightClickMenu,
    controlClazzes: ({controlClazzes}) => controlClazzes,
    editSoul: ({editSoul}) => editSoul,
    showCode:({showCode})=>showCode,
    vueCode: ({soul}) => {
      let data = {},
        prettyCode = pretty(getVueCode(soul))

      return prettyCode
    }
  } ,
  mutations: {
    setShowCode:(state,showCode)=>{
      state.showCode = showCode
    },
    setSoul: (state, soul) => {
      state.soul = soul
      
    },
    setDraggableControls(state, draggableControls){
      state.draggableControls = draggableControls
       console.log(state.draggableControls);
    },
    setDragElement(state, element){
      state.dragElement = element

    },
    clear(state,type){
      if(type==='layer'){
        state.editLayer = {
          style: {
            display: 'none'
          }
        }
      }else {
        state.rightClickMenu = {}
      }
    },
    setEditLayer(state, bind){
      let rect = bind.el.getBoundingClientRect();
      state.editLayer = {
        style: {
          left: rect.x + 'px',
          top: rect.y+ 'px',
          width: rect.width + 'px',
          height: rect.height + 'px',
          display: 'block'
        },
        name: bind.binding.value + ':' + bind.el.controlConfig.uid
      }
    },
    setRightClickMenu(state, el){
      let e = e || window.event;
      //x,y of mouse
      let oX = e.clientX;
      let oY = e.clientY - 20;
      //x,y of menu appears
      state.rightClickMenu = {
        style: {
          display: "block",
          left: oX + "px",
          top: oY + "px"
        },
        uid: el.controlConfig.uid
      }
    },
    showEditorPanel(state, e){
      e.stopPropagation()
      state.rightClickMenu = {
        style: {
          display: "none",
        }
      }
      const el = findElUpward(e.target);
      const soul = findSoulByUidDown(el.controlConfig.uid, state.soul);
      if (soul && soul.model) {
        state.editSoul = soul
        return
      }
      state.editSoul = null
    }
  },
  actions: {
    getControlClazzes({state}){
      Vue.http.post('ctg-workflow/class/classList').then(res => {
        if (res.data.code === 10000) {
          state.controlClazzes = res.data.data
        }
      })
    }
  }
}
