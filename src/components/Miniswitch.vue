<template>
    <i class="w-switch" @click="switchIt" :class="{ on: status }">
        <i class="u-status">≡</i>
        <input type="hidden" v-model="status" />
    </i>
</template>

<script>
export default {
    name: "Miniswitch",
    props: ["fold"],
    data: function() {
        return {
            status: this.fold
        };
    },
    methods: {
        switchIt: function() {
            this.status = !this.status;
            this.$emit("switched", this.status);
        }
    }
};
</script>

<style lang="less">
.w-switch {
    display: inline-block;
    width: 60px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #c7cac7;
    margin-right: 5px;
    box-shadow: 0 0 2px #c7cac7 inset;
    user-select: none;

    .u-status {
        display: block;
        width: 27px;
        height: 27px;
        background-color: #fff;
        border: 2px solid rgba(231, 236, 237);
        border-radius: 4px;
        text-align: center;
        color: #999;
        position: relative;
        *zoom: 1;
        top: -1px;
        line-height: 25px;
        -webkit-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
        font-style: normal;
    }

    &.on {
        background-color: #61b872;
        box-shadow: 0 0 2px #61b872 inset;

        .u-status {
            transform: translateX(100%);
        }
    }
}
</style>
