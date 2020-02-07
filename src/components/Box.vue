<template>
    <draggable class="u-boxs" :class="{ on: fold }" v-model="redis">
        <div
            v-for="(box, boxIndex) in redis"
            :key="'box-' + boxIndex"
            class="u-box"
        >
            <h4
                class="u-subtitle"
                :class="{ on: box.fold }"
                @click="subtitleEvent($event, colIndex, blockIndex, boxIndex)"
            >
                {{ box.title }}
            </h4>
            <List
                :boxIndex="boxIndex"
                :blockIndex="blockIndex"
                :colIndex="colIndex"
                :dbname="dbname"
                :fold="box.fold"
            />
        </div>
        <div
            v-if="isEditMode"
            class="o-add-list o-add"
            @click="addList(colIndex, blockIndex)"
        >
            + {{ $root.lang.addList }}
        </div>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";
import List from "./List.vue";

export default {
    name: "Box",
    props: ["dbname", "colIndex", "blockIndex", "fold"],
    computed: {
        redis: {
            get() {
                return this.$store.getters.getBoxs({
                    dbname: this.dbname,
                    colIndex: this.colIndex,
                    blockIndex: this.blockIndex
                });
            },
            set(val) {
                this.$store.commit("setBoxs", {
                    dbname: this.dbname,
                    colIndex: this.colIndex,
                    blockIndex: this.blockIndex,
                    data: val
                });
            }
        },
        isEditMode: function() {
            return this.$store.state.isEditMode;
        }
    },
    methods: {
        subtitleEvent: function(e, colIndex, blockIndex, boxIndex) {
            if (this.isEditMode) {
                this.$store.commit("dialogOpen");
                this.$store.commit("setCurrent", {
                    action: "edit",
                    type: "List",
                    colIndex: colIndex,
                    blockIndex: blockIndex,
                    boxIndex: boxIndex
                });
            } else {
                e.target.classList.toggle("on");
                e.target.nextSibling.classList.toggle("on");
            }
        },
        addList: function(colIndex, blockIndex) {
            this.$store.commit("dialogOpen");
            this.$store.commit("setCurrent", {
                action: "add",
                type: "List",
                colIndex: colIndex,
                blockIndex: blockIndex
            });
        }
    },
    components: {
        draggable,
        List
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";
.c-main-block {
    .u-boxs,
    .u-list {
        transition: all 0.1s linear;
        &.on {
            line-height: 0;
            font-size: 0;
            opacity: 0;
            height:0;
            .u-dot,
            .o-add {
                display: none;
            }
        }
    }
    .u-box {
        padding: 0 5px;
    }
    .u-subtitle {
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:before {
            content: "[-]";
            margin-right: 2px;
        }
        &.on {
            &:before {
                content: "[+]";
            }
        }
        &:hover {
            color: @pink;
            font-weight: bold;
        }
    }
    .u-list {
        padding-left: 1px;
    }
}
.o-add-list {
    margin: 5px;
    border: 2px dashed #eee;
    color: #ddd;
    padding: 0 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    &:hover {
        color: lighten(@pink, 25%);
        border-color: lighten(@pink, 30%);
    }
}
</style>
