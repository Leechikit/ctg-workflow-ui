const listview = {
    namespaced: true,
    state: {
       listThead:[],
       listTbody:[]
    },
    getters:{
        getListThead: state => state.listThead,
        getListTbody: state => state.listTbody
    },
    mutations: {
        setListThead(state,listThead){
            state.listThead = listThead;
        },
        setListTbody(state,listTbody){
            state.listTbody = listTbody;
        }
    },
    actions: {
        
    }
};

export default listview;
