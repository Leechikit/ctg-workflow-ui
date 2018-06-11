<template>
  <Form
    :model="soul.model.value" 
    :label-width="120"
    :show-message="true"
    :rules="ruleValidate"
    ref= "formItem">
    <Form-item
      v-show="soul.model.required.value"
      :prop="prop"
      :label="soul.model.label.value">
      <Button type="dashed" long v-show="soul.model.value.value.length==0" @click="showModal">点击选择成员</Button>
        <Card v-show="soul.model.value.value.length!=0">
          <Tag v-for="item in soul.model.value.value" :key="item" :name="item" color="yellow" closable @on-close="handleClose2">{{ item }}</Tag>
        </Card>
    </Form-item>
    <Form-item
      v-show="!soul.model.required.value"
      :label="soul.model.label.value">
      <Button type="dashed" long v-show="soul.model.value.value.length==0" @click="showModal">点击选择成员</Button>
      <Card v-show="soul.model.value.value.length!=0">
          <Tag v-for="item in soul.model.value.value" :key="item" :name="item" color="yellow" closable @on-close="handleClose2">{{ item }}</Tag>
      </Card>
    </Form-item>

     <Modal v-model="modalId">
       <Card>
            <Tag v-for="item in soul.model.value.value" :key="item" :name="item" color="yellow" closable @on-close="handleClose2">{{ item }}</Tag>
       </Card>
       <Card style="margin-top:20px">
              <RadioGroup v-model="num" @on-change="changeValue()" vertical>
                <Radio v-for="index in soul.model.items.value" :label='index'>
                    <span>{{index}}</span>
                </Radio>
            </RadioGroup>
       </Card>
  </Modal>
  </Form>
</template>
 
<script>
  import{
    resetSoul
  } from '../../../core/lifecycle'
  export default{
    name: 'FormInput',
   
    props: {
      soul: [Object]
    },
    computed: {
      prop(){
        return this.soul.model.required.value
          ? 'value'
          : ''
      }
    },
    methods:{
      showModal(){
        this.modalId=true;
      },
      changeValue(){
        this.soul.model.value.value=[];
        this.soul.model.value.value.push(this.num);
        console.log(this.soul.model.value.value);
      },
       handleClose2 () {
          this.soul.model.value.value=[];
       },
    },
    watch:{
      'soul.model.required.value'(n){
        //v-if will reset get/set of model value
        resetSoul(this.soul)
        this.soul.model.required.value = n
      }
    },data: function () {
      return {
         modalId:false,
         num:"",
        ruleValidate: {
          value: [
            {required: true, message:'必填,不可为空', trigger: 'change'}
          ]
        }
      }
    }
  }
</script>
