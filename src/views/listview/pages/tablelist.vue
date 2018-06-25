<template>
  <div>
    <c-listview :isLoading="isLoading" @refreshData="refreshData"></c-listview>
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
      moduleId: this.$router.currentRoute.params.moduleId,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("listview", ["getListThead"])
  },
  created() {
    this.Load();
  },
  methods: {
    ...mapMutations("listview", ["setListThead", "setListTbody"]),
    refreshData({ pageNum = 1, pageSize = 10 }) {
      this.isLoading = true;
      setTimeout(() => {
        HTTP.getListData({
          appId: this.moduleId
        }).then(res => {
          if (res.Code == 0) {
            this.setListTbody(res.Result.ReturnData);
            this.title = res.Result.Title;
          }
        });
        this.isLoading = false;
      }, 1000);
    },
    async Load() {
      HTTP.getListSetting({
        appId: this.moduleId
      }).then(res => {
        if (res.Code == 0) {
          this.setListThead(res.Data.ListViewData);
          this.title = res.Data.Title;
        }
      });
      HTTP.getListData({
        appId: this.moduleId
      }).then(res => {
        if (res.Code == 0) {
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