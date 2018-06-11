<style lang="less" scoped>
    .render-container{
        padding: 20px;
    }
</style>

<template>
    <div  class="render-container">
        <h3 slot="title"></h3>
        <RenderDev style="margin-top: 50px;" :soul="soul"></RenderDev>
        <!-- <Button @click="result(soul.children)" type="primary">check</Button> -->
    </div>
</template>


<script>
    import { getRichPage } from '../../../resource/assemble_resource.js';
    import { parse } from '../../../util/assist.js';
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default{
        name: 'addNewApp',
        computed: {
            ...mapGetters('dragModule', ['soul']),
        },
        methods:{
            ...mapMutations('dragModule', ['setSoul']),
            result(param){
                this.currentData=[]
            },
            getAppPage() {
                console.log(this.value.pagesoul);
                this.setSoul(parse(this.value.pagesoul));
            }
        },
        data(){
            return {
                pageName:'',
                currentData:[],
                currentList:'',
            }
        },

        props:[
            'value'
        ],
        mounted(){
            this.getAppPage();
            // getRichPage.call(this, this.$route.query.pageSoulId, (data) => {
            //     this.pageName = data.name
            //     let ancestorSoul = parse(data.pageSoul)
            //     this.setSoul(ancestorSoul)
            // })
        }
    }





</script>

<style lang="less" scoped>
  .render-container{
    padding: 20px;
  }
</style>
