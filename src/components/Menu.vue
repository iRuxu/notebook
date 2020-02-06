<template>
    <ul class="c-header-menu" :class="{on:$store.state.topMenuShow}">
        <li
            v-for="(item, index) in menu"
            :key="item.name" 
            :class="{ active: index == activeIndex}"
        >
            <a :href="item.url" target="_blank" @click="menuEvent($event,item,index)">{{ item.name }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Menu",
    data : function (){
        return {
            menu : this.$store.state.menu || [{name:'Home',url:"/"}],
            activeIndex : 0
        }
    },
    computed : {
        greetingRoutes : function (){
            if(!this.$store.state.group){
                return []
            }else{
                let _map = {}
                this.$store.state.menu.forEach(function (menu,i){
                    if(menu.groupname) _map[menu.groupname] = ''
                })
                for(let group in _map){
                    for(let j=0;j<this.$store.state.nav.length;j++){
                        if(this.$store.state.nav[j]['group'] == group){
                            _map[group] = this.$store.state.nav[j]['name'].toLowerCase()
                            break
                        }
                    }
                }
                return _map
            }
            
        },
    },
    methods : {
        menuEvent : function (e,item,index){
            if(!item.url){
                e.preventDefault()
                this.$store.commit('changeGroup',item.groupname)
                this.activeIndex = index
                this.$router.push({name:this.greetingRoutes[item.groupname]})
            }

            this.$store.state.topMenuShow = false;
            this.$store.state.currentGroup = item.name;
        }
    },
    mounted : function (){
    }
};
</script>

<style lang="less">
@import '../assets/css/var.less';
.c-header-menu {
    float: left;
    li {
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        font-family: Trebuchet MS;
        font-size: 14px;
        text-align: center;
        border-right: 1px solid @menu-border-color;
        border-left: 1px solid @menu-border-color;
        margin-left: -1px;

        &:first-child {
            margin-left: 0;
        }
        float: left;
    }
    a {
        padding: 0 20px;
        display: block;
        height: 100%;
        color: @header-font-color;
    }
    li:hover {
        a {
            color:@blue;
        }
    }
    .active {
        position: relative;
        border-color: @blue;
        a {
            color: @blue;
            background: @menu-active-bg;
        }
        &:hover {
            a {
                color: @blue;
            }
        }
    }
}
@media screen and (max-width:@phone){
    .c-header-menu{
        &::after{
            content:"";display:table;clear:both;
        }
        position: fixed;
        top:@header-height;
        float:none;
        width:100%;
        li{
            float:none;
            border:none;
            border-bottom:1px solid #303c48 !important;
            background-color: @black;
        }
        .active a{
            background-color: #292e33;
        }

        display:none;
        &.on{
            display: block;
        }
    }
}
</style>
