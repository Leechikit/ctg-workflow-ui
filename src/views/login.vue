<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button :loading="loading" @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                   <!--  <p class="login-tip">输入任意用户名和密码即可</p> -->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import HTTP from '../api/work-flow.js';
import {getUserRoleAndPermission} from '../api/role.js';
export default {
    data () {
        return {
            loading:false,
            form: {
                userName: 'admin',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        async handleSubmit () {
             this.loading=true;
             try{
                const valid = await this.$refs.loginForm.validate();
                if (!valid) return;
                let result = await HTTP.Login({loginName:this.form.userName,password:this.form.password});
                if (result.code === '0'){  
                    // var expiresDate= new Date();
                    // expiresDate.setTime(expiresDate.getTime() + (60*60*1000));
                    // Cookies.set('user', this.form.userName, { expires: expiresDate });
                    // Cookies.set('password', this.form.password, { expires: expiresDate });
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    let permissionsRes = await getUserRoleAndPermission();
                    this.$store.dispatch('user/setPermissionsObj',permissionsRes.permissions);
                    this.$router.push({
                        name: 'home_index'
                    });
                 }else{
                    this.$Message.error('账号密码错误，请重新登录');
                 }
             }catch(err){
                console.log(err);
                this.$Message.error('This is an error')
             }finally{
                this.loading=false;
             }
             
             // HTTP.Login({loginName:this.form.userName,password:this.form.password})
             //     .then(res => {
             //         if(res.code==0){
             //              this.$refs.loginForm.validate((valid) => {
             //                 if (valid) {
             //                     Cookies.set('user', this.form.userName);
             //                     Cookies.set('password', this.form.password);
             //                     this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
             //                     if (this.form.userName === 'iview_admin') {
             //                         Cookies.set('access', 0);
             //                     } else {
             //                         Cookies.set('access', 1);
             //                     }
             //                     this.$router.push({
             //                         name: 'home_index'
             //                     });
             //                 }
             //             });
             //         }
             //         else{
             //             this.$Message.error('账号密码错误，请重新登录');
             //         }
             //     })
             //     .catch(err => {
             //         console.log(err);
             //        this.$Message.error('This is an error')
             //     }).finally(()=>{
             //        this.loading=false;
             //     })           
        },
    }
};
</script>

