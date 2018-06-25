<template>
    <div id="listview">
        <div class="btn-list">
            <Button type="primary" icon="plus" @click="openNew">新增</Button>
          </div>
          <div class="listview-table">
              <Table border :columns="tableColumns" :data="tableDatas" :stripe="true" :loading="isLoading"></Table>
          </div>
          <div id="TablePageIndex" class="table-page">
            <Page class-name="list-page" :current="pageNum" :total="total" :show-elevator="true" show-sizer show-total @on-change="changePageNum" @on-page-size-change="changePageSize"></Page>
        </div>
        <Modal v-model="showModal">
          <openModal v-if="showModal" :code="currentId"></openModal>
        </Modal>
    </div>
</template>
<script>
import { Modal } from "iview";
// import openModal from "@/views/home/assoModal.vue";
import { mapGetters, mapMutations } from "vuex";
import openModal from "@/views/home/openModal.vue";

export default {
  components: { openModal },
  props: ["currentId", "isLoading"],
  data() {
    return {
      moduleId: this.$router.currentRoute.params.moduleId,
      self: this,
      pageNum: 1,
      pageSize: 10,
      total: 50,
      showModal: false
    };
  },
  computed: {
    ...mapGetters("listview", ["getListThead", "getListTbody"]),
    // 表格表头
    tableColumns() {
      const that = this;
      let tableArrs = [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "数据标题",
          key: "Name",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click() {
                    Modal.info({
                      //scrollable:true,
                      title: params.row.Name,
                      width: "800px",
                      render: h => {
                        return h(openModal, {
                          props: {
                            Code: params.row.ObjectId
                          },
                          on: {}
                        });
                      },
                      onOk: () => {}
                    });
                    console.log(params.row.ObjectId);
                  }
                }
              },
              params.row.Name
            );
          }
        }
      ];
      this.getListThead.forEach(item => {
        let obj = [];
        if (item.IsChild) {
          let isEmpty = true;
          for (let i = 0, len = item.ChildColumns.length; i < len; i++) {
            if (item.ChildColumns[i].Visible) {
              isEmpty = false;
              break;
            }
          }
          if (!isEmpty) {
            obj = {
              title: item.DisplayName,
              key: item.Code,
              align: "center",
              sortable: item.Sortable,
              children: []
            };
            item.ChildColumns.forEach(child => {
              if (child.Visible) {
                obj.ChildColumns.push({
                  title: child.name,
                  key: child.id,
                  align: "center",
                  sortable: item.Sortable,
                  minWidth: 100
                });
              }
            });
            tableArrs.push(obj);
          }
        } else if (item.Visible) {
          obj = {
            title: item.DisplayName,
            key: item.Code,
            align: "center",
            sortable: item.Sortable,
            minWidth: 100
          };
          tableArrs.push(obj);
        }
      });
      return tableArrs;
    },
    // 表格数据
    tableDatas() {
      let tableArrs = [];
      this.getListTbody.forEach(item => {
        let obj = {};
        for (let key in item) {
          const arrs = key.split(".");
          if (arrs.length > 1) {
            obj[arrs[1]] = item[key];
          } else {
            obj[arrs[0]] = item[key];
          }
        }
        tableArrs.push(obj);
      });
      return tableArrs;
    }
  },
  created() {},
  methods: {
    openNew() {
      console.log(this.currentId);
      this.showModal = true;
    },
    changePageNum(num) {
      this.pageNum = num;
      this.$emit("refreshData", {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
    },
    changePageSize(size) {
      this.pageSize = size;
      this.$emit("refreshData", {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
    }
  }
};
</script>
<style lang="scss">
#listview {
  height: 100%;
  display: flex;
  flex-direction: column;
  .btn-list {
    margin-bottom: 10px;
  }
  .sidebar {
    &-item {
      a {
        display: block;
        transition: all 0.2s ease-out 0s;
        padding: 12px 15px;
        padding-left: 26px;
        margin: 0 1px 0 0;
        position: relative;
        border-left: 1px solid #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
          background-color: #d4edfe !important;
        }
        .ivu-icon {
          font-size: 24px;
          margin-right: 10px;
          color: #37abfd;
        }
        .text {
          font-size: 14px;
          vertical-align: text-bottom;
          color: #495060;
        }
      }
    }
    .active {
      a {
        border-top: 0;
        margin-right: 0;
        background-color: #f9fafb;
        color: #37abfd;
      }
    }
  }
  .listview-table {
    flex-grow: 1;
    .ivu-table-wrapper {
      border: none;
    }
    .ivu-table:after {
      display: none;
    }
    .ivu-table-body {
      .ivu-table-column-center {
        border: none;
      }
    }
    .ivu-table-border td,
    .ivu-table-border th {
      &:last-child {
        border-right: none;
      }
    }
  }
  .table-page {
    height: 45px;
    margin-bottom: 10px;
    margin-top: -1px;
    padding: 5px;
    background-color: #fff;
    position: relative;
    border: 0;
    border-top: 1px solid #e2e6e8;

    .page-index {
      position: absolute;
      right: 303px;
      width: 100px;
      padding-left: 45px;
      line-height: 28px;

      input {
        text-align: center;
        width: 40px;
        height: 31px;
        border-radius: 3px;
        background-color: #f1f3f5;
        border: solid 1px #f1f3f5;
        position: absolute;
        left: 0;
        color: #666666;
      }

      label {
        line-height: 31px;
        padding: 0;
        font-weight: normal;
        margin-left: 3px;
        color: #666666;
      }
    }

    .table-page_ButtonGroup {
      position: absolute;
      margin: 0 15px;
      width: 160px;
      right: 139px;

      .btn {
        height: 31px;
        margin-right: 10px;
      }

      button {
        opacity: 1;
        background-color: #f1f3f5;
      }

      button.disable {
        background-color: #f1f3f5;
      }
    }

    .page-size {
      margin-right: 15px;
      position: absolute;
      width: 60px;
      right: 70px;

      button {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 70px;
        height: 31px;
        background: #f1f3f5;
        border-radius: 3px;
      }
    }

    .page-total {
      position: absolute;
      width: auto;
      right: 20px;
      height: 28px;
      padding-top: 8px;
      text-align: center;
      white-space: nowrap;
      color: #333333;
    }
  }
}
.list-page {
  text-align: right;
  .ivu-page-item {
    display: none;
  }
  .ivu-page-item-jump-next {
    display: none;
  }
  .ivu-page-item-jump-prev {
    display: none;
  }
}
</style>
