<template>
    <div class="renameRole">
        <Modal v-model="showFlag" title="修改角色" @on-cancel="cancel" :mask-closable="false"
         width="410px" :loading="loading">
            <div class="modal-body" style="padding: 54px 8px;">
                <Row>
                    <Col span="6">修改名称</Col>
                    <Col span="18">
                        <input id="rolenewone" maxlength="15" v-model="roleName" type="text" placeholder="输入角色新名称">
                    </Col>
                </Row>
            </div>
            <!-- <div slot="footer" class="confirm">
                <Button type="primary" @click="confirm">确定</Button>
            </div> -->
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="confirm">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import { UpdateRoleName } from '../../api/role.js'   //引入修改角色名称接口

export default {
    props: [
        "showRenameRoleFlag",
        "RoleId"
    ],
    data() {
        return {
            loading: true,
            showFlag: false,
            roleName: ''
        }
    },
    watch: {
        showRenameRoleFlag: function() {
            this.showFlag = this.showRenameRoleFlag
        }
    },
    created: function() {
    },
    methods: {
        // 远程请求时，确定按钮出现loading圆圈
         _setLoading() {
            var _self = this
            setTimeout(() => {
                _self.loading = false;
                _self.$nextTick(() => {
                    _self.loading = true;
                })
            }, 1000)
        },
        // 创建角色
        async _UpdateRoleName() {
            let res = await UpdateRoleName("UpdateRoleName", this.roleName, this.RoleId);
            if (res.Successful) {
                 this.$emit('getAllRoles', true)
                 // 将点击确定之后的showModal 派发给父组件
                this.showFlag = false
                this.$emit('renameRoleShowFlag')
                this.roleName = ''
            } else {
                // 获取数据失败
                this.showFlag = true;
                $.IShowError(res.ErrorMessage);
            }
        },
        confirm() {
            if(this.roleName == "") {
                $.IShowError('角色名称不能为空')
                return
            }
            this._UpdateRoleName()
            
        },
        cancel() {
            this.roleName = ''
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('renameRoleShowFlag')
        }
    }
}
</script>
