import {fetch} from './index';

export default {
      /**
       * 模型对应的应用列表
       */
      load (param) {
          return fetch('/act/app/load', {ActionName:"Load",SheetCode:param});
      },
      /**
       * 保存表单
       */
      release (param) {
          return fetch('/act/app/release', param);
      },
    /**
     * 提交\审批页面获取流程
     */
    FormGet (param) {
        return fetch('/act/app/FormGet', param);
    },
    formalaExecAndStartFlow(param){
        return fetch('/act/deal/formalaExecAndStartFlow', param);
    },
	formalaExecAndStartFlow2(param){
        return fetch('/act/deal/formalaValAndStartFlow2', param);
    },
    getFormInfo(param){
        return fetch('/act/app/getFormInfo', {appId:param});
    },
    loadSubmitRule(param){
        return fetch('/act/app/loadSubmitRule', {appId:param});
    },
    saveFlow(param){
      return fetch('/act/model/saveFlow', param);
      
    },
    initFlowDesigner (param) {
        return fetch('/act/model/initFlowDesigner',{appId:param});
    },
    getMenuInfo (param) {
        return fetch('/act/app/getMenuInfo',{appId:param});
    },
    parseFormulaText(param){
        return fetch('/act/model/parseFormulaText',param);
    },
    FormAttachment(param){
        return fetch('/Form/updateDesc',param);
    },
    getWorkflowClause(){
        return fetch('/act/app/getWorkflowClause');
    },
    getDataItemsByWorkflowCode(param){
        return fetch('/act/app/getDataItemsByWorkflowCode',{appId:param});
    },
    LoadPublishedSchemas(param){
        return fetch('/act/app/LoadPublishedSchemas',{appId:param});
    },
    appRunPage(param){
        return fetch('/act/app/appRunPage',{appId:param});
        
    },
    getBizObjectSchemaDisplayName(param){
        return fetch('/act/app/getBizObjectSchemaDisplayName',{appId:param})
    }
    
}
