<template>
  <div id="app">
      <designer-top-nav :title="title" :schema-code="schemaCode" :app-code="appCode" :type="type"></designer-top-nav>
      <c-listview-design :tableData="tableData"></c-listview-design>
  </div>
</template>

<script>
import DesignerTopNav from "@/views/form/components/console/designer-top-nav";
import cListviewDesign from "../components/listview-design";
import {mapGetters,mapMutations} from 'vuex';
import HTTP from '../api/listview';

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
      appId: this.$router.currentRoute.params.appId,
      tableData:[]
    };
  },
  created() {
    this.loadListSetting({
      appId: this.appId
    });
    this.loadListData();
  },
  methods: {
    ...mapMutations('listview',['setListThead','setListConfig']),
    loadListSetting({ appId }) {
      HTTP.getListSetting({
        appId
      }).then(res=>{
        if(res.Code == 0){
          this.setListThead(res.Data.ListViewData);
          this.setListConfig({
            SortDirection: res.Data.SortDirection,
            SortBy: res.Data.SortBy
          })
          this.title = res.Data.Title;
        }
      });
    },
    loadListData(){
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
