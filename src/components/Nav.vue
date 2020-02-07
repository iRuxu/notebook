<template>
    <nav class="c-sidebar-nav">
        <router-link 
            v-for="item in nav" 
            :to="item.path"
            :title="item.title"
            :key="item.name"
        >
            {{ item.name }}
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    computed: {
        nav: function() {
            let arr = this.$store.getters.nav
            if(!this.$store.state.isDev){
                arr = arr.filter(function (item,i){
                    return !item.devonly
                })
            }
            return arr;
        }
    }
};
</script>

<style lang="less">
@import '../assets/css/var.less';
.c-sidebar-nav {
    position: absolute;
    left: 0;
    right: -1px;
    top: 0;
    bottom: @footer-height;
    overflow-y: auto;
    overflow-x: hidden;

    a {
        display: block;
        border-bottom: 1px solid @nav-border;
        padding: 5px 10px;
        color: @nav-color;
        line-height: 1.8;

        &:hover {
            font-weight: bold;
        }
    }

    .router-link-exact-active {
        font-weight: bold;
        background-color: #fff;
        border-right: 1px solid #fff;
    }

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track,&::-webkit-scrollbar-track-piece {
        background-color: #fafafa;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #eee;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-button,&::-webkit-scrollbar-corner,&::-webkit-resizer {
        display: none;
    }
}
</style>
