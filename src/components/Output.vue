<template>
    <div
        class="c-output"
        v-show="isShow"
        :style="{ marginLeft: offsetX + 'px', marginTop: offsetY + 'px' }"
        id="snippet"
    >
        <div class="c-output-title" @mousedown="startMove">
            <span class="u-prefix">{{ prefix }}</span>
            <b class="u-tag">{{ tag }}</b>
            <em class="u-suffix">{{ suffix }}</em>
        </div>
        <div class="c-output-content c-snippet">
            <div class="c-output-desc" v-if="desc" v-html="desc"></div>
            <div class="c-output-summary" v-if="summary" v-html="summary"></div>
            <ul
                class="c-output-reference"
                v-if="reference"
                v-html="reference"
            ></ul>
        </div>
        <button class="c-output-close" @click="close">×</button>
    </div>
</template>

<script>
import converter from "../helper/markdown.js";

export default {
    name: "Output",
    props: ["dbname"],
    computed: {
        isShow: function() {
            return this.$store.state.snippet.show;
        },
        item: function() {
            return this.$store.getters.getItem({
                dbname: this.dbname,
                colIndex: this.$store.state.current.colIndex,
                blockIndex: this.$store.state.current.blockIndex,
                boxIndex: this.$store.state.current.boxIndex,
                itemIndex: this.$store.state.current.itemIndex
            });
        },
        prefix: function() {
            return (this.item && this.item.prefix) || "";
        },
        tag: function() {
            return (this.item && this.item.tag) || "";
        },
        suffix: function() {
            return (this.item && this.item.sufffix) || "";
        },
        desc: function() {
            return this.item && this.item.desc
                ? converter.makeHtml(this.item.desc)
                : "";
        },
        summary: function() {
            return this.item && this.item.summary
                ? converter.makeHtml(this.item.summary)
                : "";
        },
        reference: function() {
            return this.item && this.item.reference
                ? this.formatLinks(this.item.reference)
                : "";
        },
        offsetX: function() {
            return this.$store.state.snippet.offsetX;
        },
        offsetY: function() {
            return this.$store.state.snippet.offsetY;
        }
    },
    methods: {
        formatLinks: function(str) {
            let arr = str.split("\n");
            let html = "";
            arr.forEach(function(item, i) {
                let unit = item.split("|");
                html += `<li><a href="${unit[1]}" target="_blank">${
                    unit[0]
                }</a><span>${unit[2] || ""}</span></li>`;
            });
            return html;
        },
        close: function() {
            this.$store.commit("snippetClose");
        },
        startMove: function(e) {
            this.$store.commit("startDrag");
            this.$store.state.snippet.ox = e.clientX;
            this.$store.state.snippet.oy = e.clientY;
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";
.c-output {
    width: @snippet-width;
    height: @snippet-height;
    max-width:100%;
    resize: both;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: @base-z;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.6);
    color: #fff;
    background: #333;
    border: 1px solid @blue;
}
.c-output-title {
    padding: 0 2px 8px 2px;
    border-bottom: 1px dashed #888;
    cursor: move;

    &::before {
        content: "";
        display: inline-block;
        background: url("../assets/img/drag.svg") no-repeat center center;
        width: 20px;
        height: 20px;
        background-size: contain;
        vertical-align: middle;
        margin-right: 6px;
        cursor: default;
    }

    .u-prefix,
    .u-tag,
    .u-suffix {
        cursor: text;
    }
    .u-prefix {
        color: lighten(@blue, 20%);
    }
    .u-tag {
        color: @blue;
    }
    .u-suffix {
        color: #ccc;
        padding-right: 10px;
    }
}
.c-output-content {
    margin-top: 10px;
    color: #eee;
    overflow: auto;
    height: @snippet-height - 60px;
    padding-right: 8px;
    line-height: 2;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
        background-color: #666;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-corner,
    &::-webkit-resizer {
        display: none;
    }
}
.c-output-reference {
    border: 1px solid #444;
    background-color: #3c3b3b;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 5px !important;
    span {
        color: #ccc;
        margin-left: 10px;
    }
}
.c-output-close {
    position: absolute;
    right: 0;
    top: 0;
    background: none;
    color: @blue;
    border: none;
    font-size: 30px;
    cursor: pointer;
    padding: 5px 10px;
    transition:0.1s ease-in-out;
    &:hover {
        color: lighten(@blue, 20%);
    }
}
@media screen and (max-width:@phone){
    .c-output{
        z-index:@mobile-z;
        height:100%;
        transform: translateX(0) translateY(0);
        left: 0;
        top: 0;
    }
}
</style>
