<template>
    <header class="c-header">
        <h1 class="c-header-logo">
            <i class="u-logo"></i>
            <a class="u-title" href="/">{{ title }}</a>
        </h1>
        <Menu />
        <div class="c-header-panel">
            <i class="u-handler u-handler-left" @click="showSideNav"></i>
            <i
                class="u-handler u-handler-center"
                @click="showMenu"
                :class="{ active: $store.state.topMenuShow }"
                >{{ $store.state.currentGroup }}</i
            >
            <i class="u-handler u-handler-right" @click="showBtnGroup"></i>
            <div
                class="u-btngroup"
                :class="{ active: $store.state.btnGroupShow }"
            >
                <Button
                    v-if="editshow"
                    class="u-btn-white u-btn-edit"
                    :text="$root.lang.edit"
                    :class="{ active: isEditMode }"
                    @click.native="enterEditMode"
                    ><i slot="icon" class="u-icon u-icon-edit"></i
                ></Button>
                <Button
                    v-if="exportshow"
                    class="u-btn-green u-btn-export"
                    :text="$root.lang.export"
                    @click.native="exportTableData"
                    ><i slot="icon" class="u-icon u-icon-save"></i
                ></Button>
                <Github v-if="!isDev" :link="repository" text="Fork" />
            </div>
        </div>
    </header>
</template>

<script>
import Menu from "./Menu.vue";
import Button from "./Button.vue";
import Github from "./Github.vue";
const { saveAs } = require("@elastic/filesaver");

export default {
    name: "Header",
    components: {
        Menu,
        Button,
        Github
    },
    data: function() {
        return {
            title: this.$root.setting.header.title || "Api-Book",
            repository: this.$root.setting.header.repository || ""
        };
    },
    computed: {
        isDev: function() {
            return this.$store.state.isDev;
        },
        isEditMode: function() {
            return this.$store.state.isEditMode;
        },
        editshow: function() {
            return (
                (this.$root.config.editDevonly && this.isDev) ||
                !this.$root.config.editDevonly
            );
        },
        exportshow: function() {
            return (
                (this.$root.config.exportDevonly && this.isDev) ||
                !this.$root.config.exportDevonly
            );
        }
    },
    methods: {
        enterEditMode: function(e) {
            this.$store.commit("exchangeEditMode");
            this.$store.state.btnGroupShow = false;
        },
        exportTableData: function() {
            let tableData = JSON.stringify(
                this.$store.getters.getDB(this.$route.name)
            );
            if (!new Blob()) {
                alert(this.$root.lang.exportAlert);
                console.warn(`[API-BOOK] - ${this.$route.name}`);
                console.log(tableData);
            } else {
                let blob = new Blob([tableData], {
                    type: "application/json;charset=utf-8"
                });
                saveAs(blob, `${this.$route.name}.json`);
            }
        },
        showBtnGroup: function() {
            this.$store.state.btnGroupShow = !this.$store.state.btnGroupShow;
            this.checkFocus()
            this.$store.state.topMenuShow = false;
        },
        showSideNav: function() {
            this.$store.state.sideNavShow = !this.$store.state.sideNavShow;
            this.checkFocus()
            this.$store.state.topMenuShow = false;
        },
        showMenu: function() {
            this.$store.state.topMenuShow = !this.$store.state.topMenuShow;
            this.checkFocus()
            this.$store.state.btnGroupShow = false;
            this.$store.state.sideNavShow = false;
        },
        checkFocus : function (){
            this.$store.getters.focus()
                ? this.$store.commit("maskShow")
                : this.$store.commit("maskHide");
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/var.less";
.c-header {
    background-color: @black;
    border-bottom: 1px solid @header-border-bottom;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    height: @header-height;
    width: 100%;
    z-index: @base-z;
}
.c-header-logo {
    display: block;
    float: left;
    width: @sidebar-width;
    height: @header-height;
    margin: 0;
    padding: 0;

    .u-logo {
        width: 68px;
        height: 68px;
        float: left;
        display: block;
        background: url(/img/logo.png) no-repeat center center;
        background-size: contain;
        margin-top: -(68px - 38px) / 2;
        margin-left: 5px;
        margin-right: 8px;
    }

    @keyframes rotateLogo {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    overflow: hidden;
    &:hover {
        .u-logo {
            animation: rotateLogo 8s linear infinite;
        }
    }

    .u-title {
        font-family: Trebuchet MS, Helvetica, Arial;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        font-size: 28px;
        line-height: @header-height;
        text-shadow: 2px 2px 2px #000000;

        color: #eee;
        -webkit-transition: 0.6s;
        transition: 0.6s;

        &:hover {
            color: @blue;
        }
    }
}
.c-header-panel {
    float: right;
    padding: 5px 0;

    .u-handler {
        display: none;
    }

    .u-handler-left {
        width: 42px;
        height: 100%;
        background: url("../assets/img/nav.svg") no-repeat center center;
        background-size: auto 65%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .u-handler-right {
        width: 32px;
        height: @header-height - 5px * 2;
        background: url("../assets/img/panel.svg") no-repeat center center;
        background-size: auto 80%;
        float: right;
    }
    .u-handler-center {
        width: 180px;
        height: @header-height;
        line-height: @header-height;
        color: #fff;
        text-align: center;
        font-size: 20px;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        &:after {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            background: url("../assets/img/arrow.svg") no-repeat center center;
            background-size: contain;
            margin-left: 6px;
            vertical-align: middle;
        }
        &.active {
            &:after {
                transform: rotate(180deg);
            }
        }
    }
    .u-btngroup {
        &::after {
            content: "";
            display: table;
            clear: both;
        }
    }

    .u-btn {
        display: block;
        float: left;
        margin-right: 6px;
    }

    .u-icon {
        margin-right: 2px;
    }
    .u-icon-save {
        margin-right: 4px;
    }
}
@media screen and (max-width: @phone) {
    .c-header {
        z-index: @mobile-z;
    }
    .c-header-logo {
        display: none;
    }
    .c-header-panel {
        .u-handler {
            display: block;
        }
        .u-btngroup {
            clear: right;
            transform: translateX(100%);
            transition: 0.2s ease-in-out;
            &.active {
                transform: translateX(0);
            }
        }
        .u-btn {
            margin-top: 10px;
        }
    }
}
</style>
