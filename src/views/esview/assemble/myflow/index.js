$(function() {
	var modelId = getUrlParam('modelId');
	var appId = getUrlParam('appId')?getUrlParam('appId'):'';
	console.log(modelId)
	var flowdata = undefined;
	if(modelId){
		$.ajax({
			type:'post',
			data:{modelId:modelId},
			async:false,
			url:'/ctg-workflow/act/model/jsonModel',
			success: function (res) {
				if(res && (res != '') && (res!={})) flowdata = res;
			}
		})
	}
	console.log(eval("("+flowdata+")"));
	$('#myflow').myflow(
		{
			basePath : "",
			allowStateMutiLine:true,
			// restore : flowdata,
			restore: eval("("+flowdata+")"),
			tools : {
				save : function(data,appName,description) {
					console.log("保存",data);
					appName = $('#appName').val();
					description = $('#desc').val();
					var moduleId = window.sessionStorage.getItem("moduleId");
					if(!appName) {
						alert("应用名称不能为空") ;
						return;
					}
					$.ajax({
						type: 'put',
						data:{
							moduleId: JSON.parse(moduleId?moduleId:null),
							pagesoul: window.sessionStorage.getItem("FormItem"),
							json_xml: JSON.stringify(data),
							appName:appName,
							description:description,
							appId:appId
						},
						url:'/ctg-workflow/act/model/saveModel',
						success: function (res) {
							$( "#dialog-modal" ).dialog( "close" );
							if((res).code == 0){
								alert("保存成功")
							}
							if((res).code != 0){
								alert("保存失败");
							}
						}
					})
				},
				publish:function(data){
					console.log("发布",eval("("+data+")"));
				},
				addPath:function(id,data){
					console.log("添加路径",id,eval("("+data+")"));
				},
				addRect:function(id,data){
					//console.log("添加状态",id,eval("("+data+")"));
				},
				clickPath:function(id){
					//console.log("点击线",id)
				},
				clickRect:function(id,data){
					//console.log("点击状态",id,eval("("+data+")"));
				},
				deletePath:function(id){
					//console.log("删除线",id);
				},
				deleteRect:function(id,data){
					//console.log("删除状态",id,eval("("+data+")"));
				},
				revoke:function(id){

				}
			}
	});
	
	/** 
 * 取得url参数 
 */  
	function getUrlParam(name) {  
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象  
	    var r = window.location.search.substr(1).match(reg);  // 匹配目标参数  
	    if (r != null && r!=undefined && r!="undefined") return unescape(r[2])!="undefined"?unescape(r[2]):null; return null; // 返回参数值  
	}  
});

// $.getJSON("./pageSoul.json",function(data) {
// 	console.log(data);
// 	window.sessionStorage.setItem("FormItem",JSON.stringify(data));
// })