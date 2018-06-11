<template>
    <div>
        <div class="search">
            <input type="text"style="width: 100%;padding-left: 18px;height: 34px;border: none;" v-model="keyword" placeholder='搜索部门' @input="searchOrg()"/>
            <span style="position: absolute;right: 18px;top: 10px;" v-show="!keyword"><Icon type="ios-search-strong"></Icon></span>
            <span style="position: absolute;right: 18px;top: 10px;"  v-show="keyword" @click="resetOrgSearch()"><Icon type="ios-search-strong"></Icon></span>
        </div>
        <div class="depart-layout" v-show="!keyword">
            <div style="width:100%;height:100%;overflow: auto;">
                <ul style="overflow:scroll">
                    <treeview :node="root" :root="root" :can-select="canSelect" :level="level" :check-mode="checkMode" :name-space="nameSpace" :load-data="getChildDepartments" ></treeview>                    
                </ul>
            </div>
            
        </div>
        <div class="search-container" v-show="keyword">
            <ul>
                <li v-for="(org,index) in searchedResults" @click="toggleDepartment(org,index)" :key="org.id">
                    <span class="icon-zhuzi"  style="color:#2d7fff;"></span>
                    <span class="node-name" @click="toggleCheck(role,8)">{{org.name}}</span>
                    <div class="chk-contanier" >
                        <Checkbox v-model="org.Active" v-if="checkMode!=1" @on-change="toggleCheck(org,2)"></Checkbox>
                        <Radio v-model="org.Active" v-if="checkMode==1" @on-change="toggleCheck(org,2)"></Radio>                        
                    </div>
                </li>
            </ul>
            
        </div>
    </div>
