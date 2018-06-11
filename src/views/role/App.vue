<style scoped>
@import './role.css';
.ivu-poptip {
  position:absolute;
  right:48px;
  top:-13px
}
.ivu-icon-ios-arrow-down:before{
  margin-right : 0;
}

.Page_Turn button{
    padding: 3px 10px !important;
}
#app{
  margin-left: 0px
}
</style>

<template>
  <div id="appRole" scroll="no">
    <!-- 头部导航栏 -->
    <!-- <m-header :module-name="moduleName"></m-header> -->
    <!-- <m-header :backplatformMana="backplatformMana" :showHeaderNavFlag="showHeaderNavFlag"></m-header> -->
    <!-- 权限管理内容展示区 -->  
    <div class="OrgContainer" :style="'height:'+containerH+'px'">
      <Row>
        <!-- 左侧角色列表 -->
        <Col span="4" class="Org_Left_Container">
          <!-- 顶部新建复制角色，搜索框 -->
          <div class="top-button-container">
            <a class="creat-role role-button" @click.prevent="showCreatRoleMModal">新建角色</a>
            <!-- <a class="copy-role role-button" @click.prevent="showCopyRoleModal">复制角色</a> -->
            <div class="Org_Search" style="">
                <input type="text" v-model="searchRoleWord" class="Org_Search_Input" placeholder="搜索角色" />
                <button class="Org_Search_Button ivu-icon ivu-icon-search" @click="SearchRoles"></button>
            </div>
          </div>
          <!-- 角色树状图 -->
          <ul class="role-list" id="myTreeabc" ref="roleList" :style="'height:'+(containerH-52)+'px'">
            <li v-if="allRoleData.length==0">
              <span class="rolename">未搜索到相关角色</span>
            </li>
            <li v-else v-for="(item, index) in allRoleData" :key="item.id" :objectId="item.id" ref="role"
              class="list-group-item roleli" :class="{'white': clickIndex === index}" @mouseout="hideIcon" draggable="true"
              :id="item.id"
              @mouseover="showIcon(index)" @click.stop="getAppAndAuthority(item.id, index, item.name)">
                <span :class="{'show':currentIndex === index}" class="icon-drag-role hide unit_edit mymove"></span>
                <span class="rolename" :title="item.name">{{item.name}}</span>
                <Poptip placement="bottom" trigger="hover">
                  <span v-if="item.id !== AdminRoleId && item.id !== UserRoleId" :class="{'show':currentIndex === index}" class="icon-setting-role unit_remove hide"></span>
                  <div slot="content">
                    <p @click.stop.prevent="showRenameModal(item.ObjectId)" class="tipsBtn"><a>修改名称</a></p>
                    <p @click.stop.prevent="showDelRole(item.ObjectId)" class="tipsBtn"><a style="color:red;">删除</a></p>
                  </div>
                </Poptip>
            </li>   
          </ul> 
        </Col>
        <!-- 右侧角色权限设置，成员管理 -->
        <Col span="20" class="Org_Right_Container">
          <Tabs v-model="currentTab" @on-click="changeTab">
            <TabPane label="角色权限设置" name="roleSetting">
              <!-- 保存权限设置 -->
              <div class="role-save">
                <a class="btn btn-primary  Role_Head_Button" id="Role_SaveRole" data-toggle="dropdown" @click="SaveAllNode()">
                    <p class="operattion">保存</p>
                </a>
              </div>
              <!-- 角色权限设置 -->
              <div class="roleacls">
                <div class="roleacls-content">
                  <div class="roleacls-header">
                    <div class="roleacls-app">应用权限</div>
                    <ul class="roleacls-category">
                        <li class="checked-all" v-show="!noDataFlag">
                            <input v-if="RoleId===AdminRoleId" id="form-checkedall" type="checkbox" :disabled="true" :checked="true"/>
                            <input v-else id="form-checkedall" type="checkbox" 
                            :disabled="false" :checked="ifCheckAll" @click="formCheckAll($event)"/>
                            <label for="form-checkedall">全选</label>
                        </li>
                        <!-- <li class="roleacls-form">表单权限</li> -->
                        <li class="roleacls-list">列表权限</li>
                        <li class="roleacls-data">数据权限</li>
                    </ul>
                  </div>
                    <div class="app-content">
                      <!-- 应用列表 -->
                      <ul class="roleacls-acls" :style="'height:'+(containerH - 159)+'px'">
                        <li v-for="(acl, index) in aclsList" :class="{'active_div': appCurrentIndex === index}" 
                          @click="getFormListAcls(acl, index)" class="apppackage-node-li roletoggle" :data-code="acl.id"
                          :key="acl.id"
                        >
                          <a class="apppackage-node-a" :data-code="acl.id">
                            <b class="icon-get" v-if="acl.hasAcl"></b>
                            <b class="icon-none" v-if="!acl.hasAcl"></b>
                            <label :title="acl.Name">{{acl.moduleName}}</label>
                          </a>
                        </li>
                      </ul>
                      <!-- 应用表单列表 -->
                      <div class="app-formlist" :style="'height:'+(containerH - 159)+'px'">
                          <div class="not-data" v-show="noDataFlag">
                              <img src="../../images/meiyoushuju.png" width="152" height="180">
                              <p>选择应用 开始配置权限</p>
                          </div>
                          <ul class="formlist" v-show="!noDataFlag">
                            <!-- 需要配置权限的表单、报表 -->
                            <li class='sheet-node-li' v-for="(sheet, index) in formlistData" :key="sheet.id" 
                             :data-code="sheet.id" :type="sheet.Type">
                              <a class='sheet-node-a'>
                                <div class='roletogglesheet'>
                                  <i class='icon-arrow-down-role roletogglesheet hideli' @click="toggleAclDetail(sheet)"></i>
                                  <input v-if="RoleId===AdminRoleId" class='roletogglesheet' type='checkbox' data-checkall='checkall' 
                                   :disabled="true" :checked="true" :id="sheet.id + '_input'"
                                  />
                                  <input v-else class='roletogglesheet' type="checkbox" data-checkall='checkall' ref="formCheck"
                                   :disabled="false" :checked="sheet.hasAcl" :id="sheet.id + '_input'" @click="activeAclInput(sheet, $event, 'sheet')"
                                  />
                                  <label :for="sheet.id + '_input'" :title="sheet.Name">{{sheet.appName}}</label>
                                </div>
                              </a>
                              <ul class='appcontent-ul' :class="{'disable-all-input':sheet.hasAcl, 'hide': hideFlag}">
                                <!-- 表单权限 -->
                               <!--  <li class='sheet-node-childnode'>
                                  <div class='sheet-acl-action' v-if="sheet.Type != 210">
                                    <div class='sheet-checkall' v-if="sheet.authority.FormActions.length>0">
                                      <input v-if="RoleId===AdminRoleId" :id="sheet.Code + '_sheetcheckall'" type='checkbox' class='checkall' :disabled="true" :checked="true"/>
                                      <input v-else :id="sheet.Code + '_sheetcheckall'" type='checkbox' class='checkall' :checked="sheet.authority.FormActionsAllChecked"
                                      :disabled="sheet.hasAcl ? false : true" @click="checkAllAcl(sheet, 'form', $event)" :ref="sheet.Code + '_all'"/>
                                      <label :for="sheet.Code + '_sheetcheckall'">全选</label>
                                    </div>
                                    <div class="roleactioncontainer" v-if="sheet.authority.FormActions.length>0" v-for="item in sheet.authority.FormActions" :key="item.Code">
                                      <input v-if="RoleId===AdminRoleId" :id="sheet.Code + '_' + item.Code + '_form'" type="checkbox" :data-code="item.Code" :data-name="item.Name" :checked="true" :disabled="true">
                                      <input  v-else :id="sheet.Code + '_' + item.Code + '_form'" type="checkbox" :data-code="item.Code" :data-fixcode="item.Code+form_postfix"
                                       :data-name="item.Name" :checked="item.hasAcl"  @click="activeAclInput(sheet, $event, 'form')" :disabled="sheet.hasAcl ? false : true" :ref="sheet.Code + '_form'">
                                      <label :for="sheet.Code + '_' + item.Code + '_form'">{{item.Name}}</label>
                                    </div>
                                  </div>
                                </li> -->
                                
                                <!-- 列表权限 -->
                                <li class='listview-node-childnode' >
                                  <div class='listview-acl-action'>
                                    <div class='listview-checkall' v-if="sheet.authority.ListViewActions.length>0">
                                      <input v-if="RoleId===AdminRoleId" :id="sheet.id + '_listcheckall'" type='checkbox' class='checkall' :disabled="true" :checked="true"/>
                                      <input v-else :id="sheet.id + '_listcheckall'" type='checkbox' class='checkall' :checked="sheet.authority.ListActionsAllChecked"
                                  :disabled="sheet.hasAcl ? false : true" @click="checkAllAcl(sheet, 'list', $event)" :ref="sheet.id + '_all'"/>
                                      <label :for="sheet.id + '_listcheckall'">全选</label>
                                    </div>
                                    <div class="roleactioncontainer" v-for="item in sheet.authority.ListViewActions" :key="item.code">
                                      <input v-if="RoleId===AdminRoleId" :id="sheet.id + '_' + item.code + '_list'"  type="checkbox" :data-code="item.code" :data-name="item.name" :checked="true" :disabled="true">
                                      <input v-else :id="sheet.id + '_' + item.code + '_list'" type="checkbox" :data-code="item.code" :data-fixcode="item.code+list_postfix"
                                      :data-name="item.name" :checked="item.hasAcl"  @click="activeAclInput(sheet, $event, 'list')" :disabled="sheet.hasAcl ? false : true" :ref="sheet.id + '_list'">
                                      <label :for="sheet.id + '_' + item.code + '_list'" :title="item.name">{{item.name}}</label>
                                    </div>
                                  </div>
                                </li>
                                <!-- 数据权限 -->
                                <li class='scopetypes-node-childnode'>
                                   <!-- 系统管理员，统一选中全部 -->
                                  <div v-if="RoleId===AdminRoleId" class='scopetypes-acl-action'>
                                    <div  class='rdio rdio- primary'>
                                      <input :id="sheet.id + '___owneracl'" type='radio' value='0' :name="sheet.Code + '_scopetypename'" :disabled="true" :checked="false"/>
                                      <label :for="sheet.id + '___owneracl'">本人</label>
                                    </div>
                                    <div  class='rdio rdio- primary'>
                                      <input :id="sheet.id + '___organizationacl'" type='radio' value='1' :name="sheet.id + '_scopetypename'" :disabled="true" :checked="false" />
                                      <label :for="sheet.id + '___organizationacl'">服务部门</label>
                                    </div>
                                    <div class='rdio rdio- primary' style="margin-bottom: 5px;">
                                      <input :id="sheet.id + '___allacl'" type='radio' value='2' :name="sheet.id + '_scopetypename'" :disabled="true" :checked="true"/>
                                      <label :for="sheet.id + '___allacl'">全部</label>
                                    </div>
                                  </div>
                                    <!-- 非系统管理员，按照返回数据状态进行选中 -->
                                  <div v-else class='scopetypes-acl-action'>
                                    <div class='rdio rdio- primary'>
                                      <input v-if="sheet.hasAcl" :id="sheet.id + '___owneracl'" type='radio' @click="activeAclInput(sheet, $event, 'radio')" :ref="sheet.id + '_radio'"  value='0' :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="true"/>
                                      <input v-else :id="sheet.id + '___owneracl'" type='radio' @click="activeAclInput(sheet, $event, 'radio')" :ref="sheet.id + '_radio'"  value='0' :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="sheet.authority.scopeType==0 ? true : false"/>
                                      <label :for="sheet.id + '___owneracl'">本人</label>
                                    </div>
                                    <div  class='rdio rdio- primary'>
                                      <input :id="sheet.id + '___organizationacl'" @click="activeAclInput(sheet, $event, 'radio')" type='radio' :ref="sheet.id + '_radio'" value='1' :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="sheet.authority.scopeType==1 ? true : false" />
                                      <label :for="sheet.id + '___organizationacl'">服务部门</label>
                                    </div>
                                    <div class='rdio rdio- primary' style="margin-bottom: 5px;">
                                      <input :id="sheet.id + '___allacl'" type='radio' @click="activeAclInput(sheet, $event, 'radio')" value='2' :ref="sheet.id + '_radio'" :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="sheet.authority.scopeType==2 ? true : false"/>
                                      <label :for="sheet.id + '___allacl'">全部</label>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                      </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane label="角色成员管理" name="roleMemberManage" v-if=" RoleId !== UserRoleId">
              <!-- 角色成员管理 -->
              <div class="users-button">
                  <a class="btn Role_Head_Button Role_Add_Users" id="Role_Add_Users" @click="ModeAddRoleUsersShow">
                     <p class="operattion">添加成员</p>
                  </a>
                  <a class="btn Role_Head_Button Role_Remove_Users" id="Role_Remove_Users" @click="RemoveSingleRole('', '批量删除成员')" :disabled="romoveAllFlag">
                      <p class="operattion">批量移除成员</p>
                  </a>
              </div>
              <div class="roleusers" :style="'height:'+(containerH - 180)+'px'">
                <Row class="roleuserstitle">
                  <Col span="1">
                    <input class="mycheckboxinput" id="checkAllFalg" type="checkbox" ref="checkAllFalg" @click="CheckAll($event);">
                    <label for="checkAllFalg" class="mycheckboxlabel" style="padding: 0;"></label>
                  </Col>
                  <div v-if="RoleId !== AdminRoleId">
                    <Col span="4">
                      <p style="padding-left: 68px;float: left;line-height: 28px;">姓名</p>
                      <div class="searchroleusernew">
                        <i class="icon-search qwertjdsqasdf" @click="showSearchInput = true"></i>
                        <div v-show="showSearchInput">
                          <input type="text" id="mysearchroleuser" class="qwertjdsqasdf" v-model="searchRoleUserWord">
                          <i class="icon-search searchroleuseri" @click="searchRoleUser" ></i>
                        </div>
                      </div>
                    </Col>
                    <Col span="4">手机号</Col>
                    <Col span="4">邮箱</Col>
                    <Col span="4">所属部门</Col>
                    <Col span="7" v-if=" RoleId !== AdminRoleId">操作</Col>
                  </div>
                  <div v-else>
                    <Col span="5">
                      <p style="padding-left: 68px;float: left;line-height: 28px;">姓名</p>
                      <div class="searchroleusernew">
                        <i class="icon-search qwertjdsqasdf" @click="showSearchInput = true"></i>
                        <div v-show="showSearchInput">
                          <input type="text" id="mysearchroleuser" class="qwertjdsqasdf" v-model="searchRoleUserWord">
                          <i class="icon-search searchroleuseri" @click="searchRoleUser" ></i>
                        </div>
                      </div>
                    </Col>
                    <Col span="6">手机号</Col>
                    <Col span="6">所属部门</Col>
                  </div>
                </Row>
                <div v-if="hasRoleuser">
                  <Row class="roleusersdetail" v-for="roleuser in roleusersList" :key="roleuser.id">
                      <Col span="1">
                        <input class="mycheckboxinput" :id="roleuser.ObjectId +'_checkbox'" 
                        :objectid="roleuser.id" type="checkbox" :parentid="roleuser.ParentId"
                        @click="checkOn($event);" ref="roleuser">
                        <label :for="roleuser.ObjectId +'_checkbox'" class="mycheckboxlabel"></label>
                      </Col>
                      <div v-if="RoleId !== AdminRoleId">
                        <Col span="4" v-if="roleuser.userName">{{roleuser.userName}}</Col>
                        <Col span="4" v-if="!roleuser.userName">--</Col>
                        <Col span="4" v-if="roleuser.phone">{{roleuser.phone}}</Col>
                        <Col span="4" v-if="!roleuser.phone">--</Col>
                        <Col span="4" v-if="roleuser.phone">{{roleuser.email}}</Col>
                        <Col span="4" v-if="!roleuser.phone">--</Col>
                        <Col span="4" v-if="roleuser.ParentName">{{roleuser.ParentName}}</Col>
                        <Col span="4" v-if="!roleuser.ParentName">--</Col>
                    <!--     <Col span="4" v-if="roleuser.ServiceUnitNames">
                          <span v-for="(departName,index) in roleuser.ServiceUnitNames" :key="index">{{departName}}</span>
                        </Col>
                        <Col span="4" v-if="!roleuser.ServiceUnitNames">所属部门</Col> -->
                        <Col span="7">
                          <div class="editbutton">
                            <a class="user_bemanager" @click="ShowSetPost(roleuser.ObjectId);">设置服务部门</a>
                            <span @click="RemoveSingleRole(roleuser.ObjectId, '删除用户')" class="icon icon-remove-block" style="color:red; cursor:pointer;"></span>
                          </div>
                        </Col>
                      </div>
                      <div v-else>
                        <Col span="5" v-if="roleuser.userName">{{roleuser.userName}}</Col>
                        <Col span="5" v-if="!roleuser.userName">--</Col>
                        <Col span="6" v-if="roleuser.phone">{{roleuser.phone}}</Col>
                        <Col span="6" v-if="!roleuser.phone">--</Col>
                        <Col span="6" v-if="roleuser.ParentName">{{roleuser.ParentName}}</Col>
                        <Col span="6" v-if="!roleuser.ParentName">--</Col>
                        <Col span="6" v-if="roleuser.ServiceUnitNames">
                          <span v-for="(departName,index) in roleuser.ServiceUnitNames" :key="index">{{departName}}</span>
                        </Col>
                        <Col span="6" v-if="!roleuser.ServiceUnitNames">所属部门</Col>
                      </div>
                  </Row>
                </div>
                <div v-else>
                  <Row class="noroleuser-box">
                    <Col span="24">暂无用户</Col>
                  </Row>    
                </div>
              </div>
                 <!-- 分页开始 -->
              <!-- <div class="Page_Turn" v-show="showPagenation || onePageTotal<iTotalDisplayRecords"> -->
              <div class="Page_Turn" v-show="showPagenation">
                    <div style="float:right;" class="Page_Total"><span>共{{iTotalDisplayRecords}}条</span></div>
                    <div class="Page_Size dropup" style="float:right">
                        <button class="dropdown-toggle" @click="setShowMenuFlag">
                            <span>{{onePageTotal}}</span>
                            <Icon type="ios-arrow-down"></Icon>
                            <!-- <i class="fa icon-xiala"></i> -->
                        </button>
                        <ul class="dropdowm-menu" v-show="toggleShowMenu">
                            <li v-for="(item,index) in eachPageNum" :key="index" @click="getNewUserData"><a>{{item}}</a></li>
                        </ul>
                    </div>
                    <div class="btn-group Page_Turn_ButtonGroup" style="width: 100px;">
                        <button class="btn fa " id="Page_Num_Pre" @click="pageToPrevious" style="background-color:#fff; cursor:pointer;"><Icon type="ios-arrow-back"></Icon></button>
                        <button class="btn fa" id="Page_Num_Next" @click="pageToNext"><Icon type="ios-arrow-forward"></Icon></button>
                    </div>
                    <div class="Page_Num" style="float:right">
                        <input type="text" :value="currentPage" id="mypagenuminput" /><label id="mypagenumlabel">/{{totalPage}}</label>
                    </div>
                </div>
                <!-- 分页结束 -->
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>

    <!-- 新建角色弹窗 -->
    <creatRole :showCreatRoleFlag="showCreatRoleFlag" :SortKey.sync="allRoleData.length" @getAllRoles="refreshRoles"
     @creatRoleShowFlag="resetCreatRoleModel"></creatRole>
     <!-- 复制角色弹窗 -->
     <copyRole :showCopyRoleFlag="showCopyRoleFlag" :allRoleData="allRoleData" :SortKey.sync="allRoleData.length"
     @copyRoleShowFlag="resetCopyRoleModel" :RoleId="RoleId" :selectedRole="selectedRole" :AdminRoleId="AdminRoleId" @getAllRoles="refreshRoles"></copyRole>
    <!-- 修改角色名称 -->
    <renameRole :showRenameRoleFlag="showRenameRoleFlag" :RoleId="RoleId" @getAllRoles="refreshRoles"
     @renameRoleShowFlag="resetrenameRoleModel"></renameRole>
    <!-- 删除角色 -->
    <delRole :showDelRoleFlag="showDelRoleFlag" :RoleId="RoleId" @delRoleShowFlag="resetdelRoleModel"
     @getAllRoles="refreshRoles"></delRole>
    <!-- 设置服务部门 -->
