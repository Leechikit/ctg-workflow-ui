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
      <Select
        v-model="soul.model.value.value" :disabled="!soul.model['可编辑'].value">
        <Option
          v-for="item in soul.model.items.value"
          :value="item.value"
          :key="item.id">
          {{ item.label }}
        </Option>
      </Select>
    </Form-item>
    <Form-item
      v-show="!soul.model.required.value"
      :label="soul.model.label.value">
      <Select
        v-model="soul.model.value.value" :disabled="!soul.model['可编辑'].value">
        <Option
          v-for="item in soul.model.items.value"
          :value="item.value"
          :key="item.id">
          {{ item.label }}
        </Option>
      </Select>
    </Form-item>
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
    watch:{
      'soul.model.required.value'(n){
        //v-if will reset get/set of model value
        resetSoul(this.soul)
        this.soul.model.required.value = n
      }
    },data: function () {
        const validatePassCheck = (rule, value, callback) => {
                if (this.soul.model.required.value&&value === '') {
                    callback(new Error('必填,不可为空'));
                } 
                else{
                    callback();
                }
            };

      return {
        ruleValidate: {
          value: [
            { required: true,validator: validatePassCheck, trigger: 'change' }
          ]
        }
      }
    }
  }
</script>
