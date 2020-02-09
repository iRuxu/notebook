<template>
    <div class="c-input" :class="{fullscreen:isFullscreen,snippet:isSnippet}" v-show="isShow" v-cloak>
        <p v-if="type=='Block' || type=='List'">
            <label>{{ $root.lang.title }}</label>
            <input type="text" v-model="form.title" />
        </p>
        <p v-if="type=='Block' || type=='List'">
            <label>{{ $root.lang.fold }}</label>
            <i class="w-switch" @click="switchFold(form.fold)" :class="{ on: form.fold }">
                <i class="u-status">≡</i>
                <input type="hidden" v-model="form.fold" />
            </i>
        </p>
        <p v-if="type=='Block'">
            <label>{{ $root.lang.barcolor }}</label>
            <input type="text" v-model="form.barcolor" />
        </p>
        <p v-if="type=='Item'">
            <label>{{ $root.lang.note }}</label>
            <input class="u-prefix" type="text" v-model="form.prefix" placeholder="prefix."/>
            <input class="u-tag" type="text" v-model="form.tag" placeholder="api"/>
            <input class="u-suffix" type="text" v-model="form.suffix" placeholder="(suffix)"/>
        </p>
        <p v-if="type=='Item'">
            <label>{{ $root.lang.url }}</label>
            <input type="text" v-model="form.url" />
            <span>{{$root.lang.url_tip}}</span>
        </p>
        <p v-if="type=='Item'">
            <label class="u-block">
                {{ $root.lang.desc }}
                <em>({{$root.lang.desc_tip}} - Markdown support)</em>
            </label>
            <textarea v-model="form.desc" />
        </p>
        <p v-if="type=='Item'">
            <label class="u-block">
                {{ $root.lang.summary }}
                <em>(Markdown support)</em>
                <button class="u-btn-helper u-btn-fullscreen" :class="{on:isFullscreen}" @click="fullscreen"></button>
            </label>
            <textarea class="u-summary" v-model="form.summary" />
        </p>
        <p v-if="type=='Item'">
            <label class="u-block">
                {{ $root.lang.reference }}
                <em>({{ $root.lang.reference_tip }})</em>
            </label>
            <textarea v-model="form.reference" class="u-links" />
        </p>
        <p v-if="type=='Item'">
            <label>{{ $root.lang.dot }}</label>
            <input class="u-dot" type="text" v-model="form.dot" />
            <span class="u-dots">
                <i v-for="(color,index) in dots" :style="{backgroundColor:color}" :key="index" @click="useDot(color)"></i>
            </span>
        </p>
        
        <button class="u-btn-default u-btn-green u-btn-ok" @click="ok">
            {{ $root.lang.ok }}
        </button>
        <button v-if="action=='add'" class="u-btn-default u-btn-white u-btn-cancel" @click="cancel">
            {{ $root.lang.cancel }}
        </button>
        <button v-if="action=='edit'" class="u-btn-default u-btn-red u-btn-delete" @click="del">
            {{ $root.lang.del }}
        </button>

        <button class="u-btn-helper u-btn-close" @click="cancel"><i></i></button>
        
    </div>
</template>

