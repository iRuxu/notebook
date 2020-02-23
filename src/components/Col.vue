<template>
    <draggable class="c-main-primary" v-model="redis">
        <div
            v-for="(col, colIndex) in redis"
            :key="'col-' + colIndex"
            class="c-main-col"
            v-cloak
        >
            <div
                v-if="isEditMode"
                class="o-drag-block"
                @dblclick="delColumn(colIndex)"
            ></div>
            <div
                v-if="isEditMode"
                class="o-add-block o-add"
                @click="addBlock(colIndex)"
            >
                + {{ $root.lang.addBlock }}
            </div>
            <Block :colIndex="colIndex" :dbname="dbname" />
        </div>
        <div
            v-if="isEditMode"
            class="c-main-col o-add-column o-add"
            @click="addColumn"
        >
            + {{ $root.lang.addColumn }}
        </div>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";
import Block from "./Block.vue";
export default {
    name: "Col",
    props: ["dbname"],
    computed: {
        redis: {
            get() {
                return this.$store.getters.getNotes(this.dbname);
            },
            set(val) {
                this.$store.commit("setNotes", {
                    name: this.dbname,
                    data: val
                });
            }
        },
        isEditMode: function() {
            return this.$store.state.isEditMode;
        }
    },
    methods: {
        addColumn: function(e) {
            this.$store.commit("addColumn", {
                dbname: this.dbname
            });
        },
        delColumn: function(colIndex) {
            let op = prompt(this.$root.lang.delColumnConfirm, "y");
            if (op == "y") {
                this.$store.commit("delColumn", {
                    dbname: this.dbname,
                    colIndex: colIndex
                });
            }
        },
        addBlock: function(colIndex) {
            this.$store.commit("dialogOpen");
            this.$store.commit("setCurrent", {
                action: "add",
                type: "Block",
                colIndex: colIndex
            });
        }
    },
    components: {
        draggable,
        Block
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";

.c-main-col {
    width: @col-width;
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: @col-gap;
}
@media screen and (max-width:@phone){
    .c-main-col{
        width:100%;
        margin-right:0;
    }
}
.o-add {
    cursor: pointer;
}
.o-add-block {
    margin: 5px 0;
    border: 1px dashed #eee;
    color: #ddd;
    padding: 0 5px;
    background-color: #fafafa;
    text-align: center;
    &:hover {
        border-color: #ddd;
        color: #aaa;
    }
}
.o-drag-block {
    border: 1px solid #eee;
    border-radius: 3px;
    height: 12px;
    cursor: move;
    background-color: #fafafa;
    &:after {
        content: "|||";
        display: block;
        text-align: center;
        color: #555;
        font-size: 12px;
        transform: scale(0.5);
        transform-origin: center top;
    }
}
.o-add-column {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #eee;
    color: #ddd;
    padding: 0 5px;
    height: calc(100vh - @header-height - 20px - 4px - 2px); //padding + border
    &:hover {
        border-color: #ddd;
        color: #aaa;
    }
}
@media screen and (max-width:@phone){
    .o-add-column{
        box-sizing: border-box;
        height: 300px;
    }
}
</style>
