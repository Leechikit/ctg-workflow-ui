<template>
    <div class="copyRole">
        <Modal v-model="showFlag" title="复制角色" @on-cancel="cancel" :mask-closable="false" width="410px">
            <div class="modal-body">
                <Row class="notice">
                    <Col>注：新角色的配置权限与被“选择角色”相同</Col>
                </Row>
                <Row class="chooseRole">
                    <Col span="6">选择角色</Col>
                    <Col span="18" class="choose-role-select">
                        <Select ref="choose-role-select" :label-in-value="true" filterable @on-change="change($event)">
                            <Option v-for="item in allRoleData" v-if="item.ObjectId !== AdminRoleId"
                             :value="item.ObjectId" :label="item.Name" :key="item.ObjectId">
                                {{item.Name}}
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">新角色名称</Col>
                    <Col span="18">
                        <input id="rolenewone" v-model="copyRoleName" type="text" placeholder="输入新角色名称">
                    </Col>
                </Row>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="confirm">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import { CopyRole } from '../../api/role.js'   //引入复制角色接口

export default {
    props: [
        "showCopyRoleFlag",
        "allRoleData",      // 所有角色数据
        "AdminRoleId",     // 系统管理员角色ID
        "SortKey",     //所有角色长度
        // "selectedRole",
        'RoleId',
    ],
    data() {
        return {
            loading: true,
            showFlag: false,
            currentSortKey: '',
            // selectedRoleName: '',
            copyRoleName: '',      //复制角色名称
            selectedRoleId: '',   //复制的角色ID
        }
    },
    watch: {
        showCopyRoleFlag: function() {
            this.showFlag = this.showCopyRoleFlag;
            // this.selectedRoleName = this.selectedRole;
            // console.log('22222222222222')
            // console.log(this.selectedRoleName)
            // if(!this.showFlag) {
            //     this.selectedRoleName = '';
            //     this.copyRoleName = '';
            // }
        }
    },
    created: function() {
    },
    methods: {
        // 复制角色
        async _CopyRole() {
            this.currentSortKey = this.SortKey + 1
            let res = await CopyRole("CopyRole", this.copyRoleName, this.currentSortKey, this.selectedRoleId);
            if (res.Successful) {
                this.$emit('getAllRoles', true)
                // 将点击确定之后的showModal 派发给父组件
                this.showFlag = false
                this.$emit('copyRoleShowFlag')
            } else {
                // 获取数据失败
                this.showFlag = true
                $.IShowError(res.ErrorMessage);
            }
        },
        // 更改选择下拉框里面值时，下面input框显示相应的值
        change: function(e) {
            this.copyRoleName = e.label.replace(/^\s+|\s+$/g,"") + '副本'
            this.selectedRoleId = e.value;
        },
        confirm() {
            if(this.copyRoleName == "") {
                $.IShowError("提示", "必填信息不完整");
                return
            }
            this._CopyRole() 
        },
        cancel() {
            this.roleName = '';
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('copyRoleShowFlag');
        },

    }
}
</script>





// WEBPACK FOOTER //
// src/components/role/copyRole.vue