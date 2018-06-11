(function($){
var myflow = $.myflow;

	$.extend(true,myflow.config.rect,{
		attr : {
		r : 8,
		fill : '#F6F7FF',
		stroke : '#03689A',
		"stroke-width" : 2
	}
	});

	$.extend(true,myflow.config.props.props,{
		name : {name:'name', label:'名称', value:'', editor:function(){return new myflow.editors.inputEditor();}},
		desc : {name:'desc', label:'描述', value:'', editor:function(){return new myflow.editors.textAreaEditor();}}
	});

	//$.extend(true,myflow.config.tools.path)
	
	var openFlag = false;

	$.extend(true,myflow.config.tools.states,{
		start :
		{
			showType: 'image',
			type : 'start',
			name : {text:'<<start>>'},
			text : {text:'开始'},
			img : {src : 'img/48/start_event_empty.png',width : 48, height:48},
			attr : {width:50 ,heigth:50 },
			props : {
				text: {name:'text',label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'开始'},
				remark: {name:'remark', label : '备注', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				// temp2: {name:'temp2', label : '选择', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
			}
		},
		end :   
		{
			showType: 'image',type : 'end',
			name : {text:'<<end>>'},
			text : {text:'结束'},
			img : {src : 'img/48/end_event_terminate.png',width : 48, height:48},
			attr : {width:50 ,heigth:50 },
			props : {
				text: {name:'text',label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'结束'},
				remark: {name:'remark', label : '备注', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				// temp2: {name:'temp2', label : '选择', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
			}
		},
		'end-cancel' :
		{			
			showType: 'image',
			type : 'end-cancel',
			name : {text:'<<end-cancel>>'},
			text : {text:'取消'},
			img : {src : 'img/48/end_event_cancel.png',width : 48, height:48},
			attr : {width:50 ,heigth:50 },
			props : {
				text: {name:'text',label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'取消'},
				temp1: {name:'temp1', label : '文本', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				temp2: {name:'temp2', label : '选择', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
			}
		},
		'end-error' : 
		{
			showType: 'image',type : 'end-error',
			name : {text:'<<end-error>>'},
			text : {text:'错误'},
			img : {src : 'img/48/end_event_error.png',width : 48, height:48},
			attr : {width:50 ,heigth:50 },
			props : {
				text: {name:'text',label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'错误'},
				temp1: {name:'temp1', label : '文本', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				temp2: {name:'temp2', label : '选择', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
			}
		},
		manualTask : 
		{
			showType: 'text',type : 'manualTask',
			name : {text:'<<manualTask>>'},
			text : {text:'抄送节点'},
			img : {src : 'img/48/task_empty.png',width : 48, height:48},
			props : {
				text: {name:'text',label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'抄送节点'},
				desc: {name:'desc', label : '描述', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				userId: {name:'userId', label: '抄送人', value:'', 
					editor: function () {
						return new myflow.editors.buttonEditor('manDialog','点击选择抄送人',function(args) {
							$('#setManButton').unbind('click').bind('click',function() {
                                var approverList = [],orgList = [];
                            	$('#userLi input[name=userSet]:checked').each(function(index,item) {
                            		approverList.push($(item).val());
                            	})
                                var users = approverList.join(",");
                                args.data[0][args.data[1]].value = users;
                                $('#orgLi input[name=orgSet]:checked').each(function(index,item) {
                            		orgList.push($(item).val());
                            	})
                            	var organs = orgList.join(",");
                            	args.data[0].organId = {value:organs,hidden:true};
                            	// if(($('#orgLi input[name=orgSet]:checked')>0) || ($('#userLi input[name=userSet]:checked').length > 1)){
                            	// 	args.data[0].organId.value = organs;
	                            // 	args.data[0].isMuti.value = true;
	                            // 	args.data[0].passNum.value = $('#passNum').val() || 1;
                            	// }
                                $('#setMan').dialog('close');
                            })
                            $('#cancelManButton').unbind('click').bind('click',function() {
                            	$('#setMan').dialog('close');
                            })
							$('#setPassRule').css("display","none");
							$('#southReg').css("height","auto");
						 	$('#setMan').dialog('open');
							if(openFlag) return;
						 	$.ajax({
						 		type:'get',
						 		data:{},
						 		async:true,
						 		url:'/ctg-workflow/organ/queryLeaf',
						 		success:function (res) {
						 			var organList = res.page.result;
									organList.forEach(function(item) {
								 		// $('<div><label onClick=getUsers("'+ item.id + '")>' + item.name + '</label><input type="checkbox" name = "userSet" value="'+item.id+'"></input></div>').appendTo('#orgLi');
								 		$('<div><label style="padding-left:10px">' + item.name + '</label><input type="checkbox" name = "orgSet" value="'+item.id+'"></input></div>').appendTo('#orgLi');
								 	})
						 		}
						 	})
						 	$.ajax({
								type:'post',
								data:{
									// organId:organId
								},
								url:'/ctg-workflow/user/pageList',
								success:function (res) {
									var userList = res.page.result;
									userList.forEach(function(item) {
								 		$('<div><label style="padding-left:10px">' + item.userName +'</label><input type="checkbox" name = "userSet" value="'+item.id+'"></input></div>').appendTo('#userLi');
								 	})
								}
							})
							openFlag = true;
						})
					}
				},
			}
		},
		fork :  
		{
			showType: 'image',type : 'fork',
			name : {text:'<<fork>>'},
			text : {text:'分支'},
			img : {src : 'img/48/gateway_parallel.png',width :48, height:48},
			attr : {width:50 ,heigth:50 },
			props : {
				text: {name:'text', label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'分支'},
				temp1: {name:'temp1', label: '文本', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				temp2: {name:'temp2', label : '选择', value:'', editor: function(){return new myflow.editors.selectEditor('select.json');}}
			}
		},
		join :  
		{
			showType: 'image',type : 'join',
			name : {text:'<<join>>'},
			text : {text:'合并'},
			img : {src : 'img/48/gateway_parallel.png',width :48, height:48},
			attr : {width:50 ,heigth:50 },
			props : {
				text: {name:'text', label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'合并'},
				temp1: {name:'temp1', label: '文本', value:'', editor: function(){return new myflow.editors.inputEditor();}},
				temp2: {name:'temp2', label : '选择', value:'', editor: function(){return new myflow.editors.selectEditor('select.json');}}
			}
		},
		task :  
		{
			showType: 'text',type : 'task',
			name : {text:'<<task>>'},
			text : {text:'任务'},
			img : {src : 'img/48/task_empty.png',width :48, height:48},
			props : {
				text: {name:'text', label: '显示', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'审批任务'},
				userId: {name:'userId', label: '审批人', value:'', 
					// editor: function(){
					// 	var userNameList = [];
					// 	$.ajax({
					// 		type:'get',
					// 		data:{},
					// 		async:false,
					// 		url:'/ctg-workflow/user/pageList',
					// 		success: function (res) {
					// 			var userList = res.page.result;
					// 			//var userNameList = [];
					// 			for (var i = 0; i < userList.length; i++) {
					// 				var user = {};
					// 				user.name = userList[i].userName;
					// 				user.value = userList[i].id;
					// 				userNameList.push(user);
					// 			}
					// 		}
					// 	});
					// 	return new myflow.editors.selectEditor(userNameList);
					// }
					editor: function () {
						return new myflow.editors.buttonEditor('manDialog','点击选择审批人',function(args) {
							$('#setManButton').unbind('click').bind('click',function() {
                                var approverList = [],orgList = [];
                                console.log($('#userLi input[name=userSet]:checked'));
                            	$('#userLi input[name=userSet]:checked').each(function(index,item) {
                            		approverList.push($(item).val());
                            	})
                                var users = approverList.join(",");
                                args.data[0][args.data[1]].value = users;
                                $('#orgLi input[name=orgSet]:checked').each(function(index,item) {
                            		orgList.push($(item).val());
                            	})
                            	var organs = orgList.join(",");
                            	args.data[0].organId = {value:organs,hidden:true};
                            	args.data[0].isMulti = {hidden:true,value:false};
                            	args.data[0].passNum = {hidden:true,value:""};
                            	if(($('#orgLi input[name=orgSet]:checked')>0) || ($('#userLi input[name=userSet]:checked').length > 1)){
                            		args.data[0].organId.value = organs;
	                            	args.data[0].isMulti.value = true;
	                            	args.data[0].passNum.value = $('#passNum').val() || 1;
                            	}
                            	console.log(args);
                                $('#setMan').dialog('close');
                            })
                            $('#cancelManButton').unbind('click').bind('click',function() {
                            	$('#setMan').dialog('close');
                            })
							$('#setPassRule').css("display","block");
							$('#southReg').css("height","auto");
							$("#setMan input[type=checkbox]:checked").each(function(){
								
							}); 
						 	$('#setMan').dialog('open');
							if(openFlag) return;
						 	$.ajax({
						 		type:'get',
						 		data:{},
						 		async:true,
						 		url:'/ctg-workflow/organ/queryLeaf',
						 		success:function (res) {
						 			var organList = res.page.result;
									organList.forEach(function(item) {
								 		// $('<div><label onClick=getUsers("'+ item.id + '")>' + item.name + '</label><input type="checkbox" name = "userSet" value="'+item.id+'"></input></div>').appendTo('#orgLi');
								 		$('<div><label style="padding-left:10px">' + item.name + '</label><input type="checkbox" name = "orgSet" value="'+item.id+'"></input></div>').appendTo('#orgLi');
								 	})
						 		}
						 	})
						 	$.ajax({
								type:'post',
								data:{
									// organId:organId
								},
								url:'/ctg-workflow/user/pageList',
								success:function (res) {
									var userList = res.page.result;
									userList.forEach(function(item) {
								 		$('<div><label style="padding-left:10px">' + item.userName +'</label><input type="checkbox" name = "userSet" value="'+item.id+'"></input></div>').appendTo('#userLi');
								 	})
								}
							})
							openFlag = true;
						 })
					}
				},
				desc: {name:'desc', label : '描述', value:'', editor: function(){return new myflow.editors.inputEditor();}}
			}
		}
	});
})(jQuery);