<!--     <setServiceDepartment :showServiceRoleFlag="showServiceRoleFlag" :UserId="UserId" :RoleId="RoleId"
    @serviceRoleShowFlag="resetserviceModel" @updateServiceDepart="resertServiceDepart"
    :UnitTypeOrganizationUnit="UnitTypeOrganizationUnit"></setServiceDepartment> -->
    <!-- 删除角色成员/批量移除角色成员 -->
    <delUserRole :showDelUserRoleFlag="showDelUserRoleFlag" :RoleId="RoleId" :UserId="UserId" :delTitle="delTitle"
      @delUserRoleShowFlag="resetdelRoleUserModel" @getUserRoles="resertServiceDepart" :removeAllUserIds="removeAllUserIds"></delUserRole>
    <!-- 添加角色成员 -->
    <addRoleUser :showAddUserRoleFlag="showAddUserRoleFlag" :RoleId="RoleId" :selectedRole="selectedRole"
     @addRoleUserShowFlag="resetaddRoleUserModel" @getUserRoles="resertServiceDepart" :UnitTypeUser="UnitTypeUser" :roleusersList="roleusersList"></addRoleUser>
    <!-- 加载中gif图 -->
    <div v-show="showLoading" class="loading-container">
      <loading></loading>
    </div>
    <!-- 是否保存 -->
    <saveAcl :showSaveAclFlag="showSaveAclFlag" @closeSaveAclModal="showSaveAclFlag=false;"
     @confirmSaveAcl="ifSaveAcl"></saveAcl>
  </div>
