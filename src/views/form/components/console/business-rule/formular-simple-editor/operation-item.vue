<template>
    <div class="drop-sele">
        <div class="tree-dropdown" style="display: inline-block; width: 247px;">
            <div class="dropdownlist">
                <div class="drop-handle">
                    <div class="drop-text" :style="operation.targetFieldText ? 'color: #333' : 'color: #999;'">{{operation.targetFieldText && ("目标表单." + operation.targetFieldText) || "目标表单字段"}}</div>
                    <span class="drop-btn"></span>
                </div>
            </div>
            <ul class="tree-dropdown-content">
                <treeview :node="targetSheetFieldsRootNode" 
                    :hide-root-node="true"
                    :can-select="false" 
                    :level="targetFieldDropdownLevel"
                    :name-space="'treeview'"></treeview>                    
            </ul>
        </div>

        <span class="word">值</span>

        <select :id="'operationType' + operationIndex" class="simple-editor-dropdown" 
            style="width: 85px !important;"
            data-value-type="operationType">
            <option v-for="(operationType, index) in operationTypes" 
                v-if="operationType.visible"
                :key="index"
                :value="operationType.value">
                {{ operationType.text }}    
            </option>
        </select>

        <select :id="'compareValueType' + operationIndex" class="simple-editor-dropdown" 
            style="width: 105px !important;"
            data-value-type="compareValueType">
            <option v-for="(compareValueType, index) in compareValueTypes" 
                :key="index"
                :value="compareValueType.value">
                {{ compareValueType.text }}    
            </option>
        </select>

        <input :id="'assignValue' + operationIndex" type="text" class="inputSheet" 
            maxlength="200"
			v-if="operation.compareValueType=='static'"
            v-on:keypress="assignValueKeypressHandler"
            v-on:input="assignValueInputHandler" />
        <div v-else-if="operation.compareValueType=='dynamic'" 
            class="tree-dropdown"
            style="display: inline-block;">
            <div class="dropdownlist" 
                style="display: inline-block; width: 170px; height: 32px;">
                <div class="drop-handle" >
                    <div class="drop-text" :style="operation.assignValueText ? 'color: #333' : 'color: #999;'">{{operation.assignValueText && ("当前表单." + operation.assignValueText) || "当前表单字段"}}</div>
                    <span class="drop-btn"></span>
                </div>
            </div>
            <ul class="tree-dropdown-content">
                <treeview :node="filteredCurrentSheetFieldsRootNode" 
                    :hide-root-node="true"
                    :can-select="false" 
                    :level="currentFieldDropdownLevel"
                    :name-space="'treeview'"></treeview>                    
            </ul>
        </div>

        <i class="action action-remove icon-delete" 
            v-if="operationIndex > 0"
            style="visibility: visible;"
            @click="itemRemoveHandler(operationIndex)"></i>
    </div>
</template>

