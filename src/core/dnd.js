/**
 *  drag and drop based on html5
 *  @author SunZhengJie
 *  @email 200765821@qq.com
 */

import store from '../store/index'
import {
  deepCopy
} from '../util/assist'
import {
  generateUid,
  findSoulByCid,
  findSoulByCTypeUp,
  walkSoul
} from '../helper/soul_helper'
import {
  drop
} from './assemble'
import {
  resetSoul
} from '../core/lifecycle'

function onDragStart(e) {
  store.commit('dragModule/setDragElement', e.target)
  return true;
}

function onDrag(e) {
  return true
}

function onDragEnd(e) {
  e.preventDefault();
  store.commit('dragModule/setDragElement', null)
  return true
}

function onDragEnter(e) {
  e.preventDefault()
  e.stopPropagation()
  return true
}

function onDragOver(e) {
  e.preventDefault()
  e.stopPropagation()

  const drag = store.getters['dragModule/dragElement'];

  if (validateDrop(drag, this)) {
    markDrop(this, true)
  }

  return true;
}

function onDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  markDrop(this, false)
  return true;
}

function validateDrop(drag, drop) {
  if (!drag) {
    return false
  }

  if (drag.controlConfig.allowPlace) {
    //优先处理allow_place: FormItem只能放在Form里面
    return contains(drag.controlConfig.allowPlace,drop.controlConfig.cid);

  } else {

    if (!drop || !drop.controlConfig.allow) {
      return false

    } else if (drop.controlConfig.allow && drop.controlConfig.allow.length === 0) {
      return true

    } else if (contains(drop.controlConfig.allow,drag.controlConfig.cid)) {
      return true
    }
  }
}

function contains(allow, cid) {
  for(let i =0;i<allow.length;i++){
    allow[i] = allow[i].trim()
    if(allow[i] == cid) return true
  }
}

function markDrop(drop, mark) {
  if (mark) {
    if (!drop.classList.contains('drop')) {
      drop.classList.add('drop')
    }
  } else {
    drop.classList.remove('drop')
  }
}

function interceptDrop(saveInfo) {
  if (saveInfo.drag.type === 'WrapCard') {
    let dropPanelSoul = findSoulByCid(100, store.getters['dragModule/draggableControls'])

    let copy = deepCopy(dropPanelSoul)
    copy.slotName = 'title'
    copy.uid = generateUid()
    saveInfo.drag.children.push(copy)
    copy = deepCopy(dropPanelSoul)
    copy.slotName = 'extra'

    copy.uid = generateUid()
    saveInfo.drag.children.push(copy)
    copy = deepCopy(dropPanelSoul)
    copy.slotName = 'default'
    copy.uid = generateUid()
    saveInfo.drag.children.push(copy)
  }
  walkSoul(saveInfo.drag,(soul)=>{
    resetSoul(soul)
  })
}

function onDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  const drag = store.getters['dragModule/dragElement'];
   let repeatTime=1;
   console.log(TransferString(drag.textContent));
  if(TransferString(drag.textContent).indexOf('Col')>=0){
    repeatTime=2;
  }
  for(var num=0;num<repeatTime;num++){
        if (!validateDrop(drag, this)) {
          return false;
        }

        let uid = generateUid()
        let copy = deepCopy(drag.controlConfig)
        copy.uid = uid

        const saveInfo = {
          drag: copy,
          drop: this.controlConfig
        }
        saveInfo.drag.pid = saveInfo.drop.uid

        interceptDrop(saveInfo)

        drop(saveInfo)

        markDrop(this, false)
  }
  return true;
}

function initDropEvents(drag) {
  drag.ondragenter = onDragEnter
  drag.ondragover = onDragOver
  drag.ondrop = onDrop
  drag.ondragleave = onDragLeave
}

function TransferString(content)    
{    
    var string = content;    
    try{    
        string=string.replace(/\r\n/g," ")    
        string=string.replace(/\n/g," ");    
    }catch(e) {    
        alert(e.message);    
    }    
    return string.trim();    
}   

export {
  onDragStart,
  onDrag,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragLeave,
  initDropEvents,
  interceptDrop
}
