<template>
    <div class="c-main" :class="{ isExpanded: fullscreen }">
        <Col :dbname="dbname"/>
        <Tooltip />
        <Masking />
        <Input :dbname="dbname" />
        <Output :dbname="dbname" />
    </div>
</template>

<script>
import Col from "../components/Col.vue";
import Tooltip from "../components/Tooltip.vue";
import Masking from "../components/Masking.vue";
import Input from "../components/Input.vue";
import Output from "../components/Output.vue";
import localforage from "localforage";

export default {
    name: "Notebook",
    data : function (){
        return {
            dbname : this.$route.name
        }
    },
    computed: {
        fullscreen: function() {
            return this.$store.state.fullscreen;
        },
        dbdata : function (){
            return this.$store.getters.getDB(this.$route.name)
        }
    },
    created: function() {
        this.initDB()
    },
    watch: {
        $route: function(to, from) {
            this.dbname = this.$route.name
        },
        dbdata : { 
            handler : function (newdata){
                let version = new Date().getTime()
                this.dbdata.version = version
                //console.log(version)

                // if(this.$root.config.editDevonly && !this.$store.state.isDev) return
                // this.syncIDB(this.dbname,this.dbdata)
            },
            deep: true,
        }
    },
    mounted : function (){
        this.localGroup(this.$route.name)
    },
    methods: {
        initDB : function (){

            if(this.$root.config.editDevonly && !this.$store.state.isDev) return
            let dbname = this.dbname
            let dbdata = this.dbdata

            //Try to query db from IndexedDB
            localforage.getItem(dbname).then((IndexeddbData) => {

                if(IndexeddbData.version && IndexeddbData.version > dbdata.version){
                    let op = prompt(this.$root.lang.dbSelectQuestion,'y')
                    if(op == 'y'){
                        this.syncStore(dbname,IndexeddbData)
                        console.log(this.$root.lang.dbFromMsg)
                    }else{
                        this.syncIDB(dbname, dbdata)
                    }
                }else{
                    this.syncIDB(dbname, dbdata)
                }

            }).catch((err) => {
                console.warn(err)
            })

        },
        syncStore : function (dbname,dbdata){
            this.$store.commit('setDB',{
                name : dbname,
                data : dbdata
            })
        },
        syncIDB : function (dbname,dbdata){
            localforage.setItem(dbname,dbdata).then((idb)=> {
                console.log(this.$root.lang.dbSyncMsg);
            }).catch(function(err) {
                console.warn(err);
            });
        },
        localGroup : function (routename){
            let navs = this.$store.state.navs
            for (let i=0;i<navs.length;i++){
                let _temp = navs[i]
                if(_temp.name.toLowerCase() == routename){
                    this.$store.commit('changeGroup',_temp.group)
                    break;
                }
            }
        }
    },
    components: {
        Tooltip,
        Input,
        Output,
        Masking,
        Col
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";
@import '../assets/css/snippet.less';
.c-main {
    margin-left: @sidebar-width;
    transition: 0.5s ease-in-out;
    &.isExpanded {
        margin-left: 0;
    }

    padding: 10px;
}
@media screen and (max-width:@phone){
    .c-main{
        margin-left:0 !important;
    }
}
.c-main-primary {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
@media screen and (max-width:@phone){
    .c-main-primary{
        display: block;
    }
}
</style>
