import {fetch} from "./index";

export default {

	getChildList(params){
		return fetch('/organ/childList',params);
	},

	delete(id){
		return fetch('/organ/delete/'+id);
	},

	update(params){
		return fetch('/organ/update',params);
	},

	addOrgan(params){
		return fetch('/organ/add',params);
	},

	queryLeaf(params){
		return fetch('/organ/queryLeaf',params);
	},
}