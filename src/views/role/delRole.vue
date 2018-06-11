<template>
    <div class="creatRole">
        <Modal v-model="showFlag" title="删除角色" @on-cancel="cancel" @on-ok="ok"
         width="410px" :loading="loading">
            <div class="modal-body" style="padding: 54px 8px;">
                <p>
                    确定删除吗
                </p>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import { RemoveRole } from '../../api/role.js'   //引入删除角色接口

export default {
    props: [
        "showDelRoleFlag",
        "RoleId"
    ],
    data() {
        return {
            loading: true,
            showFlag: false,
        }
    },
    watch: {
        showDelRoleFlag: function() {
            this.showFlag = this.showDelRoleFlag
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
        async _RemoveRole() {
            let res = await RemoveRole("RemoveRole", this.RoleId);
            
            if (res.Successful) {
                 this.$emit('getAllRoles', true)
            } else {
                // 获取数据失败
                $.IShowError(res.ErrorMessage);
            }
        },
        ok() {
            this._RemoveRole()
            // 将点击确定之后的showModal 派发给父组件
            this.showFlag = false
            this.$emit('delRoleShowFlag')
            
        },
        cancel() {
            // 将点击取消之后的showModal 派发给父组件
            this.$emit('delRoleShowFlag')
        }
    }
}
</script>


