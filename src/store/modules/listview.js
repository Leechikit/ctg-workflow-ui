const listview = {
    namespaced: true,
    state: {
       listThead
    },
    getters:{
        getListThead: state => state.listThead
    },
    mutations: {
        setListThead(state,listThead){
            state.listThead = listThead;
        }
    },
    actions: {
        
    }
};

export default listview;
