<template>
    <Modal v-model="showFieldAclModalFlag" title="操作权限" :mask-closable="false"
        @on-ok="ok" @on-cancel="cancel" class="field-acl-modal"
        width="800px">
        <Tabs value="draft">
            <TabPane label="新增数据时" name="draft">
              <field-acl-body 
                  prefix="draft"
                  :properties="properties"
                  :field-states="draftFieldStates"
                  :formula-fields="formulaFields"
                  :mapping-properties="mappingProperties"
                  :pre-installed-fields="preInstalledFields">
              </field-acl-body>
            </TabPane>
            <TabPane label="修改数据时" name="effective">
              <field-acl-body 
                  prefix="effective"
                  :properties="properties"
                  :field-states="effectiveFieldStates"
                  :formula-fields="formulaFields"
                  :mapping-properties="mappingProperties"
                  :pre-installed-fields="preInstalledFields">
              </field-acl-body>
            </TabPane>
        </Tabs>
    </Modal>
</template>

<script>
import FieldAclBody from './field-acl-body'
import { loadFieldAcl, saveFieldAcl } from '../../../service/getData'

export default {
  props: ['fieldAclModel', 'schemaCode'],
  data() {
    return {
      showFieldAclModalFlag: false,
      aclSettings: {},
      draftFieldStates: {},
      effectiveFieldStates: {},
      properties: {},
      formulaFields: [],
      mappingProperties: [],
      preInstalledFields: []
    }
  },
  watch: {
  },
  created() {
    this.loadFieldAcl()
  },
  methods: {
    show() {
      this.showFieldAclModalFlag = true
    },
    ok() {
      let res = this.saveFieldAcl()
      this.destroy()
    },
    cancel() {
      var that = this
      this.$emit('cancel')
      this.destroy()
    },
    destroy() {
      this.$destroy()
      document.body.removeChild(this.$el)
    },
    buildFieldStates(fieldStates) {
      let resultFieldStates = {}
      for (var fieldKey in fieldStates) {
        let fieldState = fieldStates[fieldKey]
        resultFieldStates[fieldKey] = {
          Visible: fieldState['Visible'],
          Editable: fieldState['Editable'],
          Required: fieldState['Required'],
          Printable: fieldState['Printable']
        }
      }
      return resultFieldStates
    },
    async loadFieldAcl() {
      let res = await loadFieldAcl(this.schemaCode)
      if (res.Successful) {
        this.aclSettings = res.ReturnData
        this.draftFieldStates = JSON.parse(this.aclSettings.DraftFieldStates)
        this.effectiveFieldStates = JSON.parse(
          this.aclSettings.EffectiveFieldStates
        )
        this.properties = JSON.parse(this.aclSettings.Propertys)
        this.formulaFields = res.ReturnData.FormulaFields
        this.mappingProperties = this.aclSettings.MappingProperties
        this.preInstalledFields = this.aclSettings.PreInstalledFields
      } else {
        this.$Message.error(res.ErrorMessage)
      }
    },
    async saveFieldAcl() {
      var that = this
      let res = await saveFieldAcl(
        this.schemaCode,
        this.buildFieldStates(this.draftFieldStates),
        this.buildFieldStates(this.effectiveFieldStates)
      );

      if (res.Successful) {
        this.$emit('ok');
      } else {
        this.$Message.error(res.ErrorMessage);
      }
    }
  },
  components: {
    FieldAclBody
  }
}
</script>
<style>
</style>


// WEBPACK FOOTER //
// src/components/sheetdesigner/fieldAclModal/field-acl-modal.vue