</template>

<script >
// import './role.css';
// import MHeader from './m-header'; //引入头部组件
import creatRole from './creatRole'; //引入新建角色弹窗
import copyRole from './copyRole'; //引入复制角色弹窗
import renameRole from './renameRole'; //引入修改角色弹窗
import delRole from './delRole'; //引入删除角色弹窗
import delUserRole from './delUserRole'; //引入删除角色成员弹窗
import addRoleUser from './addRoleUser'; //引入添加角色成员弹窗
import loading from './loading'; //引入加载中蒙层
import saveAcl from './saveAcl'; //引入权限未保存，是否保存弹窗
// import setServiceDepartment from './setServiceDepartment'; //引入设置服务部门弹窗
import {
  GetInitData,
  GetAllRoles,
  GetAppPagesAndAcl,
  GetRoleUsers,
  GetAppPackageChildrenAcl,
  GetNodeSheetAndListViewActions,
  SaveAclNode,
  SearchRoleUsers,
  UpdateSortRoles
} from '../../api/role.js'; // 引入数据拉取接口
import AppReq from '../../api/app-apply.js';
import 'iview/dist/styles/iview.css'; // 引入iview样式表
// import './FormUser.js';
// import './FormMultiUser.js';

export default {
  data() {
    return {
      moduleName: 'authorization',
      containerH: 0,
      showCreatRoleFlag: false, // 控制新建角色显示/隐藏标识符
      showCopyRoleFlag: false, // 控制复制角色显示/隐藏标识符
      showRenameRoleFlag: false, // 控制修改角色显示/隐藏标识符
      showDelRoleFlag: false, // 控制删除角色显示/隐藏标识符
      showServiceRoleFlag: false, // 控制设置角色部门显示/隐藏标识符
      showDelUserRoleFlag: false, // 控制删除角色成员显示/隐藏标识符
      showAddUserRoleFlag: false, // 控制添加角色成员显示/隐藏标识符
      showSaveAclFlag: false,
      showLoading: false,
      isSearchRole: false,
      delTitle: '', // 删除角色用户、批量移除
      allRoleData: [], // 所有角色数据
      currentIndex: 0, // hover 角色的索引
      clickIndex: 0, //点击角色的索引
      selectedRole: '', // 角色树上选中的角色
      AdminRoleId: '', // 权限管理员角色ID
      UserRoleId: '', // 用户角色ID
      RoleId: '', //角色ID
      AppCode: '', // 应用AppCode
      searchRoleWord: '', // 搜索角色关键字
      roleusersList: [], // 用户角色数据
      hasRoleuser: false,
      UserId: '', //角色用户ID值
      UnitTypeOrganizationUnit: '',
      UnitTypeUser: '',
      romoveAllFlag: true, // 批量移出按钮状态
      SelecteddragNumber: 0, // 选中角色用户的条数
      // 分页
      showUserInfo: true,
      iTotalDisplayRecords: 0, //用户信息总条数
      BeginNum: 0, // 从第几条数据开始
      totalPage: 0, // 总页数
      currentPage: 1, //当前是第几页
      onePageTotal: 8, //一页显示的数据条数
      toggleShowMenu: false, //默认关闭每页显示数据条数
      eachPageNum: [8, 20, 50, 100], // 更改每页显示数据条数
      showPagenation: true, // 分页是否显示的标识
      aclsList: [], // app应用数据
      noDataFlag: true,
      noAclDataFlag: true,
      formlistData: [], // 表单权限数据
      appCurrentIndex: -1, // 当前选中的app索引
      removeAllUserIds: '', // 批量移除角色成员时
      currentTab: 'roleSetting', // 当前选中的tab面板
      saveLiCode: [], // 保存勾选的角色权限
      temporarySaveSheetAcl: [], // 暂存激活的表单，列表input框
      changAcl: false,
      saveInputNodes: {},
      DataAclScopeType: {
        None: -1,
        Own: 0,
        OwnDept: 1,
        All: 2
      },
      RoleAclNode: function (config) {
          this.ListViewActions = config.ListViewActions == void 0 ? null : config.ListViewActions;
          this.FormActions = config.FormActions == void 0 ? null : config.FormActions;
          this.FormActionsAllChecked = config.FormActionsAllChecked == void 0 ? false : config.FormActionsAllChecked;
          this.ListActionsAllChecked = config.ListActionsAllChecked == void 0 ? false : config.ListActionsAllChecked;
          this.scopeType = -1
          if (!(config.scopeType == void 0)) {
            this.scopeType = config.scopeType;
          }
      },
      RoleChildNode: function (config) {
          this.Code = config.Code == void 0 ? '' : config.Code;
          this.Name = config.Name == void 0 ? '' : config.Name;
          this.hasAcl = config.hasAcl == void 0 ? false : config.hasAcl;
      },
      OwnerAclName: '__owneracl',
      OrgAclName: '__organizationacl',
      AllAclName: '__allacl',
      ScopeTypeName: 'scopetypename',
      showSearchInput: false,
      searchRoleUserWord: '',
      RoleSheetli: {}, // 表单缓存（第二层）
      RoleActionsAndScopType: {}, //表单、列表权限缓存（第3层）
      list_postfix: 'List',
      form_postfix: 'Form',
      ifCheckAll: false,
      hideAclDetailFlag: false,
      currentSheetCode: -1,
      nextAppCode: '',
      hideFlag: false
    };
  },
  watch: {
  },
  mounted: function() {
    //初次渲染页面时，获取文档可视区域高度
    let _self = this;
    this._setInfoContainerH();
    this._GetInitData(); //渲染页面时初始化权限管理数据
    this._GetAllRoles('');
    window.onresize = function temp() {
      _self._setInfoContainerH();
    };

    // 搜索时，按enter键可以进行搜索
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        _self.isSearchRole = true;
        _self.SearchRoles();
        _self.searchRoleUser();
      }
    };  

    // 点击空白页时，关闭搜索框
    document.onclick = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e.target.className == 'Org_Right_Container ivu-col ivu-col-span-20' ||
          e.target.className == 'roleusersdetail ivu-row' || e.target.className == 'ivu-tabs'
          || e.target.className == 'ivu-tabs-tabpane' || e.target.className == 'ivu-col ivu-col-span-6' ||
          e.target.className == 'ivu-col ivu-col-span-5' || e.target.className == 'ivu-col ivu-col-span-4' ||
          e.target.className == 'ivu-col ivu-col-span-7' || e.target.className == 'roleusers') {
        _self.showSearchInput = false;
        _self.searchRoleUserWord = '';
      }
    };  
  },
  methods: {
    //初次渲染页面时，获取文档可视区域高度
    _setInfoContainerH() {
      let docmentH =
        document.documentElement.clientHeight || document.body.clientHeight;
      let OrgInfoH = docmentH - 10;
      this.containerH = OrgInfoH;
    },
    // 权限管理初始化数据
    _GetInitData() {
      // let res = await GetInitData();
      // if (res.Successful) {
      //   //获取数据成功
      //   this.AdminRoleId = res.ReturnData.AdminRoleId;
      //   this.UserRoleId = res.ReturnData.UserRoleId;
      //   this.UnitTypeOrganizationUnit = res.ReturnData.AdminRoleId;
      //   this.UnitTypeUser = res.ReturnData.UnitTypeUser;
      // } else {
      //   // 获取数据失败
      // }
      this.AdminRoleId = '0';
      this.UserRoleId = '8ec646d8cb104d879bd2e94514553426';
    },
    // 拖拽角色用户排序
    async _UpdateSortRoles(SortRoles) {
      let res = await UpdateSortRoles('UpdateSortRoles', SortRoles);
    },
    // 获取所有角色
    async _GetAllRoles(KeyWord, loadingFlag) {
      let res = await GetAllRoles(KeyWord);
      if (res.code === '0') {
        //获取数据成功
        if (res.page.result.length !== 0){
          this.allRoleData = res.page.result;
        } else {
          this.allRoleData = [];
        };
        if (!this.RoleId) { this.RoleId = this.allRoleData[0].id; }
        if (!this.selectedRole) { this.selectedRole = this.allRoleData[0].name; }
        if (this.RoleId != this.AdminRoleId && !this.isSearchRole && !loadingFlag && this.RoleId != this.UserRoleId) {
          //this.showLoading = true;
        }
        // 默认展示第一个角色的数据
        this.getAppAndAuthority(this.RoleId, this.clickIndex, this.selectedRole);
        this._GetAppPagesAndAcl(this.RoleId);
        // let _self=this;
        // new Sortable($('#myTreeabc')[0], {
        //     group: 'myTreeabc',
        //     onUpdate: function (evt) {
        //         //排序
        //         var json = {}
        //         var rolesLi = $('#myTreeabc').find('.roleli');
        //         for (var r = 0; r < rolesLi.length; r++) {
        //             json[rolesLi[r].id] = r + 1;
        //         }
        //         _self._UpdateSortRoles(json);
        //     }
        // })
        this.isSearchRole = false;
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    // 获取角色下应用数据
    async _GetAppPagesAndAcl(RoleId) {
      let res = await AppReq.getAllModule();
      if (res.code === '0') {
        //获取数据成功
        this.aclsList = res.page.result;
        console.log(this.aclsList);
        let count = 0;
        //如果有操作过的权限，展开自动选中第一个被操作过的应用
        for (var i = 0; i < this.aclsList.length; i++) {
            if (this.aclsList[i].hasAcl == true) {
                count++;
                this.appCurrentIndex = i;
                this.AppCode = this.aclsList[i].id;
                this._GetAppPackageChildrenAcl(this.aclsList[i].id);
                break;
            }
        }
        this.noDataFlag = false;
        if (count>0) {
        } else {
          this.appCurrentIndex = -1;
          this._GetAppPackageChildrenAcl(this.aclsList[0].id);
          this.AppCode = this.aclsList[0].id;
        }

        let countApp = 0;
        this.aclsList.forEach((sheet) => {
          if (sheet.hasAcl) {
            countApp++;
          }
        });
        if (countApp == this.aclsList.length) {
          this.ifCheckAll = true;
        }
      } else {
        // 获取数据失败
        // this.$Message.error(res.ErrorMessage);
      }
    },
    // 获取应用app下需要设置权限的表单/列表
    async _GetAppPackageChildrenAcl(AppId) {
      if (this.RoleSheetli[this.RoleId] && this.RoleSheetli[this.RoleId][AppId]) {
        this.formlistData = this.RoleSheetli[this.RoleId][AppId]
      } else {
        // this.showLoading = true;
        let res = await GetAppPackageChildrenAcl(this.RoleId, AppId);
        if (res.code === '0') {
          //获取数据成功
          this.formlistData = res.result;
          if (!this.RoleSheetli[this.RoleId]) {
              this.RoleSheetli[this.RoleId] = {};
          }
          this.RoleSheetli[this.RoleId][AppId] = res.result;
        } else {
           // 获取数据失败
          $.IShowError(res.ErrorMessage);
        }

        let count = 0;
        this.formlistData.forEach((sheet) => {
          if (sheet.hasAcl) {
            count++;
          }
        });
        if (count == this.formlistData.length) {
          this.ifCheckAll = true;
        }
      }
        //获取数据成功
        // this.formlistData = res.ReturnData.ChildrenAcl
        let formListLenght = this.formlistData.length;
        if (formListLenght) {
          this.noDataFlag = false;
        } else {
          this.noDataFlag = true;
        }
        // 获取表单列表的权限数据
        let _self = this;
        _self.saveLiCode = [];
        this.formlistData.some(function(sheet) {
          sheet.authority={ FormActions: [], ListViewActions: [], scopeType: -1, FormActionsAllChecked: false, ListActionsAllChecked: false };
          _self.$set(sheet, sheet.authority, sheet.authority);
           _self._GetNodeSheetAndListViewActions(sheet.id, sheet.actionList, sheet.scopeType);
           //saveLiCode 中不存在this的data-code属性才添加
           if (sheet.hasAcl){
             if (_self.saveLiCode.indexOf(sheet.id) == -1) {
                _self.saveLiCode.push(sheet.id);
              }
           }
          return null;
        });
        this.showLoading = false;
        console.log(this.formlistData);
    },
    // 获取表单列表的权限数据
    async _GetNodeSheetAndListViewActions(Code, actionList, scopeType) {
      // 如果之前有缓存过数据，不发请求
      if (this.RoleActionsAndScopType[this.RoleId] && this.RoleActionsAndScopType[this.RoleId][Code]) {
        let _self = this;
        this.formlistData.some(function(sheet) {
          if (sheet.id == Code) {
            let RoleActionsAndScopType = _self.RoleActionsAndScopType[_self.RoleId][sheet.Code];
            // sheet.authority.FormActions = RoleActionsAndScopType.FormActions;
            sheet.authority.ListViewActions = actionList;
            sheet.authority.scopeType = scopeType;
            // sheet.authority.FormActionsAllChecked = RoleActionsAndScopType.FormActionsAllChecked;
            // sheet.authority.ListActionsAllChecked = this.ifActionCheckAll(actionList);
            // _self.$set(sheet.authority, 'sheet.authority.FormActions', sheet.authority.FormActions);
            // _self.$set(sheet.authority, 'sheet.authority.ListViewActions', sheet.authority.ListViewActions);
            // _self.$set(sheet.authority, 'sheet.authority.scopeType', sheet.authority.scopeType);
            // _self.$set(sheet.authority, 'sheet.authority.FormActionsAllChecked', sheet.authority.FormActionsAllChecked);
            // _self.$set(sheet.authority, 'sheet.authority.ListActionsAllChecked', sheet.authority.ListActionsAllChecked);
            return false;
          }
        });
      } else {
          let _self = this;
          this.formlistData.some(function(sheet) {
            if (sheet.id == Code) {
              // sheet.authority.FormActions = RoleActionsAndScopType.FormActions;
              sheet.authority.ListViewActions = actionList;
              sheet.authority.scopeType = scopeType;
              // sheet.authority.FormActionsAllChecked = RoleActionsAndScopType.FormActionsAllChecked;
              // sheet.authority.ListActionsAllChecked = this.ifActionCheckAll(actionList);
              // _self.$set(sheet.authority, 'sheet.authority.FormActions', sheet.authority.FormActions);
              // _self.$set(sheet.authority, 'sheet.authority.ListViewActions', sheet.authority.ListViewActions);
              // _self.$set(sheet.authority, 'sheet.authority.scopeType', sheet.authority.scopeType);
              // _self.$set(sheet.authority, 'sheet.authority.FormActionsAllChecked', sheet.authority.FormActionsAllChecked);
              // _self.$set(sheet.authority, 'sheet.authority.ListActionsAllChecked', sheet.authority.ListActionsAllChecked);

              // 权限缓存设置
              if (!_self.RoleActionsAndScopType[_self.RoleId]) {
                  _self.RoleActionsAndScopType[_self.RoleId] = {};
              }
              _self.RoleActionsAndScopType[_self.RoleId][sheet.Code] = actionList;
              return false;
            }
          });
      }
    },
    // 保存角色权限设置
    async _SaveAclNode(actionList, scopeType, appId) {
      console.log(actionList);
      let actionCodeList = actionList.filter(item => {
        return item.hasAcl;
      })
      .map(item => {
        return `${item.Code.toUpperCase()}`;
      })
      // let actionStr = actionCodeList.join(',');
      let res = await SaveAclNode(this.RoleId, actionCodeList, scopeType, appId);
      if (res.code === '0') {
        // 保存成功，更新缓存
        //第二层，表单缓存
        // if (this.RoleSheetli[this.RoleId] && this.RoleSheetli[this.RoleId][this.AppCode]) {
        //   for (var i = 0; i < this.RoleSheetli[this.RoleId][this.AppCode].length; i++) {
        //     var tempItem = this.RoleSheetli[this.RoleId][this.AppCode][i];
        //     if (tempItem.Code == code) {
        //       tempItem.hasAcl = AclNode.scopeType != this.DataAclScopeType.None;
        //       break;
        //     }
        //   }
        // }

        // // 第3层，表单，列表具体权限缓存
        // if (this.RoleActionsAndScopType[this.RoleId] && this.RoleActionsAndScopType[this.RoleId][code]) {
        //   this.RoleActionsAndScopType[this.RoleId][code] = AclNode;
        // }
        $.IShowSuccess('提示:保存成功');
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    // 获取用户角色数据
    async _GetRoleUsers(RoleId, pageNum, pageSize, keyword) {
      let res = await GetRoleUsers(RoleId, pageNum, pageSize, keyword);
      if (res.code === '0') {
        //获取数据成功
        this.roleusersList = res.page.result;
        if (this.roleusersList.length) {
          this.hasRoleuser = true;
        } else {
          this.hasRoleuser = false;
        }
        // this.BeginNum = res.ReturnData.BeginNum;
        // this.iTotalDisplayRecords = res.ReturnData.iTotalDisplayRecords;
        // this.totalPage = Math.ceil(
        //   this.iTotalDisplayRecords / this.onePageTotal
        // ); //计算出总页数
        // if (this.iTotalDisplayRecords > 8) {
        //   this.showPagenation = true;
        // } else {
        //   this.showPagenation = false;
        // }
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    // 搜索角色用户
    async _SearchRoleUsers(keyword) {
      let res = await SearchRoleUsers('SearchRoleUsers', this.RoleId, 0, this.onePageTotal, keyword);
      if (res.Successful) {
        //获取数据成功
        this.roleusersList = res.ReturnData.aaData;
        this.BeginNum = res.ReturnData.BeginNum;
        this.iTotalDisplayRecords = res.ReturnData.iTotalDisplayRecords;
        this.totalPage = Math.ceil(
          this.iTotalDisplayRecords / this.onePageTotal
        ); //计算出总页数
        if (this.iTotalDisplayRecords > 8) {
          this.showPagenation = true;
        } else {
          this.showPagenation = false;
        }
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    GetRoleAclNode($dom) {
        if ($dom.length == 0) { return null; }
        var config = {};
        var code = $dom.attr('data-code');
        var appCode = this.AppCode;
        config['ListViewActions'] = this.GetActions($dom, 'list');
        config['FormActions'] = this.GetActions($dom, 'sheet');
        //若该表单被选中，调用获取数据权限的方法，否则数据权限值为-1
        config['scopeType'] = $dom.find('input.roletogglesheet')[0].checked ? this.GetScopeType(code) : this.DataAclScopeType.None;
        // 判断表单，列表全选按钮是否选中
        config['FormActionsAllChecked'] = ($dom.find('.sheet-checkall').find('input.checkall')[0] && $dom.find('.sheet-checkall').find('input.checkall')[0].checked) ? true : false;
        config['ListActionsAllChecked'] = ($dom.find('.listview-checkall').find('input.checkall')[0] && $dom.find('.listview-checkall').find("input.checkall")[0].checked) ? true : false;
        return {
          'code': code,
          'node': new this.RoleAclNode(config),
          'appCode': appCode
        };
    },
    GetActions($e, type) {
        var result = [];
        var $Inputs = null;
        var lis;
        switch (type) {
            case 'sheet':
                var code = $e.data('code');
                lis = $e.find('>ul>li.sheet-node-childnode');
                $Inputs = lis.find('input:not(.checkall)');
                break;
            case 'list': 
                var code = $e.data('code');
                lis = $e.find('>ul>li.listview-node-childnode');
                $Inputs = lis.find('input:not(.checkall)');
                break;
            default: return;
        }

        for (var i = 0; i < $Inputs.length; i++) {
            var tempItem = $Inputs[i];
            var config = {};
            config['Code'] = tempItem.getAttribute('data-code');
            config['Name'] = tempItem.getAttribute('data-name');
            config['hasAcl'] = tempItem.checked;
            var tempResult = new this.RoleChildNode(config);
            result.push(tempResult);
        }
        return result;
    },
    GetScopeType(code) {
        var itemInputs = $("[name='" + code + '_' + this.ScopeTypeName + "']");
        for (var i = 0; i < itemInputs.length; i++) {
            var item = itemInputs[i];
            if (item.checked) { return i; };
        }
    },
    // 点击新建角色，创建新的角色
    showCreatRoleMModal: function() {
      this.showCreatRoleFlag = true;
    },
    // 关闭新建角色弹窗后，重置弹窗显示/隐藏标识符
    resetCreatRoleModel: function() {
      this.showCreatRoleFlag = false;
    },
    // 点击复制角色按钮，复制角色
    showCopyRoleModal: function() {
      this.showCopyRoleFlag = true;
    },
    // 关闭复制角色弹窗后，重置弹窗显示/隐藏标识符
    resetCopyRoleModel: function() {
      this.showCopyRoleFlag = false;
    },
    // 新建/复制角色成功之后刷新角色数据
    refreshRoles: function(flag) {
      if (flag) {
        this._GetAllRoles('', true);
      }
    },
    // 鼠标滑过角色时，出现左右两侧icon
    showIcon: function(index) {
      this.currentIndex = index;
    },
    hideIcon: function() {
      this.currentIndex = -1;
    },
    // 点击修改角色名称按钮，弹出修改名称弹窗
    showRenameModal: function(roleId) {
      this.RoleId = roleId;
      this.showRenameRoleFlag = true;
    },
    // 关闭修改角色弹窗后，重置弹窗显示/隐藏标识符
    resetrenameRoleModel: function() {
      this.showRenameRoleFlag = false;
    },
    // 点击删除角色名称按钮，弹出删除弹窗
    showDelRole: function(roleId) {
      this.RoleId = roleId;
      this.showDelRoleFlag = true;
    },
    // 关闭删除角色弹窗后，重置弹窗显示/隐藏标识符
    resetdelRoleModel: function() {
      this.showDelRoleFlag = false;
    },
    // 搜索角色
    SearchRoles: function() {
      this.isSearchRole = true;
      this._GetAllRoles(this.searchRoleWord);
    },
    // 搜索角色用户
    searchRoleUser: function() {
      if (this.searchRoleUserWord != '') {
        this._SearchRoleUsers(this.searchRoleUserWord);
      } else {
        this._GetRoleUsers(this.RoleId, 1, this.onePageTotal, '')
      }
      this.showSearchInput = false;
      this.searchRoleUserWord = '';
    },
    //  切换tab页时，刷新数据
    changeTab: function() {
      if (this.currentTab == 'roleMemberManage') {
        this._GetRoleUsers(this.RoleId, 1, this.onePageTotal, ''); // 渲染用户角色管理
      } else {
        this._GetAppPagesAndAcl(this.RoleId); // 渲染权限设置
      }
    },
    // 点击不同角色时，右侧渲染不同的权限/角色用户数据
    getAppAndAuthority: function(RoleId, index, name) {
      this.ifCheckAll = false;
      this.clickIndex = index;
      this.RoleId = RoleId;
      this.selectedRole = name;
      if (RoleId == this.UserRoleId) {
        this._GetAppPagesAndAcl(this.RoleId); // 渲染权限设置
      } else {
        if (this.currentTab == 'roleMemberManage') {
          this.currentPage = 1;
          this._GetRoleUsers(this.RoleId, 1, this.onePageTotal, ''); // 渲染用户角色管理
        } else {
          this._GetAppPagesAndAcl(this.RoleId); // 渲染权限设置
        }
      }
    },
    // 点击不同应用app时，右侧刷出不同表单权限
    getFormListAcls: function(app, index) {
      this.ifCheckAll = false;
      this.appCurrentIndex = index;
      let appcode = app.id;
      let hasAcl = app.hasAcl;
      this.nextAppCode = app.id;
      if (!this.saveLiCode.length == 0 && this.changAcl) {
        this.showSaveAclFlag = true;
      } else {
        this.AppCode = appcode;
        this._GetAppPackageChildrenAcl(this.AppCode);
      }
    },
    ifSaveAcl: function(flag) {
      // 确认保存设置的上一个app权限
      if (flag) {
        this.SaveAllNode();
        this._GetAppPackageChildrenAcl(this.nextAppCode);
        this.AppCode = this.nextAppCode;
        this.changAcl = false;
        this.temporarySaveSheetAcl = [];
      } else {
        this.changAcl = false;
        this.saveLiCode = [];
        let that = this;
        // 去掉未保存的input操作状态
        for (let i=0; i<this.temporarySaveSheetAcl.length; i++) {
          let currentSheet = JSON.parse(this.temporarySaveSheetAcl[i]);
          for (let j=0; j<that.formlistData.length; j++) {
            let sheet = that.formlistData[j];
            if (currentSheet.Code == sheet.Code) {
              sheet.hasAcl = currentSheet.hasAcl;
              for (let k=0; k<currentSheet.authority.ListViewActions.length; k++) {
                sheet.authority.ListViewActions[k].hasAcl = currentSheet.authority.ListViewActions[k].hasAcl;
              }
              for (let k=0; k<currentSheet.authority.FormActions.length; k++) {
                sheet.authority.FormActions[k].hasAcl = currentSheet.authority.FormActions[k].hasAcl;
              }
              this.$set(sheet, sheet.hasAcl, currentSheet.hasAcl);
              this.$set(sheet.authority, sheet.authority.ListViewActions, currentSheet.authority.ListViewActions);
              this.$set(sheet.authority, sheet.authority.FormActions, currentSheet.authority.FormActions);
              this.$set(sheet.authority, sheet.authority.scopeType, currentSheet.authority.scopeType);
            }
          };
        }
        this._GetAppPackageChildrenAcl(this.nextAppCode);
        this.AppCode = this.nextAppCode;
        this.temporarySaveSheetAcl = [];
      }
    },
    // 点击权限设置列表全选，对应ul下checkbox全部被选中
    checkAllAcl: function(sheet, name, e) {
      const beforeChangeSheet = JSON.stringify(sheet);
      let exsitSheetFlag = false;
      for (let i=0; i<this.temporarySaveSheetAcl.length; i++) {
        let currentSheet = JSON.parse(this.temporarySaveSheetAcl[i]);
        if (currentSheet.Code === sheet.Code) {
          exsitSheetFlag = true;
        }
      }
      if (this.temporarySaveSheetAcl.length === 0 || !exsitSheetFlag) {
        this.temporarySaveSheetAcl.push(beforeChangeSheet);
      }
      let sheetCode = sheet.Code;
      let checkAllStatus = e.target.checked;
      this.changAcl = true;
      if (name == 'list'){
        sheet.authority.ListActionsAllChecked = checkAllStatus;
        this.$set(sheet.authority, 'sheet.authority.ListActionsAllChecked', checkAllStatus);
         sheet.authority.ListViewActions.forEach((obj) => {
            obj.hasAcl = checkAllStatus;
        });
        this.$set(sheet.authority, sheet.authority.ListViewActions, sheet.authority.ListViewActions);   
      }
      if (name == 'form') {
        sheet.authority.FormActionsAllChecked = checkAllStatus;
        this.$set(sheet.authority, 'sheet.authority.FormActionsAllChecked', checkAllStatus);
        sheet.authority.FormActions.forEach((obj) => {
            obj.hasAcl = checkAllStatus;
        });
        this.$set(sheet.authority, sheet.authority.FormActions, sheet.authority.FormActions);
      }
    },
    activeAclInput: function(sheet, e, type) {
      const beforeChangeSheet = JSON.stringify(sheet);
      let exsitSheetFlag = false;
      for (let i=0; i<this.temporarySaveSheetAcl.length; i++) {
        let currentSheet = JSON.parse(this.temporarySaveSheetAcl[i]);
        if (currentSheet.id === sheet.id) {
          exsitSheetFlag = true;
        }
      }
      if (this.temporarySaveSheetAcl.length === 0 || !exsitSheetFlag) {
        this.temporarySaveSheetAcl.push(beforeChangeSheet);
      }
      this.changAcl = true;
      let sheetCode = sheet.id;
      let checkAllStatus = e.target.checked;
      if (type == 'sheet') {
        sheet.hasAcl = checkAllStatus;
        this.$set(sheet, sheet.hasAcl, sheet.hasAcl);
        this.changAcl = true;
      } else {
        let currentCode = e.target.dataset.fixcode;
        sheet.authority.ListViewActions.forEach((obj) => {
          if (obj.code+this.list_postfix == currentCode) {
            obj.hasAcl = checkAllStatus;
            this.changAcl = true;
          }
        });
        this.$set(sheet.authority, sheet.authority.ListViewActions, sheet.authority.ListViewActions);
        console.log(sheet);
        sheet.authority.FormActions.forEach((obj) => {
          if (obj.Code+this.form_postfix == currentCode) {
            obj.hasAcl = checkAllStatus;
            this.changAcl = true;
          }
        });
        this.$set(sheet.authority, sheet.authority.FormActions, sheet.authority.FormActions);
        if (type == 'radio') {
          sheet.authority.scopeType = e.target.value;
          this.$set(sheet.authority, sheet.authority.scopeType, sheet.authority.scopeType);
        };
      };
      //saveLiCode 中不存在this的data-code属性才添加
      if (this.saveLiCode.indexOf(sheetCode) == -1) {
        this.saveLiCode.push(sheetCode);
        this.changAcl = true;
      }

      // 应用下有一个表单被勾选，就给该应用添加标识
      let count = 0;
      this.formlistData.some(function(sheet){
        if (sheet.hasAcl) {
          count++;
          return false;
        }
      });
      if (count) {
        this.setIconBeforeApp(true);
      } else {
        this.setIconBeforeApp(false);
        this.ifCheckAll = false;
      }
      console.log(sheet.hasAcl)
    },
    formCheckAll: function(e) {
      let _self = this;
      this.changAcl = true;
      let checkAllStatus = e.target.checked;
      this.ifCheckAll = checkAllStatus;
      // 变更数据的方式，改变sheet.hasAcl属性
      this.formlistData.some(function(sheet){
        sheet.hasAcl = checkAllStatus;
        _self.$set(sheet, 'hasAcl', sheet.hasAcl);
        //saveLiCode 中不存在this的data-code属性才添加
        if (_self.saveLiCode.indexOf(sheet.Code) == -1) {
            _self.saveLiCode.push(sheet.Code);
        }
      });
      // 若取消全选，则去掉app前面的√； 反之，加√
      this.setIconBeforeApp(checkAllStatus);
    },
    setIconBeforeApp: function(flag) {
      let _self = this;
      this.aclsList.some(function(app){
        if (app.Code == _self.AppCode) {
          if (!flag) {
              _self.$set(app, 'hasAcl', false);
            return false;
          } else {
            _self.$set(app, 'hasAcl', true);
            return false;
          }
        }
      });
    },
    // 保存权限设置
    // SaveAllNode: function() {
    //   var notAllNone = false;
    //   if (this.saveLiCode.length == 0) {
    //       // this.$Message.info('提示:保存成功')
    //   } else {
    //     for (var i = 0; i < this.saveLiCode.length; i++) {
    //       var saveLi = $('.formlist').find('>li[data-code=' + this.saveLiCode[i] + ']');
    //       this.saveInputNodes[this.saveLiCode[i]] = this.GetRoleAclNode(saveLi);
    //       var key = this.saveLiCode[i];
    //       this._SaveAclNode(this.saveInputNodes[key].node, this.saveInputNodes[key].code );
    //       if (this.saveInputNodes[key].node.scopeType != this.DataAclScopeType.None) {
    //         notAllNone = true;
    //       }
    //     };     
    //     this.saveLiCode = [];
    //     var appAclNode = new this.RoleAclNode({ scopeType: notAllNone ? this.DataAclScopeType.Own : this.DataAclScopeType.None });
    //     this._SaveAclNode(appAclNode, this.AppCode);
    //   }
    //   // $.IShowSuccess('提示:保存成功')
    // },
    SaveAllNode: async function() {
      var notAllNone = false;
      if (this.saveLiCode.length == 0) {
          // this.$Message.info('提示:保存成功')
      } else {
        console.log(this.saveLiCode);
        for (var i = 0; i < this.saveLiCode.length; i++) {
          let saveLi = $('.formlist').find('>li[data-code=' + this.saveLiCode[i] + ']');
          this.saveInputNodes[this.saveLiCode[i]] = this.GetRoleAclNode(saveLi);
          let key = this.saveLiCode[i];
          let appId = this.saveInputNodes[key].code;
          let actionList = this.saveInputNodes[key].node.ListViewActions;
          let scopeType = this.saveInputNodes[key].node.scopeType;
          console.log(this.saveInputNodes[key]);
          await this._SaveAclNode(actionList, scopeType, appId);
          // if (this.saveInputNodes[key].node.scopeType != this.DataAclScopeType.None) {
          //   notAllNone = true;
          // }
        };     
        this.saveLiCode = [];
        let permissionsRes = await getUserRoleAndPermission();
        this.$store.dispatch('user/setPermissionsObj',permissionsRes.permissions);
        // var appAclNode = new this.RoleAclNode({ scopeType: notAllNone ? this.DataAclScopeType.Own : this.DataAclScopeType.None });
        // this._SaveAclNode(appAclNode, this.AppCode);
        // console.log(this.AppCode);
      }
      // $.IShowSuccess('提示:保存成功')
    },
    // 点击设置服务部门，弹出对应弹窗
    ShowSetPost: function(id) {
      this.showServiceRoleFlag = true;
      this.UserId = id;
    },
    // 重置服务部门弹窗标识
    resetserviceModel: function() {
      this.showServiceRoleFlag = false;
    },
    // 角色用户更新成功之后，更新页面数据
    resertServiceDepart: function(flag) {
      if (flag) {
        this.getAppAndAuthority(this.RoleId, this.clickIndex, this.selectedRole)
      }
    },
    // 删除角色用户
    RemoveSingleRole: function(UserId, title) {
      // 批量移除角色用户
      this.removeAllUserIds = '';
      if (UserId == '') {
        let _self = this;
        this.$refs.roleuser.forEach((obj) => {
          if (obj.checked) {
            var id = $(obj).attr('ObjectId');
            _self.removeAllUserIds += id + ';';
          }
        });
      } else {
          this.UserId = UserId;
      }
      this.showDelUserRoleFlag = true;
      this.delTitle = title;
    },
    resetdelRoleUserModel: function() {
      this.showDelUserRoleFlag = false;
    },
    // 添加角色成员
    ModeAddRoleUsersShow: function() {
      this.showAddUserRoleFlag = true;
    },
    resetaddRoleUserModel: function() {
      this.showAddUserRoleFlag = false;
    },
    // 勾选角色成员前面复选框
    checkOn: function(e) {
      let checkStatus = e.target.checked;
      if (checkStatus == true) {
          this.SelecteddragNumber = this.SelecteddragNumber + 1;
      } else {
          this.SelecteddragNumber = this.SelecteddragNumber - 1;
      }
      if (this.SelecteddragNumber != 0) {
        this.romoveAllFlag = false;
      } else {
        this.romoveAllFlag = true;
        this.$refs.checkAllFalg.checked = false;
      }
    },
    // 批量移除角色成员时全选
    CheckAll: function(e) {
      let checkAllStatus = e.target.checked;
      this.$refs.roleuser.forEach((obj) => {
        obj.checked = checkAllStatus;
      });

      if (checkAllStatus) {
        this.SelecteddragNumber = this.$refs.roleuser.length;
      } else {
          this.SelecteddragNumber = 0;
      }
      if (this.SelecteddragNumber != 0) {
        this.romoveAllFlag = false;
      } else {
        this.romoveAllFlag = true;
      };
    },
    // 点击下一页按钮，刷新表格数据，分页对应数据改变
    pageToNext: function(e) {
      if (this.currentPage == this.totalPage) {
      } else {
        let start = this.currentPage * this.onePageTotal;
        this.currentPage = this.currentPage + 1;
        this._GetRoleUsers(this.RoleId, start, this.onePageTotal, '');
      }
    },
    // 点击上一页，刷新表格数据，分页数字跟着改变
    pageToPrevious: function() {
      if (this.currentPage == 1) {
      } else {
        this.currentPage = this.currentPage - 1;
        let start = (this.currentPage - 1) * this.onePageTotal;
        this._GetRoleUsers(this.RoleId, start, this.onePageTotal, '');
      }
    },
    // 点击当前页数按钮，显示更改页数菜单栏
    setShowMenuFlag: function() {
      this.toggleShowMenu = !this.toggleShowMenu;
    },
    // 点击每页显示条数，重新刷新用户数据表格，分页显示
    getNewUserData: function(e) {
      this.toggleShowMenu = false;
      this.onePageTotal = e.target.innerText;
      this.currentPage = 1;
      this.totalPage = Math.ceil(this.iTotalDisplayRecords / this.onePageTotal);
      this._GetRoleUsers(this.RoleId, 1, this.onePageTotal, '');     
    },
    toggleAclDetail(sheet){
      // this.currentSheetCode = sheet.Code;
      // this.hideAclDetailFlag = !this.hideAclDetailFlag;
      // if(this.hideAclDetailFlag && this.currentSheetCode) {
      //   this.hideFlag = true
      // }
    }
  },
  components: {
    creatRole,
    copyRole,
    renameRole,
    delRole,
    delUserRole,
    addRoleUser,
    loading,
    saveAcl
  }
};
</script>
