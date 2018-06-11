<template>
    <div class="creatRole">
        <Modal v-model="showFlag" title="新建角色" @on-cancel="cancel" :mask-closable="false"
         width="410px">
            <div class="modal-body" style="padding: 54px 8px;">
                <Row>
                    <Col span="6">新建角色<span style="color: red;">*</span></Col>
                    <Col span="18">
                        <input id="rolenewone" maxlength="15" v-model="roleName" type="text" placeholder="输入新角色名称">
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
import { CreateRole } from '../../api/role.js'   //引入创建角色接口

export default {
    props: [
        "showCreatRoleFlag",
        "SortKey",
    ],
    data() {
        return {
            showFlag: false,
            roleName: '',
            currentSortKey: ''
        }
    },
    watch: {
        showCreatRoleFlag: function() {
            this.showFlag = this.showCreatRoleFlag
        }
    },
    created: function() {
    },
    methods: {
        // 创建角色
        async _CreateRole() {
            this.currentSortKey = this.SortKey + 1
            let res = await CreateRole(this.roleName);
            if (res.code === '0') {
                 this.$emit('getAllRoles', true)
                 this.showFlag = false
                 // 将点击确定之后的showModal 派发给父组件
                this.$emit('creatRoleShowFlag')
                this.roleName = ''
            } else {
                // 获取数据失败
                this.showFlag = true
               $.IShowError(res.msg);
            }
        },
        confirm() {
            if(this.roleName == "") {
                $.IShowError("提示", "角色名称不能为空");
                return
            }
            this._CreateRole()
            
        },
        cancel() {
            this.roleName = ''
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('creatRoleShowFlag')
        }
    }
}
</script>

