import store from '../store'
import {
  isPlain,
  stringify,
  isNumber,
  dataFormat,
  deepCopy
} from '../util/assist'
import {
  currentUid,
  walkSoul,
  refreshInitScript
} from '../helper/soul_helper'

function addApp() {
  if (!this.opModel.name) {
    return void this.$Message.error('name cant be empty')
  }
  if (!isNumber(this.opModel.sort)) {
    return void this.$Message.error('sort must be number')
  }
  this.$http.post('app/add', this.opModel).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('saved')
    }
  })
}

function delApp(id) {
  this.$http.get('app/del/' + id).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('deleted')
    }
  })
}

function updateApp() {
  if (!this.opModel.name) {
    return void this.$Message.error('name cant be empty')
  }
  if (!isNumber(this.opModel.sort)) {
    return void this.$Message.error('sort must be positive')
  }
  this.$http.post('app/update', this.opModel).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('saved')
    }
  })
}

function getAppList({appName}, fn) {
  this.$http.post('app/appList', {name: appName}).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

function getTableAppList() {
  this.tableData = []
  this.loading = true
  this.$http.post('app/tableAppList', this.searchInput).then(res => {
    if (res.data.code === 10000) {
      this.loading = false
      let data = res.data.data
      this.searchInput.total = data.total
      this.tableData = data.list
    }
  })
}

function getRichApp(id, fn) {
  this.$http.get('app/richApp/' + id).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

function addPage() {
 
  let soul = deepCopy(store.getters['dragModule/soul'])
  refreshInitScript(soul)
  walkSoul(soul,soul=>{
    for(let key in soul.model){
     if(soul.model[key].dontSave){
        soul.model[key].value = []
     }
    }
  })
  soul.maxUid = currentUid()
  this.opModel.pageSoul = stringify(soul)
  this.opModel.appId = this.appId
  sessionStorage.setItem("FormItem",this.opModel.pageSoul);
}

function delPage(id) {
  this.$http.get('page/del/' + id).then(res => {
    if (res.data.code === 10000) {
      getTablePageList.call(this)
      this.$Message.success('deleted')
    }
  })
}

function updatePage() {
  let soul = deepCopy(store.getters['dragModule/soul'])
  refreshInitScript(soul)
  walkSoul(soul,soul=>{
    for(let key in soul.model){
      if(soul.model[key].dontSave){
        soul.model[key].value = []
      }
    }
  })
  soul.maxUid = currentUid()
  this.opModel.pageSoul = stringify(soul)
  this.$http.post('page/update', this.opModel).then(res => {
    if (res.data.code === 10000) {
      this.$Message.success('saved')
    }
  })
}

function getPageList({all}, fn) {
  this.$http.post('page/pageList', {all}).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

function getTablePageList() {
  this.tableData = []
  this.loading = true
  this.$http.post('page/tablePageList', this.searchInput).then(res => {
    if (res.data.code === 10000) {
      this.loading = false
      let data = res.data.data
      data.list.forEach(item=>{
        item.updateDt = dataFormat(item.updateDt)
      })
      this.searchInput.total = data.total
      this.tableData = data.list
    }
  })
}

function getRichPage(id, fn) {
  this.$http.get('page/richPage/').then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

export {
  addPage,
  delPage,
  updatePage,
  getPageList,
  getTablePageList,
  getRichPage,
  addApp,
  delApp,
  updateApp,
  getAppList,
  getTableAppList,
  getRichApp
}