</template>
<script>
    import {Checkbox,Radio} from 'iview';
    import treeview from './treeview';
    import {FilterOrgs,GetChildDepartment} from '../../service/getData';
    import {NodeType,CheckMode,UnitType} from '../../config/const';
    export default {
        name:'department',
        data(){
            return {
                keyword: null,
                searchedResults:[],
                canSelect:true,
                level: 0,
                paramObj:{result:false}
                
            }
        },
        components:{
            treeview,
            Checkbox,
            Radio
        },
        props:[
            'checkMode',
            'nameSpace',
            'root'
        ],
        created(){
            var that=this;
            this.$root.eventHub.$on('expand.'+this.nameSpace,async function(node,vm){
                console.log(node);
                if(node.IsExpanded){
                    node.IsExpanded=false;
                }else{
                    if(!node.Childrens || node.Childrens.length===0){
                       await that.getChildDepartments(node);
                       vm.$set(vm.node,'Childrens',node.Childrens);
                       vm.$set(vm.node,'IsExpanded',node.IsExpanded);
                       console.log(vm.node);
                    }else{
                        node.IsExpanded=true;
                    } 
                }
                
            });
            this.$root.eventHub.$on('check.'+this.nameSpace,function(node,vm){
                console.log(that.nameSpace);
                if(node.Active){
                    //node.Active=true;
                    if(that.nameSpace==="MANAGER-Department"){
                        
                        let tmp=null;
                        if(node.id){
                            tmp={
                                Formula:'MANAGEROF(u('+node.id+'))',
                                DisplayName:'MANAGEROF('+node.Name+')',
                                NodeType: NodeType.Function
                            }
                            
                        }else{
                            tmp={
                                Formula:'MANAGEROF('+node.Name+')',
                                DisplayName:'MANAGEROF('+node.DisplayName+')',
                                NodeType: NodeType.Function
                            }
                        }
                        that.$store.state.participant.ManagerNode=tmp;
                    }else if(that.nameSpace==="STEPMANAGER-Department"){
                        node.NodeType=NodeType.Unit;
                        that.$store.state.participant.StepManagerNode=node;
                    }else if(that.nameSpace === "SEARCHROLE-Department"){
                        node.NodeType=NodeType.Unit;
                        that.$store.state.participant.RoleSearchNode=node;
                    }else{
                        node.NodeType=NodeType.Unit;
                        if(node.id===that.$store.state.participant.RootNode.id){
                            node.UnitType=1;
                        }else{
                            node.UnitType=2;
                        }
                        that.$store.commit('participant/addSelect',node);
                    }
                }else{
                    if(that.nameSpace ==='MANAGER-Department'){
                        that.$store.state.participant.ManagerNode=null;
                    }else if(that.nameSpace==='STEPMANAGER-Department'){
                        that.$store.state.participant.StepManagerNode=null;
                    }else if(that.nameSpace==='SEARCHROLE-Department'){
                        that.$store.state.participant.RoleSearchNode=null;
                    }else{
                        node.NodeType=NodeType.Unit;
                        if(node.id===that.$store.state.participant.RootNode.id){
                            node.UnitType=1;
                        }else{
                            node.UnitType=2;
                        }
                        that.$store.commit('participant/removeSelect',node);
                    }
                }
            });

            this.$root.eventHub.$on('removeDepartmentFromResultSet',function(node){
                if(that.root){
                    that.recursionRemove(that.root,node);
                    that.removeSearchSelect(node);
                }
                
            });

            this.$root.eventHub.$on('hide.department',function(){
                that.keyword="";
            })
        },
        methods:{
            
            async filterOrgs(start,length,keyword){
                let res=await FilterOrgs(start,length,keyword);
                if(res.Successful){
                    this.searchedResults=res.ReturnData.aaData;
                }
            },
            async getChildDepartments(node){
                let res=await GetChildDepartment(node.id);
                if(res.code == 0){
                    // node.Childrens=res.page.result;
                    // this.$root.eventHub.$emit('loadData'+this.nameSpace,res.page.result)
                    return res.page.result;
                }
            },
            searchOrg(){
                if(!this.keyword){
                    return;
                }
                this.filterOrgs(0,10,this.keyword);
            },
            resetOrgSearch(){
                this.keyword=null;
            },
            setChildrenInActive(parent,obj){
                if(parent.Active){
                    obj.result=true;
                    this.$set(parent,'Active',false);
                }else{
                    if(parent.Childrens && parent.Childrens.length>0){
                        for(var i=0,len=parent.Childrens.length;i<len && !obj.result;i++){
                            this.setChildrenInActive(parent.Childrens[i],obj);
                        }
                    }
                }
            } ,
            toggleDepartment(org,index){
                if(this.checkMode===1 && !org.Active){
                    //单选模式
                    for(let node of this.searchedResults){
                        if(node.Active){
                            this.$set(node,'Active',false);
                            break;
                        }
                    }
                    this.paramObj.result=false;
                    this.setChildrenInActive(this.root,this.paramObj);
                }
                this.$set(org,'Active',!org.Active);
                
                this.toggleCheck(org,2);
            },
            toggleCheck(node,unitType){
                var that = this;
                if(node.Active){
                    if(this.nameSpace==="MANAGER"){
                        let tmp=null;
                        if(node.id){
                            tmp={
                                Formula:'MANAGEROF(u('+node.id+'))',
                                DisplayName:'MANAGEROF('+node.Name+')',
                                NodeType: NodeType.Function
                            }
                            
                        }else{
                            tmp={
                                Formula:'MANAGEROF('+node.Name+')',
                                DisplayName:'MANAGEROF('+node.DisplayName+')',
                                NodeType: NodeType.Function
                            }
                        }
                        this.$store.state.participant.ManagerNode=tmp;
                    }else if(that.nameSpace==="STEPMANAGER"){
                        node.NodeType=NodeType.Unit;
                        this.$store.state.participant.StepManagerNode=node;
                    }else if(that.nameSpace === "SEARCHROLE"){
                        node.NodeType=NodeType.Unit;
                        this.$store.state.participant.RoleSearchNode=node;
                    }else{
                        node.NodeType=NodeType.Unit;
                        node.UnitType=unitType;
                        this.$store.commit('participant/addSelect',node);
                    }
                    
                }else{
                    if(this.nameSpace ==='MANAGER'){
                        this.$store.state.participant.ManagerNode=null;
                    }else if(this.nameSpace==='STEPMANAGER'){
                        this.$store.state.participant.StepManagerNode=null;
                    }else if(this.nameSpace==='SEARCHROLE'){
                        this.$store.state.participant.RoleSearchNode=null;
                    }else{
                        node.NodeType=NodeType.Unit;
                        node.UnitType=unitType;
                        this.$store.commit('participant/removeSelect',node);
                    }
                    
                }
            },
            recursionRemove(parent,node){
                if(node.id===parent.id){
                    parent.Active=false;
                    return;
                }
                if(parent.Childrens){
                    for(let child of parent.Childrens){
                        this.recursionRemove(child,node);
                    }
                }
                
            },
            removeSearchSelect(node){
                for(let sl of this.searchedResults){
                    if(sl.id === node.id){
                        sl.Active=false;
                        return;
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
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
    }
    div.search-container{
        overflow: auto;
    }
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/department.vue