<template>
  <div  class="render-container">
    <h3 slot="title">{{pageName}}</h3>
    <RenderDev style="margin-top: 50px;" :soul="soul"></RenderDev>
    <Button @click="result(soul.children)" type="primary">check</Button>
  </div>
</template>
<script>
  import {
    getRichPage
  } from '../../resource/assemble_resource'
  import{
      parse
  }from'../../util/assist'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default{
    computed: {
      ...mapGetters('dragModule', ['soul']),
    },
    methods:{
      ...mapMutations('dragModule', ['setSoul']),
      result(param){
        this.currentData=[]
        this.check(param);
      },
      check(param){
          console.log(param);
          for(var index in param){
                if(param[index].type=='Div'||param[index].type=='Row'||param[index].type=='Col'){
                    this.check(param[index].children);
                }
                else{
                    this.anaData(param[index]);
                }
          }
      },
      anaData(param){

        if(param.type=='FormCheckbox'){
           let currentChoose = param.model.value.value;
           let retChoose = []
           for(var i in param.model.items.value){
             if(currentChoose.indexOf(param.model.items.value[i].value)!==-1){
                retChoose.push(param.model.items.value[i].label)
             }
           }
           var tmp={};
           tmp[param.model.label.value]=retChoose;
           this.currentData.push(tmp);
        }
        else{
           var tmp={};
           tmp[param.model.label.value]=param.model.value.value
           this.currentData.push(tmp);
        }

      }
    },
    data(){
        return {
          pageName:'',
          currentData:[],
          currentList:'',
        }
    },

    mounted(){
      getRichPage.call(this, this.$route.query.pageSoulId, (data) => {
        this.pageName = data.name
        let ancestorSoul = parse(data.pageSoul)
        this.setSoul(ancestorSoul)
      })
    }
  }
</script>
<style lang="less" scoped>
  .render-container{
    padding: 20px;
  }
</style>
