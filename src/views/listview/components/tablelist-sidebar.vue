<template>
    <ul class="sidebar">
        <li class="sidebar-item">
            <a href="javascript:">
                <Icon type="ios-paper"></Icon>
                <span class="text">11111</span>
            </a>
        </li>
        <li class="sidebar-item active">
            <a href="javascript:">
                <Icon type="ios-paper"></Icon>
                <span class="text">11111</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a href="javascript:">
                <Icon type="ios-paper"></Icon>
                <span class="text">11111</span>
            </a>
        </li>
    </ul>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
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
</style>
