<template>
  <Form
    :model="soul.model.value"
    :label-width="120"
    :show-message="true"
    :rules="ruleValidate" 
    ref= "formItem"
    v-show="soul.model['可见'].value">
    <Form-item
      v-show="soul.model.required.value"
      :prop="prop"
      :label="soul.model.label.value">
      <Radio-group v-model="soul.model.value.value"
                   @on-change="radioChange">
        <Radio
          v-for="item in soul.model.items.value"
          :key="item.id"
          :label="item.value" :disabled="!soul.model['可编辑'].value">
          {{item.label}}
        </Radio>
      </Radio-group>
    </Form-item>
    <Form-item
      v-show="!soul.model.required.value"
      :label="soul.model.label.value">
      <Radio-group v-model="soul.model.value.value"
                   @on-change="radioChange">
        <Radio
          v-for="item in soul.model.items.value"
          :key="item.id"
          :label="item.value" :disabled="!soul.model['可编辑'].value">
          {{item.label}}
        </Radio>
      </Radio-group>
    </Form-item>
  </Form>
</template>
<script>
  import{
    resetSoul
  } from '../../../core/lifecycle'
  export default{
    name: 'FormRadio',
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
    watch:{
      'soul.model.required.value'(n){
        //v-if will reset get/set of model value
        resetSoul(this.soul)
        this.soul.model.required.value = n
      }
    },
    data: function () {
      const validatePassCheck = (rule, value, callback) => {
                if (this.soul.model.required.value&&value === '') {
                    callback(new Error('必填,不可为空'));
                } 
                else{
                    callback();
                }
       };
      return {
        model:'model',
        ruleValidate: {
          value: [
             { required: true,validator: validatePassCheck, trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      radioChange(){

      }
    }
  }
</script>
