<template>
    <div>
      <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
            <Icon type="information-circled"></Icon>
            <span>流程信息</span>
      </p>
      
       <Form :label-width="80">
       <div>
            <!-- <table class="table">
              <thead>
              <tr>
                <td colspan="2">审批详情</td>
              </tr>
              </thead>
              <tbody v-for='item in currentApproval.data'>
              <tr>
                <th>{{item.name}}</th>
                <td>
                  {{item.valueStr}}
                </td>
              </tr>
              </tbody>
          </table> -->
           <openModal  v-if="showModal"  :result="currentApproval.data" :code="currentCode"></openModal>
      </div>
       </Form>
       
     <i-table  :content="self" :loading="getLoading" :columns="columns" :data="csvData" size="small" ref="tableCsv" ></i-table>

     <img :src="currentImg" alt="" v-if="showCropedImage" style="width: auto;margin-top:50px;margin-left:50px">
    </div>
</template>
<script>
import {filter} from '../data/filter.js'
import HTTP from '../../../api/work-flow.js';
import  {dataFormat} from '../../../util/assist.js';
import openModal from '../components/approvalDetail.vue';
    export default {
        components: {
            openModal, 
        },
        data () {
            return {
                modelhiden : false,
                self:this,
                getLoading:false,
                showModal:false,
                showCropedImage:false,
                currentCode:"",
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
			    const color = row.taskAction == 1 ? 'blue' : row.taskAction == 2 ? 'red': row.taskAction == 3 ? 'gray': row.taskAction == 4 ? 'black': row.taskAction == 5 ? 'yellow': row.taskAction == 6 ? 'yellow': row.taskAction == 7 ?'green':'orange';
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
                                          render: (h, params)=> {  
              				let text = dataFormat(params.row.dealTime);
              			    return h('div',{},text);}  
                                      }
                                   ],
                                    csvData:[],
              		      currentApproval:{data:[]}
                          }

                      },
                      props:[
                          'value'
                      ],
                      mounted(){
                          this.getApprovelLog(this.value);
                          
                      },
                      methods: {
                      valueChange() {
                              var obj = this
                              this.$emit('value', obj.formValidate)
                          },
                      getApprovelLog(value){
                               
                              this.showCropedImage=false;
                              this.currentImg = "/ctg-workflow/act/app/showFlowImg?processInstanceId="+value.row.instanceId+"&time="+(new Date());
                              this.showCropedImage=true;
                              
                              HTTP.appInfoLog(value.row.id)
                              .then(res => {
                                 
                               this.currentCode=value.row.id;
              		           this.currentApproval.data = res.propertyJson;
                               this.csvData=res.page.result
                               this.showModal=true;


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

<style lang="less" scoped>
  .table {
    display: table;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 100%;
    border-collapse: collapse;
    color: #666;
    border: 1px solid #CECECE;
    font-size: 12px;
  }

  .table thead th,
  .table thead td {
    background: #ECECEC;
    border-top: 1px solid #CECECE;
    border-bottom: 1px solid #CECECE;
    color: #666;
    padding: 5px 9px;
  }

  .table thead td {
    height: 40px;
    font-weight: bold;
  }

  .table tbody tr td,
  .table tbody tr th {
    border-bottom: solid 1px #E5E5E5;
    vertical-align: middle;
    height: 40px;
  }

  .table tbody tr th {
    text-align: right;
    padding-right: 10px;
    background: #F8F8F8;
    border-right: 1px solid #E5E5E5;
    color: #666;
    font-weight: 400;
    width: 200px;
  }

  .table tbody tr td {
    padding-left: 10px;
  }
  </style>

