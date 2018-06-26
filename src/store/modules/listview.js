const listview = {
    namespaced: true,
    state: {
       listThead:[], // 表格表头字段
       listTbody:[], // 表格内容
       listApp:[], // 应用列表
       listConfig:{} // 表格设置
    },
    getters:{
        getListThead: state => state.listThead,
        getListTbody: state => state.listTbody,
        getListApp: state => state.listApp,
        getListConfig: state => state.listConfig
    },
    mutations: {
        setListThead(state,listThead){
            state.listThead = listThead;
        },
        setListTbody(state,listTbody){
            state.listTbody = listTbody;
        },
        setListApp(state,listApp){
            state.listApp = listApp;
        },
        setListConfig(state,listConfig){
            state.listConfig = listConfig;
        }
    },
    actions: {
        
    }
};

export default listview;