<script>
const formTemplate = {
    title: "",
    fold: false,
    barcolor: "",
    prefix : '',
    tag : '',
    suffix : '',
    url : '',
    desc : '',
    summary : '',
    reference : '',
    dot : ''
}
export default {
    name: "Input",
    props : ['dbname'],
    data: function() {
        return {
            form : Object.assign({},formTemplate),
            dots : this.$root.config.dots,
            isFullscreen : false,
            isSnippet : false
        }
    },
    computed: {
        isShow: function() {
            return this.$store.state.dialog;
        },
        type : function (){
            return this.$store.state.current.type;
        },
        action : function (){
            return this.$store.state.current.action;
        },
        colIndex : function (){
            return this.$store.state.current.colIndex
        },
        blockIndex : function (){
            return this.$store.state.current.blockIndex
        },
        boxIndex : function (){
            return this.$store.state.current.boxIndex
        },
        itemIndex : function (){
            return this.$store.state.current.itemIndex
        },
        block : function (){
            return {
                title : this.form.title || 'Title',
                barcolor : this.form.barcolor || '',
                fold : this.form.fold || false,
            }
        },
        list : function (){
            return {
                title : this.form.title || 'Sub Title',
                fold : this.form.fold || false,
            }
        },
        item : function (){
            return {
                prefix : this.form.prefix || '',
                tag : this.form.tag || ' ',
                suffix : this.form.suffix || '',
                desc : this.form.desc || '',
                url : this.form.url || '',
                summary : this.form.summary || '',
                reference : this.form.reference || '',
                dot : this.form.dot || ''
            }
        }
    },
    methods: {
        ok: function() {
            let action = this.action + this.type
            this[action]();
            this.resetCard();
        },
        cancel : function (){
            this.resetCard();
        },
        del : function (){
            let action = 'delete' + this.type
            this[action]();
            this.resetCard();
        },
        resetCard: function() {
            this.$store.commit('dialogClose');
            this.form = Object.assign({},formTemplate)
            this.isSnippet = false
        },
        addBlock : function (){
            let block = Object.assign(this.block,{
                "box":[]
            })
            this.$store.commit('addBlock',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                data : block
            })
        },
        editBlock : function (){
            this.$store.commit('editBlock',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                data : this.block
            })
        },
        deleteBlock : function (){
            this.$store.commit('deleteBlock',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex
            })
        },
        addList : function (){
            let list = Object.assign(this.list,{
                "list":[]
            })
            this.$store.commit('addList',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex,
                data : list
            })
        },
        editList : function (){
            this.$store.commit('editList',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex,
                data : this.list
            })
        },
        deleteList : function (){
            this.$store.commit('deleteList',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex,
                boxIndex : this.boxIndex
            })
        },
        addItem : function (){
            this.$store.commit('addItem',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex,
                boxIndex : this.boxIndex,
                data : this.item
            })
        },
        editItem : function (){
            this.$store.commit('editItem',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex,
                boxIndex : this.boxIndex,
                itemIndex : this.itemIndex,
                data : this.item
            })
        },
        deleteItem : function (){
            this.$store.commit('deleteItem',{
                dbname : this.dbname,
                colIndex : this.colIndex,
                blockIndex : this.blockIndex,
                boxIndex : this.boxIndex,
                itemIndex : this.itemIndex
            })
        },
        useDot : function(color) {
            this.form.dot = color
        },
        fullscreen : function (){
            this.isFullscreen = !this.isFullscreen
        },
        switchFold : function (status){
            this.form.fold = !status
        }
    },
    watch : {
        '$store.state.current' : {
            handler : function (){
                this.isSnippet = this.type == 'Item' ? true : false
                if(this.action == 'edit'){
                    switch(this.type){
                        case 'Block' : 
                            this.form = this.$store.getters.getBlock({
                                dbname : this.dbname,
                                colIndex : this.colIndex,
                                blockIndex : this.blockIndex
                            })
                            break;
                        case 'List' : 
                            this.form = this.$store.getters.getBox({
                                dbname : this.dbname,
                                colIndex : this.colIndex,
                                blockIndex : this.blockIndex,
                                boxIndex : this.boxIndex
                            })
                            break;
                        case 'Item' :
                            this.form = this.$store.getters.getItem({
                                dbname : this.dbname,
                                colIndex : this.colIndex,
                                blockIndex : this.blockIndex,
                                boxIndex : this.boxIndex,
                                itemIndex : this.itemIndex
                            })
                            break;
                        default :
                            break;
                    }
                }
            }
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/var.less";

.c-input {
    &.snippet{
        width: 576px;
    }

    position: fixed;
    z-index: @mobile-dialog;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid @blue;
    border-radius: 4px;

    font-size: 16px;
    line-height: 2;

    p {
        margin-bottom: 10px;
    }

    label {
        width: 80px;
        display: inline-block;
        vertical-align: top;
        color:#666;
        white-space: nowrap;
        overflow: visible;
        em{
            font-size:13px;
            color:#888;
        }
    }
    .u-block{
        display: block;
        position: relative;
        width:auto;
    }

    input,textarea{
        font-family: "Consolas";
        border: 1px solid #ddd;
        line-height: 24px;
        padding: 2px 5px;
        border-radius: 2px;
        box-shadow: 0 0 3px rgba(88, 88, 88, 0.1) inset;
    }
    input {
        width: 240px;

        &.u-prefix,&.u-tag,&.u-suffix{
            border-radius:0;
        }
        &.u-prefix{
            border-top-left-radius:2px;
            border-bottom-left-radius:2px;
        }
        &.u-suffix{
            border-top-right-radius:2px;
            border-bottom-right-radius:2px;
        }
        &.u-prefix,&.u-tag{
            border-right:none;
        }
        &.u-dot,&.u-prefix,&.u-suffix{
            width:120px;
        }
        &.u-tag{
            width:180px;
        }
    }

    span{
        color:#999;
        font-size:14px;
        margin-left:10px;
    }

    textarea{
        display:block;
        width:100%;
        height:80px;
        box-sizing:border-box;
    }
    .u-summary{
        height:200px;
    }

    .u-dots i{
        width: 24px;
        height: 24px;
        display: inline-block;
        vertical-align:middle;
        margin-right:5px;
        cursor: pointer;
    }

    .u-btn-ok,.u-btn-cancel {
        float: right;
    }
    .u-btn-cancel{
        margin-right:10px;
    }

    .u-btn-delete {
        float: left;
        opacity:0.2;
        &:hover{
            opacity: 1;
        }
    }

    .u-btn-helper{
        cursor: pointer;
        border:none;
        opacity:0.5;
        &:hover{
            opacity: 1;
        }
    }
    .u-btn-close{
        width:20px;
        height:20px;
        padding:10px;
        i{
            display: block;
            background:url('../assets/img/close.svg') no-repeat 0 0;
            background-size: contain;
            width: 100%;
            height:100%;
        }
        box-sizing: content-box;
        position:absolute;
        right:0;
        top:0;
        &:hover{
            background-color: rgba(0,204,255,.39);
        }
        display:none;
    }
    &.snippet{
        .u-btn-close{
            display: block;
        }
    }
    .u-btn-fullscreen{
        background:url('../assets/img/fullscreen.svg') no-repeat 0 0;
        background-size: contain;
        position: absolute;
        right: 0;
        bottom: 10px;
        width: 16px;
        height: 16px;
        &.on{
            background-image: url('../assets/img/fullscreen2.svg');
        }
    }
}

.fullscreen(){
    width: 100% !important;
    height: 100%;
    left: 0;
    top: 0;
    transform: translate(0);
    box-sizing: border-box;
    overflow: auto;
    border-radius:0;
}
.c-input.fullscreen{
    .fullscreen();

    .u-summary{
        height:450px;
    }
}
@media screen and (max-width:@phone){
    .c-input{
        .fullscreen();

        label{
            display:block;
        }

        input{
            width:100% !important;
            box-sizing: border-box;
            border:1px solid #ddd !important;
            border-radius: 2px !important;
        }

        .u-btn-fullscreen,span{
            display:none;
        }
        .u-dots{
            display:block;
            margin-left:0;
        }
    }
    
}

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
