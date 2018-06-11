<template>
    <div>
        <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
            <span>新建模块</span>
        </p>
        <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="80">
            <FormItem label="模块名">
                <Input v-model="formValidate.name"  @on-change="valueChange"></Input>
            </FormItem>
	    <FormItem label="图标">
	     <Select v-model="formValidate.icon" @on-change="valueChange1">
			<Option v-for="item in cityList" :value="item.value" :key="item.value" :label="item.label">
                <svg class="icon" aria-hidden="true" v-html="item.desc">
                   {{item.desc}}
                </svg>
            </Option>
	    </Select>
	    </FormItem>
        </Form>
        <!--<div slot="footer">-->
                 <!--<Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>-->
                 <!--<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
         <!--</div>-->
    </div>
</template>
<script>
    import HTTP from '../../api/app-apply.js';
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
		    icon: ''
		    
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                },
		  cityList: [
                    {
                        value: "#icon-renshishenqing",
                        label: '图标一',
                        desc :'<use xlink:href="#icon-renshishenqing"></use>'
                    },
                    {
                        value: "#icon-diannaoguzhang" ,
                        label: '图标二',
                        desc:'<use xlink:href="#icon-diannaoguzhang"></use>'
                    },
                    {
                        value: "#icon-buqian" ,
                        label: '图标三',
                        desc: '<use xlink:href="#icon-buqian"></use>'
                    },
                    {
                        value: "#icon-fukuanshenqing" ,
                        label: '图标四',
                        desc:'<use xlink:href="#icon-fukuanshenqing"></use>'
                    },
                    {
                        value: "#icon-jiaotongbaoxiao" ,
                        label: '图标五',
                        desc: '<use xlink:href="#icon-jiaotongbaoxiao"></use>'
                    },
                    {
                        value: "#icon-jiekuanshenqing" ,
                        label: '图标六',
                        desc : '<use xlink:href="#icon-jiekuanshenqing"></use>'
                    },
		    {
                        value: "#icon-xiujia" ,
                        label: '图标七',
                        desc : '<use xlink:href="#icon-xiujia"></use>'
                    },
		    {
                        value: "#icon-ITshenqing" ,
                        label: '图标八',
                        desc :'<use xlink:href="#icon-ITshenqing"></use>'
                    },
		    {
                        value: "#icon-jiaban" ,
                        label: '图标九',
                        desc: '<use xlink:href="#icon-jiaban"></use>'
                    },
		    {
                        value: "#icon-nan" ,
                        label: '图标十',
                        desc : '<use xlink:href="#icon-nan"></use>'
                    },
		    {
                        value: "#icon-youxiangmimagenggai" ,
                        label: '图标十一',
                        desc :'<use xlink:href="#icon-youxiangmimagenggai"></use>'
                    },
		    {
                        value: "#icon-nv" ,
                        label: '图标十二',
                        desc :'<use xlink:href="#icon-nv"></use>'
                    },
		    {
                        value: "#icon-wupinshenqing" ,
                        label: '图标十三',
                        desc :'<use xlink:href="#icon-wupinshenqing"></use>'
                    },
		    {
                        value: "#icon-ITquanxian" ,
                        label: '图标十四',
                        desc :  '<use xlink:href="#icon-ITquanxian"></use>'
                    },
		    {
                        value: "#icon-kaoqinyichang" ,
                        label: '图标十五',
                        desc : '<use xlink:href="#icon-kaoqinyichang"></use>'
                    },
		    {
                        value: "#icon-daibanshixiang" ,
                        label: '图标十六',
                        desc : '<use xlink:href="#icon-daibanshixiang"></use>'
                    }
                ]
            }
        },
        methods: {
            valueChange() {
                var obj = this;

                this.$emit('value', obj.formValidate.name);
            },
	    valueChange1() {
                var obj = this;
                console.log(obj.formValidate.icon);
		          this.$emit('icon', obj.formValidate.icon);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },

            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
