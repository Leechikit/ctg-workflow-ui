
<style>
.key {
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  text-align: center;
}

.bubbly-button {
  font-family: 'Helvetica', 'Arial', sans-serif;
  display: inline-block;
  font-size: 1em;
  padding: 1em 2em;
  margin-top: 100px;
  margin-bottom: 60px;
  -webkit-appearance: none;
  appearance: none;
  background-color: #ff0081;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
}
.bubbly-button:focus {
  outline: 0;
}
.bubbly-button:before, .bubbly-button:after {
  position: absolute;
  content: '';
  display: block;
  width: 140%;
  height: 100%;
  left: -20%;
  z-index: -1000;
  transition: all ease-in-out 0.5s;
  background-repeat: no-repeat;
}
.bubbly-button:before {
  display: none;
  top: -75%;
  background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 20%, #ff0081 20%, transparent 30%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
}
.bubbly-button:after {
  display: none;
  bottom: -75%;
  background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
}
.bubbly-button:active {
  transform: scale(0.9);
  background-color: #e60074;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
}
.bubbly-button.animate:before {
  display: block;
  animation: topBubbles ease-in-out 0.75s forwards;
}
.bubbly-button.animate:after {
  display: block;
  animation: bottomBubbles ease-in-out 0.75s forwards;
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}
@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}

.menuPanel{
    display: block;
    list-style-type: disc;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}

.dragItem{
    font-size: 12px;
    display: block;
    width: 45%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 2px;
    color: #333;
}

#myflow_tools{
  position: fixed; top: 200px; left: 80px; background-color: #fff; width: 70px; cursor: default; padding: 3px;
}

#myflow_props{
  position: fixed; top: 30; right: 50; background-color: #fff; width: 220px; padding: 3px;
}
#myflow_props table {
  
}

#myflow_props th {
  letter-spacing: 2px;
  text-align: left;
  padding: 6px;
  background: #ddd;
}

#myflow_props td {
  background: #fff;
  padding: 6px;
}

</style>

<template>
        <div>


            <div>
              <Menu class="action_bar" @on-select="action" mode="horizontal" theme="dark" active-name="1">
                <div class="index-layout-nav">
                  <MenuItem name="4">
                    <Icon type="code"></Icon>
                    流程
                  </MenuItem>
                  <MenuItem name="5">
                    <Icon type="wrench"></Icon>
                    布局
                  </MenuItem>
                  <MenuItem name="3">
                    <Icon type="ios-eye"></Icon>
                    预览
                  </MenuItem>
                </div>
              </Menu>
              <div class="index-layout-content"  v-show="!flowflag">
                
                  <div style="width:15%;float:left">                    
                    <transition name="index-soul-control-class-fade" >
                      <div>
                        <Collapse v-model="open" :key="classIndex" v-for="(controlClass, classIndex) in controlClazzes">
                          <Panel :name="classIndex+1+''" class="menuPanel">
                            {{controlClass.name}}
                            <p slot="content" class="index-layout-content__class">
                              <Control class="dragItem"
                                v-for="(control,controlIndex) in controlClass.controls"
                                :controlConfig="control"
                                :key="controlIndex">
                                <div slot="preview">
                                  <MenuItem
                                    :name="classIndex + '-' + controlIndex">{{control.name}}
                                  </MenuItem>
                                </div>
                              </Control>
                            </p>
                          </Panel>
                        </Collapse>
                      </div>
                    </transition>

                  </div>


                  <div style="width:65%;float:left;" class="middle" :class="{'is-preview':isPreview}">
                    <RenderDev  v-bind:style=styles v-if="!showCode" :soul="soul"></RenderDev>
                    <pre contenteditable="true" v-else v-highlightjs="vueCode" class="code" id="code"><code></code>
                      </pre>
                    <Button v-if="showCode"
                            @click="copyCode"
                            type="ghost"
                            size="small"
                            style="position: absolute;right: 0;top: 0;opacity:0.9;margin-right: 20px;margin-top: 12px">
                      <Icon type="ios-copy-outline"></Icon>
                      copy
                    </Button>
                  </div>

                  <div style="width:20%;float:left">
                    <ModelEditor
                      :pageName="opModel.name"
                      :editSoul="editSoul">
                    </ModelEditor>
                  </div>


      
              </div>

              <Modal
                :mask-closable="false"
                v-model="showConfirmPageNameModal"
                title="confirmPageName"
                @on-ok="okPageName">
                <i-form :label-width="100">
                  <FormItem label="PageName">
                    <i-input v-model="opModel.name" @keyup.13.native="okPageName"></i-input>
                  </FormItem>
                </i-form>
              </Modal>

