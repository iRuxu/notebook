<template>
    <draggable v-model="redis">
        <div
            v-for="(block, blockIndex) in redis"
            :key="'block-' + blockIndex"
            class="c-main-block"
        >
            <h3
                class="u-title"
                :class="{
                    'u-custom-bar': !!block.barcolor,
                    on: block.fold
                }"
                :style="{ backgroundColor: block.barcolor }"
                @click="titleClick($event, colIndex, blockIndex)"
            >
                {{ block.title }}
            </h3>
            <Box
                :blockIndex="blockIndex"
                :colIndex="colIndex"
                :dbname="dbname"
                :fold="block.fold"
            />
        </div>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";
import Box from "./Box.vue";

export default {
    name: "Block",
    props: ["dbname", "colIndex"],
    computed: {
        redis: {
            get() {
                return this.$store.getters.getBlocks({
                    dbname: this.dbname,
                    colIndex: this.colIndex
                });
            },
            set(val) {
                this.$store.commit("setBlocks", {
                    dbname: this.dbname,
                    colIndex: this.colIndex,
                    data: val
                });
            }
        }
    },
    methods: {
        titleClick: function(e, colIndex, blockIndex) {
            if (this.$store.state.isEditMode) {
                this.$store.commit("dialogOpen");
                this.$store.commit("setCurrent", {
                    action: "edit",
                    type: "Block",
                    colIndex: colIndex,
                    blockIndex: blockIndex
                });
            } else {
                e.target.classList.toggle("on");
                e.target.nextSibling.classList.toggle("on");
            }
        }
    },
    components: {
        draggable,
        Box
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";

.c-main-block {
    .u-title,
    .u-subtitle {
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
        user-select: none;
        margin: 0;
    }
    .u-title {
        background: @block-title-bg;
        text-indent: 5px;
        color: @block-title-color;
        margin: 5px 0;
        padding-right: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            color: @blue;
        }

        position: relative;
        &:after {
            content: "-";
            padding: 0 10px;
            position: absolute;
            right: 0;
            top: 0;
        }
        &.on {
            &:after {
                content: "+";
            }
        }
    }
    .u-custom-bar {
        color: #fff;
        &:hover {
            color: rgba(255, 255, 255, 0.9);
        }
    }
}
</style>
