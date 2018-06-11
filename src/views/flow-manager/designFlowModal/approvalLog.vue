<template>
    <div>
      <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
            <Icon type="information-circled"></Icon>
            <span>审批记录</span>
      </p>      
     <i-table  :content="self" :loading="getLoading" :columns="columns" :data="csvData" size="small" ref="tableCsv" ></i-table>

     <img :src="currentImg" alt="" v-if="showCropedImage" style="width: auto;margin-top:50px;margin-left:50px">
        <!-- <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
        </div> -->
   </div>
</template>
<script>
import {filter} from '../data/filter.js'
import HTTP from '../../../api/work-flow.js';
import  {dataFormat} from '../../../util/assist.js';
    export default {
        data () {
            return {
                self:this,
                getLoading:false,
                showCropedImage:false,
                columns:[
                        {
                            type: 'index',
                            width: 60,
                            'fixed': 'left',
                            align: 'center'
                        },
                        {
                            'title': '环节名称',
                            'key': 'taskName',
                            'fixed': 'left',
                            'width': 100
                        },
                        {
                            'title': '办理人',
                            'key': 'dealName',
                            'width': 157,
                            'sortable': true,
                            filters: [
                                {
                                    label: '大于4000',
                                    value: 1
                                },
                                {
                                    label: '小于4000',
                                    value: 2
                                }
                            ],
                            filterMultiple: false,
                            filterMethod (value, row) {
                                if (value === 1) {
                                    return row.show > 4000;
                                } else if (value === 2) {
                                    return row.show < 4000;
                                }
                            }
                        },
                        {
                        title: '办理结果',
                        key: 'taskAction',
                        width:150,
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.taskAction == 1 ? 'blue' : row.taskAction == 2 ? 'red': row.taskAction == 3 ? 'gray': row.taskAction == 4 ?'black': row.taskAction == 5 ? 'yellow': row.taskAction == 6 ? 'yellow': row.taskAction == 7 ?'green':'orange';
                            const text = row.taskAction == 1 ? '同意' : row.taskAction == 2 ? '反对': row.taskAction == 3 ?'弃权':row.taskAction == 4 ?'驳回': row.taskAction == 5 ?'转办': row.taskAction == 6 ?'批阅': row.taskAction == 7 ?'跳转':'未审批';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                        },      
                        {
                            'title': '审批意见',
                            'key': 'taskResult',
                            'width': 150,
                            'sortable': true
                        },  {
                            'title': '创建时间',
                            'key': 'createTime',
                            'width': 170,
                            'sortable': true,
			    render: (h, params)=> {  
				let text = dataFormat(params.row.createTime);
			    return h('div',{},text);}  
                        },{
                            'title': '办理时间',
                            'key': 'dealTime',
                            'width': 170,
                            'sortable': true,			    
			    render: (h, params)=> { let text = dataFormat(params.row.dealTime);
				return h('div',{},text);
			    }  
                        }
                     ],
                      csvData:[]
            }

        },
        props:[
            'value'
        ],
        mounted(){
            this.getApprovelLog(this.value)
        },
        methods: {
            valueChange() {
                var obj = this
                this.$emit('value', obj.formValidate)
            },
            getApprovelLog(value){

                this.showCropedImage=false;
                this.currentImg = "/ctg-workflow/act/app/showFlowImg?processInstanceId="+value.instanceId+"&time="+(new Date());
                this.showCropedImage=true;
                this.getLoading=true;
                HTTP.approvalRecord(value.id)
                .then(res => {
                    this.csvData=res.page.result; 
                })
                .catch(err => {
                    console.log(err);
                   this.$Message.error('This is an error')
                }).finally(()=>{
                 this.getLoading=false;
                })
            },
	    timestampToTime(timestamp) {
		var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s;
	    }
        }
        
    }
</script>