<!--               <Modal
                style="width: 600px"
                :mask-closable="false"
                v-model="showEditScriptModal"
                title="script">
                <div slot="footer">
                </div>
                <CodeEditor
                  :editorStyle="editorStyle"
                  :code="editControlSoul.scriptString"
                  @save="saveCode">
                </CodeEditor>
              </Modal> -->

              <div class="edit_layer" :style="editLayer.style">
                {{editLayer.name}}
              </div>

              <div class="rightClickMenu" :style="rightClickMenu.style">
                <Dropdown trigger="custom" visible>
                  <DropdownMenu slot="list">
                    <DropdownItem @click.native="editControl">editScript</DropdownItem>
                    <DropdownItem @click.native="deleteControl">delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <textarea id="copy" style="width: 1px;height: 1px;border: 0;outline:0"/>
            </div>
            <div v-show="flowflag" style="height:1000px">
                <!-- <div class="key">
                    <button class="bubbly-button" v-if="createFlag" @click="create">点击创建</button>
                </div>
                <span v-if="createFlag"  style="margin-left:42%">开启表单流程，设置流转条件搭建工作流</span> -->
                <div style="height:100%"> 
                  <iframe   src="" name="frm1" id="iframe1" scrolling="no" frameborder="0" height="100%" width="100%"  ></iframe>
                </div>
           </div>
         </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import store from '../../../store'
  import {findSoulByCid, findSoulByUidDown, resetUid, generateUid, findSoulByCTypeUp} from '../../../helper/soul_helper'
  import {makeControl, addRenderFn} from '../../../helper/code_helper'
  import{undo, redo, clear, init, saveSoul, resetSnapShot}from '../../../core/assemble'
  import {copyProperties, stringify, parse, deepCopy, jsCopy}from '../../../util/assist'
  import {getControlList} from  '../../../resource/develop_resource'
  import {resetSoul, reset} from  '../../../core/lifecycle'


  import {
    addPage,
    delPage,
    updatePage,
    getPageList,
    getTablePageList,
    getRichPage,
    getAppList
  } from '../../../resource/assemble_resource'
  import {walkSoul} from '../../../helper/soul_helper'
  import HTTP from '../../../api/work-flow.js';
  import APP from '../../../api/app-apply.js';
  import{
    interceptDrop
  }from '../../../core/dnd'

  // expMyflow();
  export default {
    name: 'AssemblePage',
    data(){
      return {
        open: ['1','2','3','4'],
        isPreview: true,
        showConfirmPageNameModal: false,
        showEditScriptModal: false,
        minHeight:400,
        opModel: {},
        editControlSoul: {scriptString: ''},
        pageSoulId: '',
        flowflag:false,
        appId: '',
        editorStyle: {height: '400px'},
        createFlag:true,
        modelId:"",
        iframeFlag:true,
      }
    },
    computed: {
      ...mapGetters('userModule', ['me']),
      ...mapGetters('dragModule', ['soul', 'editLayer', 'rightClickMenu',
        'draggableControls', 'editSoul', 'controlClazzes', 'vueCode', 'showCode']),
      styles:function(){ 
        if(this.soul!==null){
            var ret = {height:(120*this.soul.children.length+400)+'px'};
            return ret
        }
        else{
          // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        }
        
      }

    },
    methods: {
      ...mapMutations('dragModule', ['setSoul', 'clear', 'setDraggableControls', 'setShowCode']),
      ...mapActions('dragModule', ['getControlClazzes']),
      copyCode(){
        jsCopy('copy', this.vueCode)
        this.$Message.success('copied')
      },
      create(){   
        // addPage.call(this);
        // $('#iframe1').attr('src','/src/views/esview/assemble/myflow/demo.html?modelId='+res.modelId); 

        //         this.createFlag=false;

        //       }
        //       else{
        //         this.$Message.error('创建失败')
        //       }
              
        //     })
        //     .catch(err => {
        //         console.log(err);
        //        this.$Message.error('This is an error')
        //     }).finally(()=>{
        //         this.getLoading=false;
        //     })
      },
      deleteControl(){
        this.editControlSoul = findSoulByUidDown(this.rightClickMenu.uid, this.soul)
        let pSoul = findSoulByUidDown(this.editControlSoul.pid, this.soul);
        if (pSoul) {
          let index = pSoul.children.indexOf(this.editControlSoul);
          pSoul.children.splice(index, 1)
        }
        this.clear()
        saveSoul();
	addPage.call(this);
      },
      editControl(){
        this.editControlSoul = findSoulByUidDown(this.rightClickMenu.uid, this.soul)
        this.editControlSoul.scriptString = this.editControlSoul.script.toString()
        this.clear()
        this.showEditScriptModal = true
      },
      saveCode(code){
        this.editControlSoul.scriptString = code
        this.editControlSoul.script = eval('(function () { \r\n return ' + code + '})()')
        this.showEditScriptModal = false
        reset(this.editControlSoul)
      },
      okPageName(){
        addPage.call(this)
      },
      action(a){
        if (a === '3') {
          //toggle preview
          this.isPreview = !this.isPreview

        } else if (a === '4') {
    
          addPage.call(this);
          if(this.iframeFlag){ 
            $('#iframe1').attr('src','/src/views/esview/assemble/myflow/demo.html?modelId='+this.$route.params.modelId+'&appId='+this.$route.params.pageSoulId);
            this.iframeFlag = false;
          }
          this.flowflag=true;
        } else if (a === '5') {
          //this.setShowCode(false)
          this.flowflag=false;

        } else if (a === '6') {
          //save changes of page
          if (!this.opModel.id) {
            this.showConfirmPageNameModal = true
          } else {
            updatePage.call(this)
          }

        } else if (a === '9') {
          undo()

        } else if (a === '12') {
          redo()
        }
      }
    },
    mounted(){
      this.clear()
      window.location.hash = deepCopy(window.location.hash);
      this.getControlClazzes()
      resetSnapShot()
      
      this.pageSoulId = this.$route.params.pageSoulId
      this.moduleId =this.$route.params.moduleId;
      sessionStorage.setItem("moduleId",JSON.stringify(this.moduleId));
      this.$route.params.modelId;

      this.setSoul(null);
      this.clear()

      getControlList.call(this, (data) => {

        let draggableControls = []

        data.forEach(origin => {
          let control = makeControl(origin.code);
          control.clazzId = origin.clazzId
          draggableControls.push(control)
        })

        //classify draggableControls
        let map = {}
        draggableControls.forEach(item => {
          if (!map[item.clazzId]) {
            map[item.clazzId] = []
          }
          map[item.clazzId].push(item)
        })
        this.controlClazzes.forEach(clazz => {
          let controls = map[clazz.id]
          if (controls) {
            clazz.controls = controls
          }
        })
        //store draggableControls
        this.setDraggableControls(draggableControls)

        if (!this.pageSoulId) {
          //when add new page
          init(draggableControls)
          saveSoul()
        } else {
          //when update page
          // APP.getPageSoul.(this, this.pageSoulId, (data) => {
          //   this.opModel = data.modelId;
          //   this.createFlag=false;
          //   let ancestorSoul = parse(data.pagesoul);
          //   addRenderFn(ancestorSoul)
          //   resetUid(ancestorSoul.maxUid)
          //   saveSoul()
          //   this.setSoul(ancestorSoul)
          //   walkSoul(ancestorSoul, (soul) => {
          //     resetSoul(soul)
          //   })
          // })


           APP.getPageSoul(this.pageSoulId)
            .then(data => {
              if(data){
                 this.opModel = data;
                this.createFlag=false;
                let ancestorSoul = parse(data.pagesoul);
                addRenderFn(ancestorSoul)
                resetUid(ancestorSoul.maxUid)
                saveSoul()
                this.setSoul(ancestorSoul)
                walkSoul(ancestorSoul, (soul) => {
                  resetSoul(soul)
                })
              }
              else{
                this.$Message.error('无法打开对应应用')
              }
              
            })
            .catch(err => {
                console.log(err);
               this.$Message.error('This is an error')
            }).finally(()=>{
            })


        }
        this.setShowCode(false)
      })
    }
  }

  var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };

  var classname = document.getElementsByClassName("bubbly-button");

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
  } 



</script>

<style scoped>
  .middle {
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    min-height: 948px;
    overflow-y: auto;
    position: relative;
    min-height: 1000px;
    z-index: 0;
    padding-top: 20px;
    padding-bottom: 100px;
  }

  .code {
    height: 1000px;
    margin: 20px 20px 100px 20px;
  }

  .edit_layer {
    display: none;
    opacity: 0.5;
    background: #eee;
    border: 1px dashed #999;
    pointer-events: none;
    z-index: 10000;
    position: fixed;
  }

  .rightClickMenu {
    display: none;
    z-index: 10001;
    position: fixed;
  }

  .index-layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .index-layout-nav {
    width: 800px;
    margin: 0 auto;
    margin-left:80%;
  }

  .index-layout-content {
    min-height: 100px;
    overflow: hidden;
    background: #fff;
  }

  .action_bar {
    position: sticky;
    line-height: 3.5;
    top: 0;
    height: 50px;
    width: 100%;
  }

  .index-soul-control-class-fade-enter, .soul-control-class-fade-leave-active {
    opacity: 0;
  }
</style>