<script>
    import treeview from "../../../../lib/treeview";

    export default {
        components: { treeview },
        props: [ 
            'operation',
            'operationIndex',
            'operationOption', 
            'operations', 
            'targetSheetFieldsRootNode', 
            'currentSheetFieldsRootNode' 
        ],
        data(){
            return {
                targetFieldDropdownLevel: 0,
                //targetFieldName: "--请选择--",
                //targetFieldIsNumber: false,
                currentFieldDropdownLevel: 0,
                //currentFieldName: "--请选择--",
                compareValueTypes: [
                    { text: "动态值", value: "dynamic" },
                    { text: "固定值", value: "static" }
                ],
                operationTypes: [
                    { text: "等于", value: "equal", visible: true },
                    { text: "累加", value: "addUp", visible: false },
                    { text: "扣减", value: "minusDown", visible: false }
                ],
                filteredCurrentSheetFieldsRootNode: Object.assign({}, this.currentSheetFieldsRootNode)
            };
        },
        mounted: function(){
            var that = this;

            $(".operation-item .simple-editor-dropdown").each(function(){
                var $elem = $(this);
                if($elem.data("DropDownList")) return;

                var width = $elem.width();
                $elem.DropDownList({ Width: width });
                $elem.change(function(event){
                    var type = $(this).data("valueType");
                    that.operation[type] = event.target.value;
                });
            });
        },
        watch: {
            operation: function(val, oldVal){
                var that = this;

                this.operationTypes[1].visible = val.targetFieldIsNumber;
                this.operationTypes[2].visible = val.targetFieldIsNumber;

                this.$nextTick(function(){
                    if(val.compareValueType == "static"){
                        let newAssignVal = val.assignValue;
                        if(val.targetFieldIsNumber){
                            $("#assignValue" + that.operationIndex).val(newAssignVal);
                        } else {
                            newAssignVal = newAssignVal == "" ? "" : newAssignVal.substr(1, newAssignVal.length - 2)
                            $("#assignValue" + that.operationIndex).val(newAssignVal);
                        }
                    }
                    
                    $("#operationType" + that.operationIndex).val(val.operationType);
                    $("#compareValueType" + that.operationIndex).val(val.compareValueType);
                    $("#operationItemWrapper .simple-editor-dropdown").DropDownList("Refresh");
                });
            }
        },
        methods: {
            hideAllTreeViewDropdown: function(){
                $(".formular-editor .dropdownlist").siblings("ul").hide();
            },
            assignValueKeypressHandler: function(event){
                if(this.operation.targetFieldIsNumber){
                    let keyCode = event.which || event.keyCode;
                    let keyChar = String.fromCharCode(keyCode);
                    let regExp = /[0-9]|\./g;

                    if(!regExp.test(keyChar)){
                        event.preventDefault();
                        return false;
                    }
                } 
            },
            assignValueInputHandler: function(event){
                if(this.operation.targetFieldIsNumber){
                    this.operation.assignValue = event.target.value;
                }else{
                    this.operation.assignValue = '"' + event.target.value + '"';
                }
            },
            itemRemoveHandler: function(oIndex){
                this.$emit("remove", oIndex);
            },
            refreshOperationTypeDropdown: function(isNumeric){
                var that = this;
                this.operationTypes[1].visible = isNumeric;
                this.operationTypes[2].visible = isNumeric;

                this.$nextTick(function(){
                    $(".operation-item .simple-editor-dropdown").DropDownList("Refresh");
                });
            },
            filterOutCurrentSheetFieldsRootNode: function(selectedDataType, selectedNodeType, selectedNodeName){
                var currentSheetFields = this.currentSheetFieldsRootNode.Childrens;
                var fieldLength = currentSheetFields.length;
                this.filteredCurrentSheetFieldsRootNode.Childrens = [];

                for(var i = 0; i < fieldLength; i++){
                    if(currentSheetFields[i].DataType == selectedDataType ||
                       (selectedNodeType == "Association" && currentSheetFields[i].Name == "ObjectId") ||
                       selectedNodeName == "ObjectId" && currentSheetFields[i].UnitType == "Association" ||
                       selectedNodeName == "ParentObjectId" && currentSheetFields[i].UnitType == "Association"){
                        this.filteredCurrentSheetFieldsRootNode.Childrens.push(currentSheetFields[i]);
                    }
                }
            },
            treeViewNodeClickHandler: function(checkedNode, treeViewInstance){
                if(checkedNode.UnitType != "Field" && checkedNode.UnitType != "Association"){
                    return {
                        goAhead: true
                    };
                }
                
                let dataType = checkedNode.DataType;
                let isNumeric = dataType && (dataType == $.BizDataType.Double || dataType == $.BizDataType.Int || dataType == $.BizDataType.Long);
                this.refreshOperationTypeDropdown(isNumeric);

                var treeRoot = treeViewInstance;
                var names = [];
                var values = [];
                while(treeRoot.level && treeRoot.level !== 0){
                    names.unshift(treeRoot.node.Name);
                    values.unshift(treeRoot.node.ObjectId);
                    treeRoot = treeRoot.$parent;
                }
                var rootNode = treeRoot.node;

                if(rootNode == this.targetSheetFieldsRootNode){
                    let nodeType = checkedNode.UnitType;
                    this.operation.assignValueText = "";
                    this.operation.assignValue = "";
                    this.filterOutCurrentSheetFieldsRootNode(dataType, nodeType, checkedNode.Name);
                    this.operation.targetFieldIsNumber = isNumeric;
                    values.unshift(rootNode.ObjectId);
                    this.operation.targetField = values.join(".");
                    this.operation.targetFieldText = names.join(".");
                } else if (rootNode == this.filteredCurrentSheetFieldsRootNode){
                    this.operation.assignValueText = names.join(".");
                    this.operation.assignValue = values.join(".");
                }
                this.hideAllTreeViewDropdown();

                return {
                    goAhead: false
                };
            }
        }
    };
</script>
<style>
.drop-sele
    .dropdownlist
        width:100%;
    ul
        &>li
            padding-left:6px !important;
    .word
        top: -9px !important;
        margin: 0 1px !important;
    input.inputSheet
        border: 1px solid #e1e1e1;
        height: 30px;
        position: relative;
        top: -10px;
        border-radius: 2px;
        padding-left: 4px;
        width:170px;
    .action 
        position:absolute;
        top:50%;
        right:0px;
        margin-top:-10px;
        font-size : 16px;
        cursor:pointer;
.tree-dropdown-content{
    display: block;
    width: 100%;
    border: 1px solid #e1e1e1;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
}

input[type=text]:focus{
    border: 1px solid #2d7fff !important;
    box-shadow: none !important;
    outline: none !important;
}
</style>


// WEBPACK FOOTER //
// src/components/console/business-rule/formular-simple-editor/operation-item.vue