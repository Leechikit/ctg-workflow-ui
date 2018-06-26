<template>
    <div id="tablelist">
        <div class="g-left">
            <c-tablelist-sidebar @loadListData="loadListData"></c-tablelist-sidebar>
        </div>
        <div class="g-right">
            <c-tablelist-table :currentId="currentId" :isLoading="isLoading" @loadListData="loadListData"></c-tablelist-table>
        </div>
    </div>
</template>

<script>
import cTablelistSidebar from "../components/tablelist-sidebar";
import cTablelistTable from "../components/tablelist-table";
import { mapGetters, mapMutations } from "vuex";
import appHTTP from "../api/app-apply";
import HTTP from "../api/listview";

export default {
  name: "app",
  components: {
    cTablelistSidebar,
    cTablelistTable
  },
  data() {
    return {
      currentId: null,
      moduleId: this.$router.currentRoute.params.moduleId,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("listview", ["getListThead"])
  },
  created() {
    this.loadListApp();
  },
  methods: {
    ...mapMutations("listview", ["setListThead", "setListTbody", "setListApp"]),
    loadListApp() {
      this.isLoading = true;
      appHTTP.appList(this.moduleId).then(res => {
        if (res.code == 0 && res.page.result && res.page.result.length > 0) {
          const appInstData = res.page.result;
          this.setListApp(appInstData);
          if (appInstData.length != 0) {
            this.currentId = appInstData[0].id;
            this.loadListSetting({
              appId: this.currentId
            });
            this.loadListData({
              appId: this.currentId
            });
          }
        }
      });
      this.isLoading = false;
    },
    loadListSetting({ appId }) {
      HTTP.getListSetting({
        appId
      }).then(res => {
        if (res.Code == 0) {
          this.setListThead(res.Data.ListViewData);
          this.title = res.Data.Title;
        }
      });
    },
    loadListData({ appId, pageNum = 1, pageSize = 10 } = {}) {
        this.isLoading = true;
      HTTP.getListData({
        appId
      }).then(res => {
        if (res.Code == 0) {
          this.setListTbody(res.Result.ReturnData);
          this.title = res.Result.Title;
        }
        this.isLoading = false;
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
#tablelist {
  height: 100%;
  background-color: #fff;
  .g-left {
    float: left;
    width: 240px;
    height: 100%;
  }
  .g-right {
    padding-left: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>