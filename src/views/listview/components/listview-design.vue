<template>
<div id="DesignerZone" class="designer-zone-container">
    <Row class="flex">
    <i-col span="5"  class="flex-right">
      <div  class="col-right Propertys">
        <Tabs mode="horizontal" active-name="1">
          <TabPane label="字段设置" name="name1">
            <div id="FieldSet" class="pro-item">
              <!-- @*过滤条件*@ -->
              <div id="QueryItemPanle" class="proItemPanle queryItemPanle">
                <div class="propertyTitle" v-on:click="showQueryContent=!showQueryContent">
                  <div class="titletxt">查询条件</div>
                  <div class="titleControl">
                    <Icon id="btnAddQuery" type="plus"></Icon>
                  </div>
                </div>
                <div class="propertyContent" v-show="showQueryContent">
                  <ul id="QueryItemsList" class="ColumnList ui-sortable"></ul>
                </div>
              </div>
              <!-- @*列表字段*@ -->
              <div id="ColumnPanle" class="proItemPanle columnPanle">
                    <div class="propertyTitle">
                        <div class="titletxt">列表字段</div>
                        <div class="titleControl">
                            <input type="checkbox" id="ListShowAll" :checked="allSelected">
                            <label for="ListShowAll" @click="selectAllClick(allSelected)">全选</label>
                        </div>
                    </div>
                    <div class="propertyContent">
                        <ul id="ColumnList" class="ColumnList ui-sortable">
                          <draggable v-model="dragData">
                            <div v-for="item in dragData">
                                <li class="ColumnItem" v-if="!item.isChildSchema" :data-id="item.id" style="">
                                    <div class="ColumnName" v-text="item.name"></div>
                                    <div class="ColumnGroup">
                                        <div class="ckbox ckbox-default">
                                            <input type="checkbox" :id="item.id" v-model="item.isVisible">
                                            <label :for="item.id"></label>
                                        </div>
                                    </div>
                                </li>
                                <div class="ColumnItem myheight ischild ui-sortable" v-if="item.isChildSchema" :data-id="item.id"
                                    data-total="Object.keys(item.children).length" data-selected="4">
                                    <li class="myColumnItemChildName myshow" :data-id="item.id">
                                        <div class="ColumnName" style="cursor: move;">子表
                                            <div class="pull-right">
                                                <input type="checkbox" :id="item.id" class="allcb" v-model="item.isVisible">
                                                <label :for="item.id" style="width:100px;" @click="selectChildrenAllClick(item.id, item.isVisible)">全选</label>
                                                <i class="fa  fa-angle-down pugll-right" style="cursor:pointer;"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <draggable v-model="item.children">
                                      <li class="myColumnItem F0000016 ChildColumnItem" v-for="child in item.children" :data-id="child.id" :data-parentId="item.parentId">
                                          <div class="ColumnName" v-text="child.name"></div>
                                          <div class="ColumnGroup">
                                              <div class="ckbox ckbox-default">
                                                  <input type="checkbox" :id="child.id" v-model="child.isVisible">
                                                  <label :for="child.id" @click="childSchemaClick(child.parentId)"></label>
                                              </div>
                                          </div>
                                      </li>
                                    </draggable>
                                </div>
                            </div>
                            </draggable>
                        </ul>
                    </div>
                </div>
            </div>
          </TabPane>
          <TabPane label="列表设置" name="name2">
            <div id="ListSet" class="pro-item">
              <!-- @*列表显示*@ -->
              <div id="DisplayModePanle">
                <div class="propertyTitle" style="display:none;">
                  <div class="titletxt">列表显示</div>
                  <div class="titleControl">
                    <i class="fa fa-angle-down"></i>
                  </div>
                </div>

                <div class="propertyContent" style="overflow:inherit;">
                  <ul class="ColumnList">
                    <!-- @*todo:子表业务逻辑*@ -->
                    <li style="display:none;">
                      <div class="input-group">
                        <span class="input-group-addon">默认维度</span>
                        <select id="selDefaultDisplayDimension" class="form-control"></select>
                      </div>
                    </li>
                    <li style="padding-bottom: 16px;">
                      <div class="input-group" style="width:100%">
                        <span class="input-group-addon titletxt listOptionalDisplayMode">可选显示模式</span>
                        <div class="form-control" style="border:0;height:30px;padding-top:0;">
                          <div style="width:33%;float:left;">
                            <input type="checkbox" name="optionalDisplayMode" checked value="0" id="optionalDisplayMode_list" onclick="return false">
                            <label for="optionalDisplayMode_list" style="padding:0px;width:70px;">列表</label>
                          </div>
                          <div style="width: 33%; float: left;">
                            <input type="checkbox" name="optionalDisplayMode" value="1" id="optionalDisplayMode_calendar">
                            <label for="optionalDisplayMode_calendar" style="padding:0px;width:70px;">日历</label>
                          </div>
                          <div style="width: 33%; float: left;">
                            <input type="checkbox" name="optionalDisplayMode" value="2" id="optionalDisplayMode_timeline">
                            <label for="optionalDisplayMode_timeline" style="padding:0px;width:70px;">时间轴</label>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style="border-top: 1px solid #E1E1E1; padding-top: 16px;">
                      <span class="input-group-addon titletxt listDisplayModeSelector">默认显示模式</span>
                      <div class="input-group" style="width: 100%;">
                        <div class="modeTab toggleMode-W-M">
                          <span class="active">Web端</span>
                          <span>移动端</span>
                        </div>
                        <div style="height:60px;padding-top: 16px;padding-bottom: 16px;">
                          <div class="rdio rdio-primary" style="width:33%;float:left;">
                            <input type="radio" name="displayMode" id="displayMode_list" value="0" checked="checked">
                            <label for="displayMode_list" style="padding:0px;">列表</label>
                          </div>
                          <div class="rdio rdio-primary" style="width: 33%; float: left;">
                            <input type="radio" name="displayMode" id="displayMode_calendar" value="1">
                            <label for="displayMode_calendar" style="padding:0px;">日历</label>
                          </div>
                          <div class="rdio rdio-primary" style="width: 33%; float: left;">
                            <input type="radio" name="displayMode" id="displayMode_timeline" value="2">
                            <label for="displayMode_timeline" style="padding:0px;">时间轴</label>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style="border-top: 1px solid #E1E1E1; padding-top: 16px;">
                      <span class="input-group  input-group-addon listDisplayModeTab">
                        <div class="modeTab">
                          <span :class="{active:showModePropertyIndex==0}" @click="showModePropertyIndex=0">列表</span>
                          <span :class="{active:showModePropertyIndex==1}" @click="showModePropertyIndex=1">日历</span>
                          <span :class="{active:showModePropertyIndex==2}" @click="showModePropertyIndex=2">时间轴</span>
                        </div>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="input-group" style="width: 100%;">
                <!--批量操作-->
                <div id="SelectableContainer" v-show="showModePropertyIndex==0||showModePropertyIndex==1" style="padding-bottom: 16px;">
                  <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left; position:relative;display:block;">批量操作
                    <i data-tip="设置员工是否允许批量操作或处理权限范围内的数据" class="icon-tooltip icon-tips"></i>
                  </span>
                  <div style="border:0;height:30px;">
                    <div class="rdio rdio-primary" style="width:50%;float:left;">
                      <input type="radio" name="SelectionMode" id="SelectionVisible" value="0" checked="checked">
                      <label for="SelectionVisible" style="padding:0px;">允许</label>
                    </div>
                    <div class="rdio rdio-primary" style="width: 50%; float: left;">
                      <input type="radio" name="SelectionMode" id="SelectionVisibleNo" value="1">
                      <label for="SelectionVisibleNo" style="padding:0px;">不允许</label>
                    </div>
                  </div>
                </div>
                <div id="listSetting" v-show="showModePropertyIndex==0">
                  <div>
                    <!--子表展示-->
                    <div id="DefaultDisplayChildCode" class="input-group mb15" style="width: 100%;">
                      <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left;display:block;position:relative;">默认显示子表
                        <i data-tip="选择的子表可在打开列表时直接进行展示" class="icon-tooltip icon-tips"></i>
                      </span>
                    </div>
                  </div>
                  <div>
                    <!--排序字段-->
                    <div id="SelectionSortBy" class="input-group mb15" style="width: 100%;">
                      <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left; display:block;">排序字段</span>
                    </div>
                  </div>
                  <div>
                    <!--排序方式-->
                    <div class="input-group" style="width: 100%;padding-top: 16px;padding-bottom: 16px;border-top: 1px solid #E1E1E1;">
                      <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left;display:block;">排序方式</span>
                      <div class="form-control" style="border:0;">
                        <div class="rdio rdio-primary" style="width:50%;float:left;">
                          <input type="radio" name="SelectionSortType" id="SelectionSortD" value="1">
                          <label for="SelectionSortD" style="padding:0px;">降序</label>
                        </div>
                        <div class="rdio rdio-primary" style="width: 50%; float: left;">
                          <input type="radio" name="SelectionSortType" id="SelectionSortU" value="0">
                          <label for="SelectionSortU" style="padding:0px;">升序</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <!--列表图片-->
                    <div id="SelectionIcon" class="input-group mb15" style="width: 100%;padding-bottom: 16px;">
                      <span class="input-group-addon" style="border:0; background-color:#fff;width:100px;text-align:left;position:relative; display:block;margin-bottom: 8px;">列表图片
                        <i data-tip="选择后，在移动端列表可以显示图片控件中的图片，多张的情况下只显示第一张" class="icon-tooltip icon-tips"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div id="calendarSetting" v-show="showModePropertyIndex==1">
                  <div style="padding-top: 16px;border-top: 1px solid #E1E1E1;">
                    <label class="column-title" style="position:relative;width:34%;">时间跨度从
                      <i data-tip="例如您预定了今天和明天的会议室，日历列表中可跨日期区间展示这一条数据" class="icon-tooltip icon-tips"></i>
                    </label>
                    <select id="SpanStart" style="display:none"></select>
                  </div>
                  <div>
                    <label class="column-title" style="width:34%;">至</label>
                    <select id="SpanEnd" style="display:none"></select>
                  </div>

                </div>
                <div id="timelineSetting" v-show="showModePropertyIndex==2">
                  <div style="padding-bottom: 16px;">
                    <!--时间轴字段-->
                    <div id="timelineAxis" class="input-group mb15">
                      <span class="input-group-addon titletxt">时间轴字段</span>
                    </div>
                  </div>
                  <div style="padding-top: 16px;border-top: 1px solid #E1E1E1;">
                    <!--排序方式-->
                    <div id="timelineSortType" class="input-group">
                      <span class="input-group-addon titletxt">排序方式</span>
                      <div class="form-control" style="border:0;">
                        <div class="rdio rdio-primary" style="width:50%;float:left;">
                          <input type="radio" name="TimelineSortType" id="sortDesc_timeline" value="1" checked="checked">
                          <label for="sortDesc_timeline" style="padding:0px;">降序</label>
                        </div>
                        <div class="rdio rdio-primary" style="width: 50%; float: left;">
                          <input type="radio" name="TimelineSortType" id="sortAsc_timeline" value="0">
                          <label for="sortAsc_timeline" style="padding:0px;">升序</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="ActionBtn" class="action-v">
                <div style="padding-top: 16px;border-top: 1px solid #E1E1E1;">
                  <span class="input-group-addon titletxt" style="margin-bottom:8px;">功能按钮</span>
                  <div class="form-control" style="width:98%;">
                    <a>设置功能按钮</a>
                  </div>
                </div>
              </div>
              <!-- @*列表操作*@ -->
              <div id="ActionPanle" style="display:none;height:100%">
                <div class="propertyContent">
                  <ul id="ActionList" class="ColumnList ui-sortable ActionList" style="min-height:310px;max-height:310px;overflow:auto;"></ul>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <div id="PropertysPopover" class="popover filterContent">
          <div class="popover-content propertyContent">

          </div>
        </div>
      </div>
    </i-col>
    <i-col span="5"  class="flex-left">
      <div id="left-box"  class="col-left">
        <div class="tab-content">
          <div class="item-title">查询条件</div>
          <div id="DesignerQueryItems" class="DesignerView">
          </div>
          <div>
            <div class="item-title item-title-list">列表字段</div>
            <div id="DesignerView" class="DesignerView">
              <i-table border :columns="tableColumns" width="100%"></i-table>
            </div>
            <div id="TablePageIndex" class="table-page">
              <div class="page-index">
                <input type="text" value="1" class="Page_Index" readonly> /
                <label class="Page_Count">1</label>
              </div>
              <div class="btn-group table-page_ButtonGroup" style="width: 160px;">
                <button class="btn Page_Num_Pre disable" disabled="disabled">上一页</button>
                <button class="btn Page_Num_Next disable" disabled="disabled">下一页</button>
              </div>
              <div class="page-size dropup">
                <button disabled="disabled" class="btn">
                  <span class="Page_Per_Size">10</span>
                  <i class="ivu-icon ivu-icon-chevron-down" style="font-size: 11px;"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a>10</a>
                  </li>
                </ul>
              </div>
              <div class="page-total">共1条</div>
            </div>
          </div>
        </div>
      </div>
    </i-col>
    </Row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components:{
    draggable
  },
  props: ["listData"],
  data() {
    return {
      listDataMap: this.listData, // 数据映射
      showQueryContent: true,
      showColumnContent: true,
      showModePropertyIndex: 0 //0 列表  1 日历  2 时间轴
    };
  },
  computed:{
    // 拖拽
    dragData:{
      get(){
        return this.listDataMap;
      },
      set(val){
        return this.listDataMap = val;
      }
    },
    // 全选
    allSelected(){
      let result = true;
      for(let i = 0,len = this.listDataMap.length;i<len;i++){
        if(!this.listDataMap[i].isVisible){
          result = false;
          break;
        }
      }
      return result;
    },
    // 表格表头
    tableColumns(){
      let tableArrs = [];
      this.listDataMap.forEach(item=>{
        let obj = [];
        if(item.isChildSchema){
          let isEmpty = true;
          for(let i = 0,len = item.children.length;i<len;i++){
            if(item.children[i].isVisible){
              isEmpty = false;
              break;              
            }
          }
          if(!isEmpty){
            obj = {
                title: item.name,
                key: item.id,
                align: 'center',
                children: []
            }
            item.children.forEach(child=>{
              if(child.isVisible){
                obj.children.push({
                    title: child.name,
                    key: child.id,
                    align: 'center'
                });
              }
            });
            tableArrs.push(obj);
          }
        }else if(item.isVisible){
          obj = {
              title: item.name,
              key: item.id,
              align: 'center'
          }
          tableArrs.push(obj);
        }
      });
      console.log(tableArrs);
      return tableArrs;
    }
  },
  created(){
      console.log(this.tableColumns);
  },
  methods: {
    togglePropertyContent() {},
    // 全选
    selectAllClick(isAllVisible){
      this.listDataMap.forEach((item,index)=>{
        item.isVisible = !isAllVisible;
        this.$set(this.listDataMap, index, item);
        if(item.isChildSchema){
          this.selectChildrenAllClick(item.id,isAllVisible);
        }
      });
    },
    // 子表全选
    selectChildrenAllClick(id,isAllVisible){
      this.listDataMap.forEach((item, index)=>{
        if(item.isChildSchema && item.id == id){
          item.children.forEach((child, childIndex)=>{
            item.children[childIndex].isVisible = !isAllVisible;
          });
          this.$set(this.listDataMap, index, item);
        }
      });
    },
    // 子表选项点击
    childSchemaClick(parentId){
      setTimeout(()=>{
        this.listDataMap.forEach((item, index)=>{
          if(item.isChildSchema && item.id == parentId){
            let result = true;
            for(let i=0,len=item.children.length;i<len;i++){
              if(!item.children[i].isVisible){
                result = false;
                break;
              }
            }
            item.isVisible = result;          
            this.$set(this.listDataMap, index, item);
          }
        });
      },0);
    }
  }
};
</script>

