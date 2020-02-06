<template>
    <div class="c-mask" v-show="isShow"></div>
</template>

<script>
export default {
    name: "Masking",
    computed: {
        isShow: function() {
            return this.$store.getters.focus()
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";
.c-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.28);
    z-index: @mask-z;
}
@media screen and (max-width: @phone) {
    .c-mask {
        top: @header-height;
    }
}
</style>
