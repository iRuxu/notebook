import Vue from "vue";
import Vuex from "vuex";
import Setting from "../../public/setting.json";

Vue.use(Vuex);

let navTree = {};
let groups = [];
Setting.menu.forEach(function(menu, i) {
    if (menu.groupname) {
        navTree[menu.groupname] = [];
        groups.push(menu.groupname)
    }else{
        groups.push('')
    }
});
Setting.nav.forEach(function(nav, i) {
    navTree[nav.group].push(nav);
});

let store = {
    state: {
        isDev:
            location.hostname == "localhost" || location.hostname == "127.0.0.1"
                ? true
                : false,
        isEditMode: false,
        fullscreen: false,
        //Navigation
        menu: Setting.menu,
        groups:groups,
        currentGroup: Setting.menu[0]["groupname"],
        currentTab : 0,
        navs : Setting.nav,
        navTree : navTree,
        //Btn
        btnGroupShow: false,
        sideNavShow: false,
        topMenuShow: false,
        //Data
        data: {},
        current: {
            action: "add",
            type: "",
            colIndex: 0,
            blockIndex: 0,
            boxIndex: 0
        },
        //Input
        dialog: false,
        mask: false,
        //tooltip
        tooltip: {
            text: "Loading..",
            x: 0,
            y: 0,
            show: false
        },
        //Output
        snippet: {
            show: false,
            drag: false,
            offsetX: 0,
            offsetY: 0,
            ox: 0,
            oy: 0
        }
    },
    mutations: {
        exchangeEditMode: function(state) {
            state.isEditMode = !state.isEditMode;
        },
        exchangeFullscreen: function(state) {
            state.fullscreen = !state.fullscreen;
        },
        maskShow: function(state) {
            state.mask = true;
        },
        maskHide: function(state) {
            state.mask = false;
        },
        changeGroup: function(state, g) {
            state.currentGroup = g;
            for (let i=0;i<groups.length;i++){
                if(groups[i].toLowerCase() == g){
                    state.currentTab = i;
                    break;
                }
            }
        },
        dialogOpen: function(state) {
            state.dialog = true;
            document.getElementById('api-book').classList.add('isFixed')
        },
        dialogClose: function(state) {
            state.dialog = false;
            document.getElementById('api-book').classList.remove('isFixed')
        },
        tipIn: function(state, v) {
            state.tooltip = v;
        },
        tipOut: function(state) {
            state.tooltip.show = false;
        },
        snippetOpen: function(state) {
            state.snippet.show = true;
        },
        snippetClose: function(state) {
            state.snippet.show = false;
        },
        startDrag: function(state) {
            state.snippet.drag = true;
        },
        endDrag: function(state) {
            state.snippet.drag = false;
        },
        setCurrent: function(state, val) {
            state.current = val;
        },
        setDB: function(state, o) {
            state.data[o.name] = o.data;
        },
        setNotes: function(state, o) {
            state.data[o.name]["data"] = o.data;
        },
        setBlocks: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"] = o.data;
        },
        setBoxs: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ] = o.data;
        },
        setList: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ][o.boxIndex]["list"] = o.data;
        },
        addColumn: function(state, o) {
            state.data[o.dbname]["data"].push({ column: [] });
        },
        delColumn: function(state, o) {
            state.data[o.dbname]["data"].splice(o.colIndex, 1);
        },
        addBlock: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"].push(o.data);
        },
        editBlock: function(state, o) {
            let block = state.data[o.dbname]["data"][o.colIndex]["column"];
            block["title"] = o.data.title;
            block["barcolor"] = o.data.barcolor;
            block["fold"] = o.data.fold;
        },
        deleteBlock: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"].splice(
                o.blockIndex,
                1
            );
        },
        addList: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ].push(o.data);
        },
        editList: function(state, o) {
            let list =
                state.data[o.dbname]["data"][o.colIndex]["column"][
                    o.blockIndex
                ]["box"];
            list["title"] = o.data.title;
            list["fold"] = o.data.fold;
        },
        deleteList: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ].splice(o.boxIndex, 1);
        },
        addItem: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ][o.boxIndex]["list"].push(o.data);
        },
        editItem: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ][o.boxIndex]["list"][o.itemIndex] = o.data;
        },
        deleteItem: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ][o.boxIndex]["list"].splice(o.itemIndex, 1);
        },
        setItemProp: function(state, o) {
            state.data[o.dbname]["data"][o.colIndex]["column"][o.blockIndex][
                "box"
            ][o.boxIndex]["list"][o.itemIndex][o.key] = o.value;
        }
    },
    getters: {
        nav: state => {
            return navTree[state.currentGroup];
        },
        groupname : state => {
            return Setting.menu[state.currentTab]["name"]
        },
        focus: state => {
            return (
                state.sideNavShow ||
                state.btnGroupShow ||
                state.topMenuShow ||
                state.dialog
            );
        },
        screenWidth: state => {
            return window.innerWidth;
        },
        getDB: state => name => {
            return state.data[name];
        },
        getNotes: state => name => {
            return state.data[name]["data"];
        },
        getBlocks: state => o => {
            return state.data[o.dbname]["data"][o.colIndex]["column"];
        },
        getBlock: state => o => {
            return state.data[o.dbname]["data"][o.colIndex]["column"][
                o.blockIndex
            ];
        },
        getBoxs: state => o => {
            return state.data[o.dbname]["data"][o.colIndex]["column"][
                o.blockIndex
            ]["box"];
        },
        getBox: state => o => {
            return state.data[o.dbname]["data"][o.colIndex]["column"][
                o.blockIndex
            ]["box"][o.boxIndex];
        },
        getList: state => o => {
            return state.data[o.dbname]["data"][o.colIndex]["column"][
                o.blockIndex
            ]["box"][o.boxIndex]["list"];
        },
        getItem: state => o => {
            return state.data[o.dbname]["data"][o.colIndex]["column"][
                o.blockIndex
            ]["box"][o.boxIndex]["list"][o.itemIndex];
        }
    },
    actions: {},
    modules: {}
};

let data = {};
Setting.nav.forEach(function(v, i) {
    let name = v.name.toLowerCase();
    data[name] = require(`../../public/notes/${name}.json`);
});
store.state.data = data;

export default new Vuex.Store(store);
