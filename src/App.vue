<template>
    <div id="app" ref="app" @mouseup="endMove" @mousemove="moving" :class={isMoving:isMoving}>
        <Header />
        <Sidebar />
        <router-view />
    </div>
</template>

<script>
    
    import Header from './components/Header.vue';
    import Sidebar from './components/Sidebar.vue';
    
    export default {
        name : 'App',
        components : {
            Header,
            Sidebar
        },
        computed : {
            isMoving : function (){
                return this.$store.state.snippet.drag
            }
        },
        methods : {
            endMove: function(e) {
                this.$store.commit('endDrag')
            },
            moving: function(e) {
                if (this.isMoving) {
                    this.$store.state.snippet.offsetX = e.clientX - this.$store.state.snippet.ox
                    this.$store.state.snippet.offsetY = e.clientY - this.$store.state.snippet.oy
                }
            }
        }
    }
</script>

<style lang="less">
    @import './assets/css/var.less';
    @import './assets/css/icon.less';
    @import './assets/css/btn.less';
    body{
        padding:0;
        margin:@header-height 0 0 0 ;
        font-size:12px;
        line-height:1.8;
    }
    #app{
        &.isMoving{
            cursor: move;
        }
    }
    p{
        margin:0;
    }
    ul,ul li{
        padding:0;
        margin:0;
        list-style:none;
    }
    body{
        font-family: Consolas, 'Trebuchet MS', Verdana, Helvetica, Arial, sans-serif;
    }
    a{
        color:#333;
        text-decoration:none;
    }
</style>
