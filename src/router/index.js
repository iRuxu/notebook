import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Notebook from "../views/Notebook.vue";
import Setting from "../../public/setting.json"

Vue.use(VueRouter);

let routes = []
Setting.nav.forEach((nav,i) => {
    routes[i] = {
        path : nav.path,
        name : nav.name.toLowerCase()
    }
    if(nav.name == 'Home'){
        routes[i]['component'] = Home
    }else{
        routes[i]['component'] = Notebook
    }
})

const router = new VueRouter({
    routes
});

export default router;