<style lang="scss">
hr {
  margin: 0;
}

.pull-right {
  float: right;
}

.clearfix {
  clear: both;
}

li.select-all-child {
  .filter {
    label {
      width: 100%;
    }
  }
}

.icon-tooltip {
  color: #2d7fff;
}

.sp_placeholder {
  line-height: 30px;
}

.designer-zone-container {
  height: 100%;

  .flex {
    background: #f2f2f6;

    .flex-left {
      background: #fff;
      margin-right: 302px;
      display: block;
      float: none;
      width:auto !important;
    }

    .flex-right {
      width: 300px;
      background: #fff;
      border-radius: 2px;
      float:right;
    }
  }

  .ivu-row, .ivu-col {
    height: 100%;
  }

  .col-left {
    height: 100%;
    box-shadow: 0 2px 4px 0 #E5EDFC;
    border-radius: 2px;
    overflow-y: auto;

    .tab-content {
      padding: 16px 16px 32px 16px;
      overflow: hidden;
      overflow-y: auto;
    }

    .empty-query-group {
    }

    .item-title {
      height: 30px;
      line-height: 30px;
      padding-left: 15px;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }

    .formlistTimeline {
      overflow: hidden;
    }

    .bootstrap-table{
      padding: 0 15px 0 0;
    }
  }

  .col-right {
    position: relative;
    height: 100%;
    padding-left: 0;
    font-size: 14px;
    overflow: hidden;

    .ivu-tabs {
      height: 100%;
    }

    .ivu-tabs-bar {
      margin-bottom: 15px;

      .ivu-tabs-nav-container {
        width: 260px;
        margin: 0 auto;

        .ivu-tabs-nav-scrollable {
          padding: 0;
        }

        .ivu-tabs-nav-prev, .ivu-tabs-nav-next {
          display: none;
        }

        .ivu-tabs-ink-bar {
          background-color: #2D7FFF;
          height: 3px;
        }

        .ivu-tabs-tab {
          width: 120px;
          text-align: center;
        }

        .ivu-tabs-tab-active {
          color: #2D7FFF;
        }
      }
    }

    .ivu-tabs-content {
      height: 100%;

      .ivu-tabs-tabpane {
        .pro-item {
          width: 97%;
          margin: 0 auto;

          .proItemPanle {
            .propertyTitle {
              cursor: pointer;
              overflow: hidden;
              height: 30px;
              line-height: 30px;
              color: #757575;

              .titletxt {
                float: left;
                margin-left: 5px;
                font-size: 14px;
                color: #383838;
              }

              .titleControl {
                float: right;

                i {
                  position: relative;
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  font-size: 14px;
                  color: #2D7FFF;
                }
              }
            }

            .propertyContent {
              clear: both;
              padding: 0;
              margin-bottom: 5px;

              .ColumnList {
                margin: 0px;
                padding: 0px;

                .ColumnItem {
                    padding-left: 10px;
                  padding-right: 0;
                  margin-bottom: 2px;
                  list-style: none;
                  min-height: 30px;
                  line-height: 30px;
                  border: brown;
                  background-color: #fff;
                  cursor: move;
                  clear: both;

                  .ColumnName {
                    float: left;
                    cursor: pointer;
                    padding-left: 2px;
                  }

                  .ColumnGroup {
                    float: right;
                  }
                }

                .ColumnItem.ischild {
                  li {
                    padding-left: 10px;
                    list-style: none;
                    height: 30px;
                    line-height: 30px;
                    background-color: #fff;
                    cursor: move;
                  }

                  .myColumnItemChildName {
                    padding-left: 0;

                    .ColumnName {
                      width: 100%;
                    }
                  }

                  .ChildColumnItem {
                    margin-left: 10px;
                  }
                }
              }
            }
          }

          .columnPanle {
            .propertyTitle {
              li {
                height: 30px;
                line-height: 30px;
              }

              .titleControl {
                label {
                  width: 100px;
                }

                label:before {
                  right: 0;
                  left: auto;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
    }
  }

  #DesignerView{
    .ivu-table{
      overflow-x: auto;
      table{
        table-layout: auto;
      }
    }
    .ivu-table-header{
      overflow: visible;      
    }
    .ivu-table-body{
      overflow: visible;
    }
    .ivu-table-cell{
      span{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  #DesignerQueryItems {
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #E1E1E1;
    border-radius: 2px;

    .form-group {
      float: left;
      width: 100%;
      height: 34px;
      line-height: 34px;
      margin: 4px 0;

      .form-control {
        position: relative;
        float: left;
        width: 100%;
        height: 32px;
        margin-bottom: 0;
        padding: 4px 18px;
        line-height: 1.42857143;
        font-size: 14px;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #e1e1e1;
        box-shadow: none;
      }

      .form-control:focus {
        box-shadow: none !important;
        border-color: #2d7fff !important;
      }

      .col-md-1.control-label {
        padding-right: 0;
        line-height: 30px;
        margin-bottom: 0;
        color: #757575;
        font-weight: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;  
      }
    }

    .input-group {
      position: relative;
      display: table;
      border-collapse: separate;

      .input-group-addon {
        border: 1px solid #e1e1e1;
        border-right: 0;
        background-color: #F9FAFB;
      }

      .form-control+.input-group-addon {
        border-left: 0;
      }

      .form-control {
        position: relative;
        z-index: 2;
        float: left;
        width: 100%;
        margin-bottom: 0;
      }
    }

    .form-query-addModel {
      padding-right: 8px;
    }
  }

  #QueryItemPanle {
    margin-bottom: 10px;

    .ColumnGroup {
      display: none;

      i {
        cursor: pointer;
        margin-right: 8px;
        font-size: 15px;
        position: relative;
        top: 3px;
      }

      .icon-shezhi:before {
        color: #2D7FFF;
      }

      .icon-shezhi:hover:before {
        color: #095BDC;
      }

      .icon-delete:before {
        color: #FF5E5E;
      }

      .icon-delete:hover:before {
        color: #dd1111;
      }
    }

    .ColumnItem.active .ColumnGroup, .ColumnItem:hover .ColumnGroup {
      display: block;
    }
  }

  #ColumnPanle {
    padding-top: 16px;
    border-top: 1px solid #e1e1e1;

    li label:before {
      left: auto;
      right: 0;
    }
  }

  #PropertysPopover {
    position: absolute;
    width: 256px;
    left: 20px;
    max-height: 250px;
    padding: 0;
    border: 0;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.175);
    border-radius: 3px;

    &:before {
      content: '';
      position: absolute;
      display: inline-block;
      top: -13px;
      right: 24px;
      width: 0;
      height: 0;
      border: 7px solid #561616;
      border-color: transparent transparent #fff;
    }

    &.down-popover:before {
      display: inline-block;
    }

    &.up-popover:before {
      display: none;
    }

    .propertyContent {
      clear: both;
      padding: 0;
    }

    li {
      margin: 0;

      .filter {
        height: 30px;
        line-height: 30px;
      }

      .dropdownlist-item a {
        padding: 0 16px;
      }

      label {
        width: 100%;
      }

      .input-right {
        input[type='checkbox'] + label {
          padding: 0 3px !important;
        }
      }
    }

    li[data-type=fillTop]~li {
      padding: 0 16px;
    }

    li[data-role='columnSelector'] {
      padding: 0;
    }

    li[data-childcode] {
      height: auto;
      padding: 0;

      .filter-children {
        li {
          padding-left: 20px;
        }
      }
    }

    .SheetAreaSelect {
      padding: 16px;
      padding-top: 0;
      margin: 0;

      .area-item {
        cursor: pointer;
      }

      li {
        padding: 0;
      }
    }

    .dropdown-footer {
      padding: 0 12px;
    }
  }

  #FieldSet {
    position: absolute;
    top: 0;
    left: 3%;
    bottom: 100px;
    padding-right: 10px;
    height: 100%;
    overflow-y: auto;
  }

  #ListSet {
    height: 100%;
    margin-left: 3%;
    padding-bottom: 100px;
    overflow-y: auto;

    #DisplayModePanle {
      padding-bottom: 6px;

      .listOptionalDisplayMode, .listDisplayModeSelector, .listDisplayModeTab {
        border: 0;
        background-color: #FFF;
        text-align: left;
        display: inline-block;
        width: 100%;
        border-radius: 0;
        height: 30px;
        line-height: 30px;
        padding: 0 0 8px 0;
        color: #333;
        font-size: 14px;
      }

      .modeTab {
        height: 30px;
        text-align: center;

        span {
          display: block;
          float: left;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          width: 49%;
          color: #2D7FFF;
          border: 1px solid #2D7FFF;
          text-align: center;
          cursor: pointer;
        }

        span:first-child {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        span:last-child {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }

        span.active {
          color: #fff;
          background-color: #2D7FFF;
        }

        .modeTab+div {
          margin-top: 16px;
          margin-bottom: 14px;
          padding: 0;
          border: none;
        }
      }

      .listDisplayModeTab {
        .modeTab {
          width: 100%;

          span {
            width: 30%;
            border: 0;
            color: #1A2C5B;
            background: #f0f0f0;
            border-radius: 3px;
          }

          span.active {
            color: #fff;
            background-color: #2d7fff;
            text-decoration: none;
          }

          span+span {
            margin-left: 4%;
          }
        }
      }

      input[type='checkbox']+label:before {
        left: 0;
      }
    }

    .action-v {
      text-align: center;
      line-height: 30px;
      width: 100%;
      margin: 0 auto;

      .input-group-addon {
        border: 0px;
        background-color: rgb(255, 255, 255);
        width: 100px;
        text-align: left;
        display: block;
      }

      .form-control {
        box-shadow: none;
      }

      a {
        color: #424242;
      }
    }

    .input-group-addon {
      padding-left: 0;
    }

    #SelectableContainer {
      padding-bottom: 16px;
    }

    #DefaultDisplayChildCode, #SelectionSortBy {
      padding-top: 16px;
      padding-bottom: 16px;
      border-top: 1px solid #e1e1e1;

      .input-group-addon {
        margin-bottom: 8px;
      }
    }
  }

  #timelineSetting {
    margin-bottom: 10px;

    #timelineAxis, #timelineSortType {
      margin-bottom: 8px;
      width: 100%;

      span {
        border: 0;
        background-color: #fff;
        width: 100px;
        text-align: left;
        display: block;
      }
    }
  }

  #calendarSetting {
    margin-bottom: 10px;
  }

  #FieldSet, #ListSet {
    .titletxt {
      font-weight: 600;
    }
  }

  #ColumnPanle, #QueryItemPanle {
    .propertyContent .ColumnItem.active, .propertyContent li.ColumnItem:hover, .propertyContent li.ChildColumnItem:hover {
      border-left: 4px solid rgba(30, 101, 255, 0.7);
      background-color: rgba(30, 101, 255, 0.05);

      .ColumnName {
        margin-left: -4px;
      }
    }
    .propertyContent li.myColumnItemChildName:hover{
      margin-left: -4px;
      border-left: 4px solid rgba(30, 101, 255, 0.7);
      background-color: rgba(30, 101, 255, 0.05);
    }
  }

  .column-title {
    position: relative;
    display: inline-block;
    top: -10px;
    width: 30%;
    margin-bottom: 0;
    font-weight: normal;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    white-space: nowrap;
    vertical-align: middle;

    .form-control {
      padding: 0;
      box-shadow: none;
    }
  }

  .dropdown-footer {
    height: 55px;

    .link {
      display: inline-block;
      float: left;
      width: 100px;
      height: 36px;
      line-height: 36px;
      margin: 4px;
      border: 1px solid #D6D4D4;
      border-radius: 3px;
      text-align: center;
    }

    .link+.link {
      float: right;
    }
  }

  .btn-ok, .btn-ok:hover {
    color: #fff;
    background-color: #2D7FFF;
  }

  .btn-cancel, .btn-cancel:hover {
    color: #666;
    background-color: #FFF;
  }

  a, a.active {
    transition: none;
    background-color: transparent;
  }
}

