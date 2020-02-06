import Setting from "../public/setting.json"
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

//Language
import Config from "../public/config.json";
let Lang = require('../public/lang/en-us.json');
let custom_lang = Config['lang']
if(custom_lang){
    Lang = require(`../public/lang/${custom_lang}.json`);
}

new Vue({
    router,
    store,
    data:{
        setting : Setting,
        lang : Lang,
        config : Config
    },
    render: h => h(App)
}).$mount("#app");

