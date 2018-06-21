import {fetch} from './index';

export default {
    /**
     * 模型对应的应用列表
     */
    appList (param) {
        return fetch('/act/app/listApp', {moduleId:param});
    },
    /**
     * 所有应用流程实例列表
     */
    appInstanceList (param) {
        return fetch('/act/app/appInstList', param);
    },
    /**
     * 提交流程
     */
    commitAppInstance (params) {
        return fetch('/act/app/commit', params);
    },

    /**
     * 删除流程实例
     */
    deleteAppInstance (params) {
        return fetch('/act/app/delAppRun', {id:params});
    },
    /*提交用户数据*/
    commitNewData(params){
        return fetch('/act/deal/startFlow', params);
    },

    /*创建模块是插入数据*/
    createModule(params,icon) {
        return fetch('act/module/addModule', {moduleName: params,icon: icon})
    },

    /*获取自定义表单的数据*/
    getPageSoul(params){
        return fetch('/act/app/pageSoul', {id:params});
    },

    /*获取所有的模块*/
    getAllModule() {
        return fetch('/act/module/listModule');
    },
    getAllApp(){
        return fetch('/act/app/listFrequentlyUsedApp');
    },

    modModule(params){
        return fetch('/act/module/modModule',params);
    },
    delModule(params){
        return fetch('/act/module/delModule',{id:params});
    },
    addApp(params){
        return fetch('/act/app/createApp ',params);
    }


};
