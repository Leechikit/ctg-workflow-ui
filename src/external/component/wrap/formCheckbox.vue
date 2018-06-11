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
      <CheckboxGroup  v-model="soul.model.value.value" >
        <Checkbox
          v-for="item in soul.model.items.value"
          :key="item.id"
          :label="item.value" :disabled="!soul.model['可编辑'].value">
          {{item.label}}
        </Checkbox>
      </CheckboxGroup >
    </Form-item>
    <Form-item
      v-show="!soul.model.required.value"
      :label="soul.model.label.value">
      <CheckboxGroup v-model="soul.model.value.value">
        <Checkbox
          v-for="item in soul.model.items.value"
          :key="item.id"
          :label="item.value" :disabled="!soul.model['可编辑'].value">
          {{item.label}}
        </Checkbox>
      </CheckboxGroup>
    </Form-item>
  </Form>
</template>
<script>
  import{
    resetSoul
  } from '../../../core/lifecycle'
  export default{
    name: 'FormCheckbox',
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
      // const validatePassCheck = (rule, value, callback) => {
      //           if (this.soul.model.required.value&& this.soul.model.value.value.length==0) {
      //               callback(new Error('必填,不可为空'));
      //           } 
      //           else{
      //               callback();
      //           }
      //       };
      return {
        model:'model',
        ruleValidate: {
          value: [
              { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' }
                       
          ]
        }
      }
    },
    methods:{

    }
  }
</script>
