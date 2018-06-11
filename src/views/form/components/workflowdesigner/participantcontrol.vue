<template>
    <div>
        <div class="layout">
            <div>
                <ul>
                    <li class="item" v-for="variable in controls" v-if="variable.Name" @click="toggleVariable(variable)" :key="variable.Name">
                        <span class="icon-control" style="color: #2d7fff;"></span>
                        <span class="node-name">{{variable.DisplayName}}</span>
                        <div class="chk-contanier" >
                            <Checkbox v-model="variable.Active" v-if="checkMode!=1" @on-change="toggleCheck(variable)"></Checkbox>
                            <Radio v-model="variable.Active" v-if="checkMode==1" @on-change="toggleCheck(variable)"></Radio>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>
<script>
    import {Checkbox,Radio} from 'iview';
    import {NodeType,CheckMode} from '../../config/const';
    export default {
        name:'participantcntrol',
        data(){
            return {
                controls:[]
            }
        },
        components: {
            Checkbox,
            Radio
        },
        created(){
            var that=this;
            // this.$root.eventHub.$on('removeControlFromResultSet',function(node){
            //     that.removeSelected(node);
            // });
        },
        props:[
            'checkMode',
            'source',
            'nameSpace'
        ],
        methods: {
            toggleVariable(variable){
                if(this.checkMode===1 && !variable.Active){
                    for(let control of this.controls){
                        if(control.Active){
                            this.$set(control,'Active',false);
                            break;
                        }
                    }
                }
                variable.Active=!variable.Active;
                this.toggleCheck(variable);
            },
            toggleCheck(node){
                if(node.Active){
                    if(this.nameSpace==="MANAGER-Control"){
                        this.$store.state.participant.ManagerNode=null;
                        let tmp={
                            Formula:'MANAGEROF('+node.Name+')',
                            DisplayName:'MANAGEROF('+node.DisplayName+')',
                            NodeType: NodeType.Function
                        };
                        this.$store.state.participant.ManagerNode=tmp;
                    }else if(this.nameSpace==='STEPMANAGER-Control'){
                        node.NodeType=NodeType.Variables;
                        this.$store.state.participant.StepManagerNode=node;
                    }else if(this.nameSpace === "SEARCHROLE-Control"){
                        node.NodeType=NodeType.Variables;
                        this.$store.state.participant.RoleSearchNode=node;
                    }else{
                        node.NodeType=NodeType.Variables;
                        this.$store.commit('participant/addSelect',node);
                    }
                   
                }else{
                    if(this.nameSpace ==='MANAGER-Control'){
                        this.$store.state.participant.ManagerNode=null;
                    }else if(this.nameSpace==='STEPMANAGER-Control'){
                        this.$store.state.participant.StepManagerNode=null;
                    }else if(this.nameSpace==='SEARCHROLE-Control'){
                        this.$store.state.participant.RoleSearchNode=null;
                    }else{
                        node.NodeType=NodeType.Variables;
                        this.$store.commit('participant/removeSelect',node);
                    }
                }
            },
            removeSelected(node){
                for(let control of this.controls){
                    if(control.Name===node.Name){
                        control.Active=false;
                        return;
                    }
                }
            }
        },
        watch:{
            aa(val){
                if(val && val.length>0){
                    let controls=val;
                    for(let control of controls){
                        control.Active=false;
                    }
                    this.controls=$.extend(true,[],controls);
                }
            }
        },
        computed:{
            aa: function(){
                return this.source;
            }
        }
    }
</script>
<style lang="less" scoped>
    .layout {
        width:100%;
        height:218px;
        overflow-y: scroll;
        ul li{
            display: block;
            position: relative;
            padding-left: 10px;
            padding-top: 2px;
            padding-bottom: 2px;
            div.chk-contanier{
                position: absolute;
                right: 20px;
                top: 0;
            }
            cursor: pointer;
            &:hover{
                background-color: #e8f4fe;    
            }
        }
        
    }
    
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/participantcontrol.vue