.lihide {
  display: none;
}

a, a:link, a:hover {
  text-decoration: none;
}

.fixed-table-body {
  overflow: hidden;
  overflow-x: auto;
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
input[type=checkbox]:checked+label:before {
    content: ""!important;
    border: 0;
    color: #fff!important;
    background-size: 16px 16px;
}
input[type=checkbox]:checked+label:before {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTA4NDEyMjU2NjQwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3MjAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTAgMTAxLjg4OEMwIDQ1LjY3MDQgNDUuOTc3NiAwIDEwMS44ODggMGg4MjAuMjI0Qzk3OC4zMjk2IDAgMTAyNCA0NS45Nzc2IDEwMjQgMTAxLjg4OHY4MjAuMjI0YzAgNTYuMjY4OC00NS45Nzc2IDEwMS44ODgtMTAxLjg4OCAxMDEuODg4SDEwMS44ODhDNDUuNjcwNCAxMDI0IDAgOTc4LjAyMjQgMCA5MjIuMTEyVjEwMS44ODh6IG00MzguNzg0IDUwOS40NEwyOTIuMTk4NCA0NjQuNjRhNTEuMiA1MS4yIDAgMSAwLTcyLjM5NjggNzIuMzk2OGwyMTguOTgyNCAyMTkuMDMzNiAzNjEuNDcyLTM2MS40NzJhNTEuMiA1MS4yIDAgMSAwLTcyLjM0NTYtNzIuNDQ4TDQzOC43ODQgNjExLjI3Njh6IiBmaWxsPSIjMkQ3RkZGIiBwLWlkPSIxNzIxIj48L3BhdGg+PC9zdmc+) no-repeat 50%;
}
input[type=checkbox], input[type=radio] {
    display: none;
}
input[type=checkbox]+label, input[type=radio]+label {
    width: 100px;
    position: relative;
    display: inline-block;
    float: left;
    width: auto;
    min-height: 30px;
    line-height: 30px;
    margin-right: 0;
    margin-bottom: 0;
    padding: 0 0 0 1.5em!important;
    text-align: left;
    font-weight: 400;
    cursor: pointer;
}
input[type=checkbox]+label:before {
    content: "";
    position: absolute;
    float: left;
    top: 50%;
    left: 0;
    width: 16px;
    height: 16px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-right: 0;
    background-color: #fafafa;
    border: 1px solid #e1e1e1;
    cursor: pointer;
}
</style>
