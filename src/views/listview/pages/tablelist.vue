<template>
  <div>
    <c-listview :tableData="tableData" :isLoading="isLoading" @refreshData="refreshData"></c-listview>
  </div>
</template>

<script>
import cListview from "../components/listview";
import { mapGetters, mapMutations } from "vuex";
import HTTP from "../api/listview";

export default {
  name: "app",
  components: {
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
    };
  },
  computed:{
    ...mapGetters('listview',['getListThead'])
  },
  created() {
      console.log(this.$route);
    this.Load();
    this.tableData = [
      {
        ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
        Name: "1133.com ",
        CreatedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        CreatedBy_Name: ["卢宗兴"],
        OwnerId: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        OwnerId_Name: ["卢宗兴"],
        OwnerDeptId: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
        OwnerDeptId_Name: ["穿云团队"],
        CreatedTime: "2018-06-06 10:21",
        ModifiedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        ModifiedBy_Name: ["卢宗兴"],
        ModifiedTime: "2018-06-06 10:24",
        WorkflowInstanceId: "e68ea13a-144c-455e-9b94-ed945f57abd2",
        Status: 2,
        "1": "卢宗兴",
        "2": "卢宗兴",
        "3.31": "123",
        "3.32": "222",
        "3.33": "选项3",
        "4": "是的",
        "5": "好的",
        "6.61": "123",
        "6.62": "222",
        "6.63": "选项3"
      },
      {
        ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
        Name: "1133.com ",
        CreatedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        CreatedBy_Name: ["卢宗兴"],
        OwnerId: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        OwnerId_Name: ["卢宗兴"],
        OwnerDeptId: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
        OwnerDeptId_Name: ["穿云团队"],
        CreatedTime: "2018-06-06 10:21",
        ModifiedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        ModifiedBy_Name: ["卢宗兴"],
        ModifiedTime: "2018-06-06 10:24",
        WorkflowInstanceId: "e68ea13a-144c-455e-9b94-ed945f57abd2",
        Status: 2,
        "1": "卢宗兴",
        "2": "卢宗兴",
        "3.31": "123",
        "3.32": "222",
        "3.33": "选项3",
        "4": "是的",
        "5": "好的",
        "6.61": "123",
        "6.62": "222",
        "6.63": "选项3"
      },
      {
        ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
        Name: "1vv.com ",
        CreatedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        CreatedBy_Name: ["卢宗兴"],
        OwnerId: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        OwnerId_Name: ["卢宗兴"],
        OwnerDeptId: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
        OwnerDeptId_Name: ["穿云团队"],
        CreatedTime: "2018-06-06 10:21",
        ModifiedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
        ModifiedBy_Name: ["卢宗兴"],
        ModifiedTime: "2018-06-06 10:24",
        WorkflowInstanceId: "e68ea13a-144c-455e-9b94-ed945f57abd2",
        Status: 2,
        "1": "卢宗兴",
        "2": "卢宗兴",
        "3.31": "123",
        "3.32": "222",
        "3.33": "选项3",
        "4": "1111",
        "5": "好的",
        "6.61": "123",
        "6.62": "222",
        "6.63": "选项3"
      }
    ];
  },
  methods: {
    ...mapMutations("listview", ["setListThead",'setListTbody']),
    refreshData({ pageNum = 1, pageSize = 10 }) {
      this.isLoading = true;
      setTimeout(() => {
        this.tableData = [
          {
            ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
            Name: "1133.com ",
            CreatedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            CreatedBy_Name: ["卢宗兴"],
            OwnerId: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            OwnerId_Name: ["卢宗兴"],
            OwnerDeptId: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
            OwnerDeptId_Name: ["穿云团队"],
            CreatedTime: "2018-06-06 10:21",
            ModifiedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            ModifiedBy_Name: ["卢宗兴"],
            ModifiedTime: "2018-06-06 10:24",
            WorkflowInstanceId: "e68ea13a-144c-455e-9b94-ed945f57abd2",
            Status: 2,
            "1": "gggg",
            "2": "卢宗兴",
            "3.31": "123",
            "3.32": "222",
            "3.33": "选项3",
            "4": "是的",
            "5": "好的",
            "6.61": "123",
            "6.62": "222",
            "6.63": "选项3"
          },
          {
            ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
            Name: "1133.com ",
            CreatedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            CreatedBy_Name: ["卢宗兴"],
            OwnerId: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            OwnerId_Name: ["卢宗兴"],
            OwnerDeptId: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
            OwnerDeptId_Name: ["穿云团队"],
            CreatedTime: "2018-06-06 10:21",
            ModifiedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            ModifiedBy_Name: ["卢宗兴"],
            ModifiedTime: "2018-06-06 10:24",
            WorkflowInstanceId: "e68ea13a-144c-455e-9b94-ed945f57abd2",
            Status: 2,
            "1": "ddd",
            "2": "dddd",
            "3.31": "123",
            "3.32": "222",
            "3.33": "选项3",
            "4": "是的",
            "5": "好的",
            "6.61": "123",
            "6.62": "222",
            "6.63": "选项3"
          },
          {
            ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
            Name: "1vv.com ",
            CreatedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            CreatedBy_Name: ["卢宗兴"],
            OwnerId: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            OwnerId_Name: ["卢宗兴"],
            OwnerDeptId: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
            OwnerDeptId_Name: ["穿云团队"],
            CreatedTime: "2018-06-06 10:21",
            ModifiedBy: "1b19dbc0-7ec0-404b-b7b5-21c95298230c",
            ModifiedBy_Name: ["卢宗兴"],
            ModifiedTime: "2018-06-06 10:24",
            WorkflowInstanceId: "e68ea13a-144c-455e-9b94-ed945f57abd2",
            Status: 2,
            "1": "卢宗兴",
            "2": "卢宗兴",
            "3.31": "123",
            "3.32": "222",
            "3.33": "选项3",
            "4": "1111",
            "5": "好的",
            "6.61": "123",
            "6.62": "222",
            "6.63": "选项3"
          }
        ];
        this.isLoading = false;
      }, 1000);
    },
    async Load() {
      HTTP.getListSetting({
        appId:'685a273517d844a891c765e7b5880d14440330809'
      }).then(res=>{
        if(res.Code == 0){
          this.setListThead(res.Data.ListViewData);
          this.title = res.Data.Title;
        }
      });
      HTTP.getListData({
        appId:'685a273517d844a891c765e7b5880d14440330809'
      }).then(res=>{
        if(res.Code == 0){
          this.setListTbody(res.Result.ReturnData);
          this.title = res.Result.Title;
        }
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
html,
i,
iframe,
img,
input,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
tfoot,
time,
tt,
u,
ul,
var,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-weight: 400;
}
.single-page {
  height: 100% !important;
  padding: 10px 10px 0 0 !important;
  margin: 0 !important;
  background-color: #fff;
  & > div {
    height: 100%;
  }
}
</style>