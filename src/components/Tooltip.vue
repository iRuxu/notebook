<template>
    <div
        v-show="show && text"
        class="w-tooltip c-snippet"
        :style="{ left: x + 'px', top: y + 'px' }"
        v-html="content"
    ></div>
</template>

<script>
import { mapState } from "vuex";
import converter from '../helper/markdown.js'

export default {
    name: "Tooltip",
    computed: {
        ...mapState({
            show : (state)=> state.tooltip.show,
            x : (state)=> state.tooltip.x,
            y : (state)=> state.tooltip.y,
            text : (state)=> state.tooltip.text,
        }),
        content: function() {
            if (this.show && this.text) {
                return converter.makeHtml(this.text);
            } else {
                return "";
            }
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/var.less";
.w-tooltip {
    z-index: @base-z;
    position: fixed;
    min-width: @tooltip-min-width;
    max-width: @tooltip-max-width;
    overflow: hidden;
    padding: 5px;
    *zoom: 1;

    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;

    background-color: @tooltip-bg;
    border: 1px solid @tooltip-border;
    color: @tooltip-color;
    font-weight: normal;
    border-radius: 4px;
}
</style>
