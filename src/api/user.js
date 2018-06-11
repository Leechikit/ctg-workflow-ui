import {fetch} from "./index";

export default {

	getUserList(params){
		return fetch('/user/pageList',params);
	},

	delete(params){
		return fetch('/user/delete',params);
	},

	update(params){
		return fetch('/user/update',params);
	},

	saveUser(params){
		return fetch('/user/save',params);
	},

	detail(params){
		return fetch('/user/detail',params);
	},

	parseUsers(params){
		return fetch('/user/parseUsers', params);
	}
}