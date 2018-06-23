<template>
  <div id="app">
      <designer-top-nav :title="title" :schema-code="schemaCode" :app-code="appCode" :type="type"></designer-top-nav>
      <c-listview-design :listData="getListThead" :tableData="tableData"></c-listview-design>
  </div>
</template>

<script>
import DesignerTopNav from "@/views/form/components/console/designer-top-nav";
import cListviewDesign from "../components/listview-design";
import { LoadListView } from "../assets/js/handler";
import {mapGetters,mapMutations} from 'vuex';

export default {
  name: "app",
  components: {
    DesignerTopNav,
    cListviewDesign
  },
  data() {
    return {
      title: "",
      type: "workflow",
      schemaCode: "",
      SheetCode: "",
      appCode: "",
      viewData: {
        ListViewSetting: {
          BehindCode: "",
          Javascript: ""
        }
      },
      tableData: []
    };
  },
  computed:{
    ...mapGetters(['getListThead'],'listview')
  },
  created() {
    this.Load();
    this.tableData = [
      {
        ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
        Name: "模拟数据 "
      },
      {
        ObjectId: "12c6fa61-79ff-441f-8e76-01718b5bb88c",
        Name: "模拟数据 "
      }
    ];
  },
  methods: {
    ...mapMutations(['setListThead'],'listview'),
    async Load() {
      let paramData = {
        ActionName: "Load",
        id: this.SheetCode
      };
      HTTP.getListSetting({
        appId:'3bd00151adc14c2383eee014a3400618482823988'
      }).then(res=>{
        if(res.code == 0){
          this.setListThead(this.viewData.data);
          this.title = this.viewData.title;
        }
      });
      // let data = await LoadListView(paramData, "POST");
      // let data = {
      //   Successful: true,
      //   ErrorMessage: null,
      //   Logined: true,
      //   data: {
      //     title: "表单名称",
      //     listviewData: [
      //       {
      //         name: "数据标题",
      //         id: "Name",
      //         type: 0,
      //         isChildSchema: false,
      //         isVisible: true,
      //         Sortable: false
      //       },
      //       {
      //         name: "创建人",
      //         id: "1",
      //         type: 0,
      //         isChildSchema: false,
      //         isVisible: true,
      //         Sortable: true,
      //         isQuery: true
      //       },
      //       {
      //         name: "拥有者",
      //         id: "2",
      //         type: 0,
      //         isChildSchema: false,
      //         isVisible: false,
      //         Sortable: false,
      //         isQuery: true
      //       },
      //       {
      //         name: "子表",
      //         id: "3",
      //         type: 0,
      //         isChildSchema: true,
      //         isVisible: true,
      //         Sortable: false,
      //         isQuery: false,
      //         children: [
      //           {
      //             name: "数字1",
      //             id: "31",
      //             parentId: "3",
      //             type: 0,
      //             isVisible: true,
      //             Sortable: true
      //           },
      //           {
      //             name: "数字2",
      //             id: "32",
      //             parentId: "3",
      //             type: 0,
      //             isVisible: true,
      //             Sortable: true
      //           },
      //           {
      //             name: "数字3",
      //             id: "33",
      //             parentId: "3",
      //             type: 0,
      //             isVisible: true,
      //             Sortable: true
      //           }
      //         ]
      //       },
      //       {
      //         name: "部分",
      //         id: "4",
      //         type: 0,
      //         isChildSchema: false,
      //         isVisible: true,
      //         Sortable: true,
      //         isQuery: false
      //       },
      //       {
      //         name: "顶顶顶",
      //         id: "5",
      //         type: 0,
      //         isChildSchema: false,
      //         isVisible: true,
      //         Sortable: false,
      //         isQuery: true
      //       },
      //       {
      //         name: "子表2",
      //         id: "6",
      //         type: 0,
      //         isChildSchema: true,
      //         isVisible: true,
      //         Sortable: false,
      //         isQuery: true,
      //         children: [
      //           {
      //             name: "数字2",
      //             id: "61",
      //             parentId: "6",
      //             type: 0,
      //             isVisible: true,
      //             Sortable: true
      //           },
      //           {
      //             name: "数字2",
      //             id: "62",
      //             parentId: "6",
      //             type: 0,
      //             isVisible: true,
      //             Sortable: true
      //           },
      //           {
      //             name: "数字3",
      //             id: "63",
      //             parentId: "6",
      //             type: 0,
      //             isVisible: true,
      //             Sortable: true
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // };
      // if (data && data.Successful) {
      //   this.viewData = data.data;
      //   // let listViewSetting = this.viewData.ListViewSetting;
      //   // let propertys = this.viewData.Propertys;
      //   // let timelineAxisProperties = this.viewData.TimelineAxisProperties;
      //   // let iconPropertys = this.viewData.IconPropertys;
      //   // let formulaFields = JSON.parse(this.viewData.FormulaFields);
      //   // let schemas = this.viewData.Schemas;
      //   //
      //   // window.viewSetting = new ViewSetting(
      //   //   listViewSetting,
      //   //   propertys,
      //   //   timelineAxisProperties,
      //   //   this.viewData.IsDevMode,
      //   //   this.viewData.AppCode,
      //   //   schemas,
      //   //   this.viewData.SheetCode,
      //   //   iconPropertys,
      //   //   this.viewData.RemoveAble,
      //   //   formulaFields
      //   // );
      //   // viewSetting.Init();
      //   // this.viewSetting = viewSetting;
      //   // var that = this;
      //   // window.SaveListDesigner = function() {
      //   //   that.viewSetting.Save(false);
      //   // };
      //   // this.IsDevMode = this.viewData.IsDevMode;
      //   // if (this.IsDevMode === false) {
      //   //   this.canSave = true;
      //   // }
      // } else {
      // }
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
#app {
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
}
</style>
