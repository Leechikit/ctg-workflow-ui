import {fetch} from './index'
export default {
    /**
     * 获取列表字段等设置
     */
    getListSetting(params){
        return fetch('/listViewSetting/getSettingList',params);
    },
    /**
     * 获取列表数据
     */
    getListData(params){
        return fetch('/act/app/appRunPage',params);
    },
    /**
     * 保存列表设置
     */
    saveListSetting(params){
        return fetch('/listViewSetting/save',params);
    }
}