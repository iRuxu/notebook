<template>
    <draggable tag="ul" class="u-list" v-model="redis" :class="{ on: fold }">
        <li
            v-for="(item, itemIndex) in redis"
            :key="'item-' + itemIndex"
            class="u-item"
            @mouseenter="
                noteFocus($event, colIndex, blockIndex, boxIndex, itemIndex)
            "
            @mouseleave="noteBlur"
        >
            <a
                class="u-data"
                :href="item.url"
                :target="item.url ? '_blank' : '_self'"
                @click="
                    noteClick(
                        $event,
                        item.url,
                        colIndex,
                        blockIndex,
                        boxIndex,
                        itemIndex
                    )
                "
            >
                <i
                    v-if="item.dot"
                    class="u-dot"
                    :style="{ backgroundColor: item.dot }"
                ></i>
                <span class="u-prefix">{{ item.prefix }}</span>
                <b class="u-tag">{{ item.tag }}</b>
                <em class="u-suffix">{{ item.suffix }}</em>
            </a>
        </li>
        <li
            v-if="isEditMode"
            class="o-add-item o-add"
            @click="addItem(colIndex, blockIndex, boxIndex)"
        >
            + {{ $root.lang.addItem }}
        </li>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "List",
    props: ["dbname", "colIndex", "blockIndex", "boxIndex", "fold"],
    computed: {
        redis: {
            get() {
                return this.$store.getters.getList({
                    dbname: this.dbname,
                    colIndex: this.colIndex,
                    blockIndex: this.blockIndex,
                    boxIndex: this.boxIndex
                });
            },
            set(val) {
                this.$store.commit("setList", {
                    dbname: this.dbname,
                    colIndex: this.colIndex,
                    blockIndex: this.blockIndex,
                    boxIndex: this.boxIndex,
                    data: val
                });
            }
        },
        isEditMode: function() {
            return this.$store.state.isEditMode;
        }
    },
    methods: {
        noteFocus: function(e, colIndex, blockIndex, boxIndex, itemIndex) {
            let digest = this.$store.getters.getItem({
                dbname: this.dbname,
                colIndex: colIndex,
                blockIndex: blockIndex,
                boxIndex: boxIndex,
                itemIndex: itemIndex
            });
            this.$store.commit("tipIn", {
                show: true,
                text: digest.desc || digest.suammary || "",
                x: e.clientX + 12,
                y: e.clientY + 8
            });
        },
        noteBlur: function() {
            this.$store.commit("tipOut");
        },
        noteClick: function(e, url, colIndex, blockIndex, boxIndex, itemIndex) {
            if (!this.isEditMode && url) return;

            e.preventDefault();

            this.$store.commit("setCurrent", {
                action: "edit",
                type: "Item",
                colIndex: colIndex,
                blockIndex: blockIndex,
                boxIndex: boxIndex,
                itemIndex: itemIndex
            });

            this.isEditMode
                ? this.$store.commit("dialogOpen")
                : this.$store.commit("snippetOpen");
        },
        addItem: function(colIndex, blockIndex, boxIndex) {
            this.$store.commit("dialogOpen");
            this.$store.commit("setCurrent", {
                action: "add",
                type: "Item",
                colIndex: colIndex,
                blockIndex: blockIndex,
                boxIndex: boxIndex
            });
        }
    },
    components: {
        draggable
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";
.c-main-col {
    .u-item {
        border-top: 1px dashed transparent;
        border-bottom: 1px dashed transparent;
        &:hover {
            background: lighten(@blue, 49%);
            cursor: pointer;
            border-top: 1px dashed @blue;
            border-bottom: 1px dashed @blue;

            .u-prefix {
                color: @blue;
            }
            .u-suffix {
                color: @purple;
            }
            .u-tag {
                color: @pink;
            }
        }
    }
    .u-data {
        display: block;
        white-space: nowrap;
        word-wrap: normal;
        word-break: keep-all;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .u-prefix,
    .u-suffix {
        color: @fix;
        font-style: normal;
    }
    .u-tag {
        color: @link;
        font-weight:normal;
    }

    .u-dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        margin-right: 4px;
    }
}
.o-add-item {
    margin-top:3px;
    border: 1px dashed #eee;
    color: #ddd;
    padding: 0 5px;
    border-radius: 3px;
    &:hover {
        background: lighten(@blue, 49%);
        border: 1px dashed @blue;
        color: @blue;
    }
}
</style>
