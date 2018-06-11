<style lang="less" scoped>
    @import '../../styles/common.less';
    @import 'components/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <Row>
                    <Modal v-model="modal2" width="1000" :styles="{top: '20px'}">
                        <div slot="header" style="color:#f60;text-align:center">
                                <Icon type="information-circled"></Icon>
                                <span>新增用户</span>
                        </div>
                        <Form   :label-width="80" >
                            <Row>
                                <FormItem label="姓名" >
                                        <Input v-model="userApproval.userName" style="margin-right:50px" @on-change="valueChange"></Input>
                                </FormItem>   
                            </Row>
                            <Row>
                                <FormItem label="登录名" >
                                        <Input v-model="userApproval.loginName" style="margin-right:50px" @on-change="valueChange"></Input>
                                </FormItem>   
                            </Row>
                            <Row>
                                <FormItem label="密码" >
                                        <Input v-model="userApproval.password" style="margin-right:50px" @on-change="valueChange"></Input>
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="手机" >
                                        <Input v-model="userApproval.phone" style="margin-right:50px" @on-change="valueChange"></Input>
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="邮箱" >
                                        <Input v-model="userApproval.email" style="margin-right:50px" @on-change="valueChange"></Input>
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="所属部门" >
                                        <Select v-model="userApproval.email" style="margin-right:50px" @on-change="valueChange">
                                            <Option v-for = "item in leaf" :value="item.id">{{item.name}}</Option>
                                        </Select>
                                </FormItem>
                            </Row>
                        </Form>
                        <div slot="footer">      
                                <Button v-if = "modal2Type == 1" type="primary" @click="handleSubmit(userApproval)">新增</Button>
                                <Button v-else-if = "modal2Type == 2" type="primary" @click="updateUser(userApproval)">修改</Button>
                                <Button type="ghost" style="margin-left: 8px" @click="close()">取消</Button>
                        </div>
                    </Modal>
                </Row>
                <Row>
                    <Col span = "10"> </Col>
                    <Col span = "6">
                    <span  style="margin: 0 10px;"><Button :loading="getLoading" type="primary" @click="addUserModal()">新增用户</Button></span>
                    </Col>
                </Row>
                <Row class = "margin-top-10 ">
                    <Col span="6">
                    <Input   v-model = "userName" @on-change="valueChange" placeholder="请输入名字搜搜..." style="width: 160px" />
                    <span  style="margin: 0 10px;"><Button :loading="getLoading" type="primary" icon="search" @click="addUserModal()"></Button></span>
                    <Tree :data="organ" :load-data="loadData" :render="renderContent" show-checkbox @on-change></Tree>
                    </Col>
                    <Col span="18">
                        <i-table :loading="getLoading"  :content="self" :columns="columnsCsv" :data="csvData" size="small" ref="tableCsv"></i-table>
                        <Page ref = "page" class ="pull-left" :total=total size="small" show-elevator show-sizer @on-change="getUserList()"> </Page>
                    </Col>
                </Row>
            </Card>                
        </Row>
    </div>
</template>

