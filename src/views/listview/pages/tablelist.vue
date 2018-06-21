<template>
  <div>
    <c-listview :listData="viewData.listviewData" :tableData="tableData" :isLoading="isLoading" @refreshData="refreshData"></c-listview>
  </div>
</template>

<script>
import cListview from '../components/listview'

export default {
  name: 'app',
  components:{
    cListview
  },
  data() {
    return {
      SheetCode: "",
      viewData: {
        ListViewSetting: {
          BehindCode: "",
          Javascript: ""
        }
      },
      tableData: [],
      isLoading: false
    }
  },
  created(){
    this.Load();
    this.tableData = [{
                    "ObjectId":"12c6fa61-79ff-441f-8e76-01718b5bb88c",
                    "Name":"1133.com ",
                    "CreatedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "CreatedBy_Name":[
                        "卢宗兴"
                    ],
                    "OwnerId":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "OwnerId_Name":[
                        "卢宗兴"
                    ],
                    "OwnerDeptId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240",
                    "OwnerDeptId_Name":[
                        "穿云团队"
                    ],
                    "CreatedTime":"2018-06-06 10:21",
                    "ModifiedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "ModifiedBy_Name":[
                        "卢宗兴"
                    ],
                    "ModifiedTime":"2018-06-06 10:24",
                    "WorkflowInstanceId":"e68ea13a-144c-455e-9b94-ed945f57abd2",
                    "Status":2,
                    "1":"卢宗兴",
                    "2":"卢宗兴",
                    "3.31":"123",
                    "3.32":"222",
                    "3.33": "选项3",
                    "4":"是的",
                    "5":"好的",
                    "6.61":"123",
                    "6.62":"222",
                    "6.63": "选项3"
                },{
                    "ObjectId":"12c6fa61-79ff-441f-8e76-01718b5bb88c",
                    "Name":"1133.com ",
                    "CreatedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "CreatedBy_Name":[
                        "卢宗兴"
                    ],
                    "OwnerId":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "OwnerId_Name":[
                        "卢宗兴"
                    ],
                    "OwnerDeptId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240",
                    "OwnerDeptId_Name":[
                        "穿云团队"
                    ],
                    "CreatedTime":"2018-06-06 10:21",
                    "ModifiedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "ModifiedBy_Name":[
                        "卢宗兴"
                    ],
                    "ModifiedTime":"2018-06-06 10:24",
                    "WorkflowInstanceId":"e68ea13a-144c-455e-9b94-ed945f57abd2",
                    "Status":2,
                    "1":"卢宗兴",
                    "2":"卢宗兴",
                    "3.31":"123",
                    "3.32":"222",
                    "3.33": "选项3",
                    "4":"是的",
                    "5":"好的",
                    "6.61":"123",
                    "6.62":"222",
                    "6.63": "选项3"
                },{
                    "ObjectId":"12c6fa61-79ff-441f-8e76-01718b5bb88c",
                    "Name":"1vv.com ",
                    "CreatedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "CreatedBy_Name":[
                        "卢宗兴"
                    ],
                    "OwnerId":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "OwnerId_Name":[
                        "卢宗兴"
                    ],
                    "OwnerDeptId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240",
                    "OwnerDeptId_Name":[
                        "穿云团队"
                    ],
                    "CreatedTime":"2018-06-06 10:21",
                    "ModifiedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "ModifiedBy_Name":[
                        "卢宗兴"
                    ],
                    "ModifiedTime":"2018-06-06 10:24",
                    "WorkflowInstanceId":"e68ea13a-144c-455e-9b94-ed945f57abd2",
                    "Status":2,
                    "1":"卢宗兴",
                    "2":"卢宗兴",
                    "3.31":"123",
                    "3.32":"222",
                    "3.33": "选项3",
                    "4":"1111",
                    "5":"好的",
                    "6.61":"123",
                    "6.62":"222",
                    "6.63": "选项3"
                }]
  },
  methods:{
      refreshData({pageNum = 1,pageSize = 10}){
          this.isLoading = true;
          setTimeout(()=>{
              this.tableData = [{
                    "ObjectId":"12c6fa61-79ff-441f-8e76-01718b5bb88c",
                    "Name":"1133.com ",
                    "CreatedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "CreatedBy_Name":[
                        "卢宗兴"
                    ],
                    "OwnerId":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "OwnerId_Name":[
                        "卢宗兴"
                    ],
                    "OwnerDeptId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240",
                    "OwnerDeptId_Name":[
                        "穿云团队"
                    ],
                    "CreatedTime":"2018-06-06 10:21",
                    "ModifiedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "ModifiedBy_Name":[
                        "卢宗兴"
                    ],
                    "ModifiedTime":"2018-06-06 10:24",
                    "WorkflowInstanceId":"e68ea13a-144c-455e-9b94-ed945f57abd2",
                    "Status":2,
                    "1":"gggg",
                    "2":"卢宗兴",
                    "3.31":"123",
                    "3.32":"222",
                    "3.33": "选项3",
                    "4":"是的",
                    "5":"好的",
                    "6.61":"123",
                    "6.62":"222",
                    "6.63": "选项3"
                },{
                    "ObjectId":"12c6fa61-79ff-441f-8e76-01718b5bb88c",
                    "Name":"1133.com ",
                    "CreatedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "CreatedBy_Name":[
                        "卢宗兴"
                    ],
                    "OwnerId":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "OwnerId_Name":[
                        "卢宗兴"
                    ],
                    "OwnerDeptId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240",
                    "OwnerDeptId_Name":[
                        "穿云团队"
                    ],
                    "CreatedTime":"2018-06-06 10:21",
                    "ModifiedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "ModifiedBy_Name":[
                        "卢宗兴"
                    ],
                    "ModifiedTime":"2018-06-06 10:24",
                    "WorkflowInstanceId":"e68ea13a-144c-455e-9b94-ed945f57abd2",
                    "Status":2,
                    "1":"ddd",
                    "2":"dddd",
                    "3.31":"123",
                    "3.32":"222",
                    "3.33": "选项3",
                    "4":"是的",
                    "5":"好的",
                    "6.61":"123",
                    "6.62":"222",
                    "6.63": "选项3"
                },{
                    "ObjectId":"12c6fa61-79ff-441f-8e76-01718b5bb88c",
                    "Name":"1vv.com ",
                    "CreatedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "CreatedBy_Name":[
                        "卢宗兴"
                    ],
                    "OwnerId":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "OwnerId_Name":[
                        "卢宗兴"
                    ],
                    "OwnerDeptId":"18f923a7-5a5e-426d-94ae-a55ad1a4b240",
                    "OwnerDeptId_Name":[
                        "穿云团队"
                    ],
                    "CreatedTime":"2018-06-06 10:21",
                    "ModifiedBy":"1b19dbc0-7ec0-404b-b7b5-21c95298230c",
                    "ModifiedBy_Name":[
                        "卢宗兴"
                    ],
                    "ModifiedTime":"2018-06-06 10:24",
                    "WorkflowInstanceId":"e68ea13a-144c-455e-9b94-ed945f57abd2",
                    "Status":2,
                    "1":"卢宗兴",
                    "2":"卢宗兴",
                    "3.31":"123",
                    "3.32":"222",
                    "3.33": "选项3",
                    "4":"1111",
                    "5":"好的",
                    "6.61":"123",
                    "6.62":"222",
                    "6.63": "选项3"
                }]
                this.isLoading = false;
          },1000);
      },
    async Load() {
      let paramData = {
        ActionName: "Load",
        id: this.SheetCode
      };
      // let data = await LoadListView(paramData, "POST");
      let data = {
    "Successful": true,
    "ErrorMessage": null,
    "Logined": true,
    "data": {
        "title": "表单名称",
        "listviewData": [{
            "name": "数据标题",
            "id": "Name",
            "type": 0,
            "isChildSchema": false,
            "isVisible": true,
            "canSort": false
        }, {
            "name": "创建人",
            "id": "1",
            "type": 0,
            "isChildSchema": false,
            "isVisible": true,
            "canSort": true
        },{
            "name": "拥有者",
            "id": "2",
            "type": 0,
            "isChildSchema": false,
            "isVisible": false,
            "canSort": false
        },{
            "name": "子表",
            "id": "3",
            "type": 0,
            "isChildSchema": true,
            "isVisible": true,
            "canSort": false,
            "children": [{
                "name": "数字1",
                "id": "31",
                "parentId": "3",
                "type": 0,
                "isVisible": true,
                "canSort": true
            },{
                "name": "数字2",
                "id": "32",
                "parentId": "3",
                "type": 0,
                "isVisible": true,
                "canSort": true
            },{
                "name": "数字3",
                "id": "33",
                "parentId": "3",
                "type": 0,
                "isVisible": true,
                "canSort": true
            }]
        },{
            "name": "部分",
            "id": "4",
            "type": 0,
            "isChildSchema": false,
            "isVisible": true,
            "canSort": true
        },{
            "name": "顶顶顶",
            "id": "5",
            "type": 0,
            "isChildSchema": false,
            "isVisible": true,
            "canSort": false
        },{
            "name": "子表2",
            "id": "6",
            "type": 0,
            "isChildSchema": true,
            "isVisible": true,
            "canSort": false,
            "children": [{
                "name": "数字2",
                "id": "61",
                "parentId": "6",
                "type": 0,
                "isVisible": true,
                "canSort": true
            },{
                "name": "数字2",
                "id": "62",
                "parentId": "6",
                "type": 0,
                "isVisible": true,
                "canSort": true
            },{
                "name": "数字3",
                "id": "63",
                "parentId": "6",
                "type": 0,
                "isVisible": true,
                "canSort": true
            }]
        }]
    }
}
      if (data && data.Successful) {
        this.viewData = data.data;
        // let listViewSetting = this.viewData.ListViewSetting;
        // let propertys = this.viewData.Propertys;
        // let timelineAxisProperties = this.viewData.TimelineAxisProperties;
        // let iconPropertys = this.viewData.IconPropertys;
        // let formulaFields = JSON.parse(this.viewData.FormulaFields);
        // let schemas = this.viewData.Schemas;
        //
        // window.viewSetting = new ViewSetting(
        //   listViewSetting,
        //   propertys,
        //   timelineAxisProperties,
        //   this.viewData.IsDevMode,
        //   this.viewData.AppCode,
        //   schemas,
        //   this.viewData.SheetCode,
        //   iconPropertys,
        //   this.viewData.RemoveAble,
        //   formulaFields
        // );
        // viewSetting.Init();
        // this.viewSetting = viewSetting;
        // var that = this;
        // window.SaveListDesigner = function() {
        //   that.viewSetting.Save(false);
        // };
        // this.IsDevMode = this.viewData.IsDevMode;
        // if (this.IsDevMode === false) {
        //   this.canSave = true;
        // }
      } else {
      }
    }
  }
}
</script>

<style lang="scss">
html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, html, i, iframe, img, input, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, tfoot, time, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 14px;
    font-weight: 400;
}
.single-page{
    height: 100% !important;
    padding: 10px 10px 0 0 !important;
    margin: 0 !important;
    background-color: #fff;
    &>div{
        height:100%;
    }
}
</style>