<script>
import {dataFormat} from '../../util/assist.js';
import Cookies from 'js-cookie';
import userReq from '../../api/user.js';
import organReq from '../../api/organ.js';
export default {
    name: 'user-manage',
    data () {
        return {
            self:this,
            modal2:false,
            userName:"",
            Cookies:Cookies,
            columnsCsv: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center',
                    fixed: 'left'
                },
                {
                    'title': '姓名',
                    'width': 160,
                    'key': 'userName',
                    'fixed': 'left'
                },
                {
                    'title': '手机',
                    'key': 'phone',
                    width: 200
                },
                {
                    'title': '邮箱',
                    'key': 'mail',
                    width: 160,
                },
                {
                    'title': '操作',
                    'key': 'action',
                    'width': 250,
                    'align': 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => { this.ajustOrg(params); }
                                }
                            }, '调整部门'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.deleteUser(params.row.id);
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editUser(params.row.id);
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                } 
            ],
            userApproval: {
                userName:"",
                loginName:"",
                phone:"",
                email:"",
                password:"",
                organ:"",
            },
            modal2Type:"",
            csvData: [],
            total:40,
            selectMinRow: 1,
            selectMinCol: 1,
            minRow: 1,
            minCol: 1,
            fontSize: 16,
            getLoading:false,
            organ: [
                {
                    title: '总部门',
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '80%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span',{
                                    props: {

                                    },
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => { 
                                            this.getUserList({organId:data.id})
                                        }
                                    }
                                },data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-plus-empty',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '52px'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    loading: false,
                    id: -1,
                    children: []
                }
            ],
            buttonProps: {
                type: 'ghost',
                size: 'small',
            },
            leaf: [],
        };
    },
    methods: {
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '80%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span',{
                        props: {

                        },
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => { 
                                this.getUserList({organId:data.id})
                            }
                        }
                    },data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append(data) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.organName,
                            autofocus: true,
                            placeholder: '输入部门名称...'
                        },
                        on: {
                            input: (val) => {
                                this.organName = val;
                            }
                        }
                    })
                },
                onOk: () => {
                    var children = data.children;
                    organReq.addOrgan({
                        name: this.organName,
                        parentId: data.id,
                        parentName: data.title,
                    }).then(res => {
                        console.log(res);
                        if (res.code != "0") throw "增加部门失败";
                        return res.id;
                    }).then((id) => {
                        var addChild = {
                            title: this.organName,
                            id: id,
                            expand: true,
                            children:[],
                            hasChild:"",
                        };
                        if (!children || children.length == 0){
                            // console.log(children.length);
                            this.loadData(data,result => {
                                children = result;
                                this.$set(data, 'children', children);
                                this.$set(data, 'expand', true);
                            })
                        }else{
                            console.log(children.length)
                            children.push(addChild);
                            this.$set(data, 'children', children);
                            this.$set(data, 'expand', true);
                        }
                    })
                }
            })
        },
        remove (root, node, data) {
            organReq.delete(data.id)
            .then(res => {
                if(res.code != "0") throw "删除失败"
            }).then(() => {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }).catch((err)=>{
                console.log(err);
            })
        },
        valueChange() {
            var obj = this
            this.$emit('value', obj.formValidate)
        },
        getUserList(extPar){
            this.getLoading = true;
            let params = extPar || {};
            params.pageNum = this.$refs.page.currentPage;
            console.log(params)
            userReq.getUserList(params)
                .then(res => {
                    this.total = res.page.total;
                    this.csvData=res.page.result;
                    this.loading=true; 
                })
                .catch(err => {
                   this.$Message.error('This is an error')
                }).finally(()=>{
                    this.getLoading=false;
                })
        },
        addUserModal() {
            this.setLeaf();
            this.modal2 = true;
            this.modal2Type = 1;
        },
        deleteUser(id) {
            userReq.delete({id:id})
            .then(res => {
                if (res.code == "0"){
                    this.$Message.info('删除成功')
                }else{
                    this.$Message.error(res.msg)
                }
            }).catch(err => {
                this.$Message.error('This is an error');
            }).finally(() => {
                this.getUserList();
            })
        },
        editUser(id) {
            this.modal2 = true;
            this.modal2Type = 2;
            userReq.detail({id:id})
            .then(res => {
                this.userApproval = res.user;
            }).catch(err => {
                this.$Message.error('This is an error');
            })
        },
        updateUser(param) {
            param.createTime = undefined;
            param.updateTime = undefined;
            userReq.update(param)
            .then(res => {
                if (res.code == "0"){
                    // this.$Message.info('修改成功');
                    this.getUserList();
                }else{
                    this.$Message.error(res.msg);
                }
            }).catch(err => {
                this.$Message.error('This is an error');
            }).finally(() => {
                this.close();
            })
        },
        handleSubmit (param) {
            console.log(param);
            userReq.saveUser(param)
            .then(res => {
                if (res.code == "0"){
                    this.$Message.info('新增成功');
                    this.getUserList();
                }else{
                    this.$Message.error(res.msg);
                }
            }).catch(err => {
                this.$Message.error('This is an error');
            }).finally(() => {
                this.close();
            })
        },
        close(){
            this.modal2=false;
        },
        loadData (item, callback) {
            console.log(item);
            let param = {pid:item.id};
            organReq.getChildList(param)
            .then(res => {
                let organList = res.page.result;
                if (res.page.total == "0") delete(item.children);
                let childList = [];
                organList.forEach(function (item) {
                    let child = {
                        title: item.name,
                        id: item.id,
                        loading: false,
                        children: []
                    }
                    childList.push(child);
                });
                // this.$set(item, 'loading', false);
                // this.$set(item, 'expand', true);
                // this.$set(item, 'children', childList);
                callback(childList);

            }).catch(err => {
                console.log(err);
            })
        },
        ajustOrg(params){
            organReq.queryLeaf()
            .then(res => {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Select', {
                            props: {
                                value: this.adjOrgan,
                                placeholder: '选择'
                            },
                            on: {
                                'on-change': (val) => {
                                    this.adjOrgan = val;
                                }
                            }
                        },
                        res.page.result.map(function(item){  
                            return h('Option', {  
                                props: {value: item.id}  
                            }, item.name);
                        })
                        )
                    },
                    onOk: () => {
                        this.updateUser({id:params.row.id,organId:this.adjOrgan});
                    }
                })
            })
        },
        setLeaf(){
            organReq.queryLeaf()
            .then(res => {
                this.leaf = res.page.result;
            })
        },
    },
    mounted(){
        this.getUserList();
    },
    computed: {
    // 计算属性的 getter
            colNum: function () {
              // `this` 指向 vm 实例
              return this.columnsCsv.length;
            },
             rowNum: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            },
            selectMaxCol:function(){
              return this.columnsCsv.length;
            },
             selectMaxRow: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            },
             maxCol:function(){
              return this.columnsCsv.length;
            },
             maxRow: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            }
        }

};
</script>
